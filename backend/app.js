const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const express=require('express');
const https = require('https');
const fs = require('fs');
const cors = require('cors');
const mongoose=require('mongoose');
const bodyParser=require("body-parser");
const port = new SerialPort('/dev/ttyACM0', { baudRate: 9600 });
const parser = port.pipe(new Readline({ delimiter: '\r\n' }));
const app=express();

app.use(cors());
app.use(bodyParser.json());
mongoose.connect("mongodb://localhost:27017/smartIrrigationDB",
{ 
    useNewUrlParser: true ,
    useUnifiedTopology: true
});

const fieldSchma={
    Humidity:Number,
    Temperature:Number,
    SoilMoisture:Number,
    CO2:Number,
    Motor:Number,
    MinAcceptableSoilMoisture:Number,
};

const field=mongoose.model("field",fieldSchma);

port.on("open", () => {
    console.log('serial port open');
  });

parser.on('data', data =>{

    let obj = JSON.parse(data);
    
    var newField=new field(obj);
    console.log(obj);
    newField.save((err)=>{
        if(!err)
        {
            console.log("success");
        }
        else
        console.log(err);    
    });

});


app.get('/info',(req,res)=>{
    field.find((err,result)=>{
        if(!err)
        {
            res.send(result);
        }else{
            res.send(err);
        }
    })
})


app.get('/currentInfo',(req,res)=>{

    field.find({}, null, {sort: {_id: -1}}, function(err, docs) {
        if(!err)
        {
            res.send(docs[0]);
        }else{
            res.send(err);
        }
        
    });
})

app.post('/motor',(req,res)=>{

    console.log(req.body);

    port.write(req.body.Motor, (err) => {
        if (err) {
          return console.log('Error on write: ', err.message);
        }
        console.log('message written');
      });
    
})

app.post('/parameter',(req,res)=>{

    console.log(req.body);

    port.write(req.body.SoilMoistureMax, (err) => {
        if (err) {
          return console.log('Error on write: ', err.message);
        }
        console.log('message written');
      });
    
})


https.createServer({
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem'),
    passphrase: '1234'
}, app)
.listen(5001);

