#include <ArduinoJson.h>
#include "DHT.h"
#define DHTPIN 2
#define DHTTYPE DHT11
#define motorPin 3
DHT dht(DHTPIN, DHTTYPE);
  float preh = 0;
  float pret = 0;
  float prehic = 0;
  int preMotor=0;
  String preSetsm=String(0);
  String setsm=String(0);
  
void setup() {
  Serial.begin(9600);
  dht.begin();
  pinMode(motorPin,INPUT);
  pinMode(A0,INPUT);
  digitalWrite(motorPin,LOW);
  preMotor=0; 
}

void loop() {

  
  delay(2000);
  float h = dht.readHumidity();
  float t = dht.readTemperature();
  float f = dht.readTemperature(true);
  float smValue=30;
  

  if (isnan(h) || isnan(t) || isnan(f)) {
    StaticJsonDocument <200> doc; 
    JsonObject root =doc.to<JsonObject>();
    doc["Humidity"] = "Failed to read from DHT sensor!";
    serializeJson(doc, Serial);
    Serial.println();
    return;
    
  }

  if (abs(h-preh)>5 ||abs(t-pret)>5|| digitalRead(motorPin)!=preMotor || preSetsm!=setsm){
    
    StaticJsonDocument <200> doc;
    
    JsonObject root =doc.to<JsonObject>();
    doc["Humidity"] = String(h);
    doc["Temperature"] = String(t);
    doc["SoilMoisture"] = String(smValue);
    doc["CO2"] = String(70);
    doc["Motor"] = String(digitalRead(motorPin));
    doc["MinAcceptableSoilMoisture"] = String(setsm); 
    serializeJson(doc, Serial);
    Serial.println();
    preh = h;
    pret = t;
    preSetsm=setsm;
    preMotor=digitalRead(motorPin);
    
  }

   while(Serial.available() > 0) 
   {
     String receivedChar = Serial.readString();
     String code=receivedChar.substring(0, 2);

     
     if(receivedChar=="m1")
      {
        preMotor=digitalRead(motorPin);
        digitalWrite(motorPin,HIGH);
          
      }
     else if(receivedChar=="m0")
      {
        preMotor=digitalRead(motorPin);
        digitalWrite(motorPin,LOW);
          
      }
     else if(code=="sm")
     {
        String value=receivedChar.substring(2);
        preSetsm=setsm;
        setsm=value;   
        if(String(smValue)<=value)
        {
          preMotor=digitalRead(motorPin);
          digitalWrite(motorPin,HIGH);  
        }
        else
        {
          preMotor=digitalRead(motorPin);
          digitalWrite(motorPin,LOW);
        }
     }
     
    
   }
  /*  Serial.print("Humidity: ");
    Serial.print(h);
    Serial.print(" ");
    Serial.print("Temperature: ");
    Serial.print(t);
    Serial.print(" *C ");
    Serial.print(f);
    Serial.print(" *F\t");
    Serial.print("Heat index: ");
    Serial.print(hic);
    Serial.print(" *C ");
    Serial.print(hif);
    Serial.println(" *F");*/
}
