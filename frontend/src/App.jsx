import React, { useRef ,useEffect, useState ,Component} from 'react';
import Meter from './Meter.jsx'
import Header from './Header.jsx'
import Motor from "./Motor";
import Slider from "./Slider.jsx"


const App=()=>{

  
    const [currentData, setcurrentdata] = useState({});


    var url='https://localhost:5001/currentInfo';

    function getData(){
        fetch(url,{method:'GET'})
        .then(function(response){ response.json()
          
          .then(function(data) {
                  setcurrentdata(data);                   
            });
          }      
        )
      }

    const [motorCondition, setmotorCondition] = useState(currentData.Motor);
    
    useEffect(() => {
      const interval = setInterval(getData, 1000);
      setmotorCondition((currentData.Motor==1)?'ON':(currentData.Motor==0)?'OFF':"loding..");
      console.log(currentData);
      return () => {
        clearInterval(interval);
      };
    });


   const handleEventOn=()=>{
    alert("Motor ON.. Wait for sometime because of systen delay");
       var url1="https://localhost:5001/motor"; 
        fetch(url1,
        {
          method:'POST',

          headers:{
            'Content-Type':'application/json'
          },

          body:JSON.stringify(
            {
                Motor:"m1"
            }
          )
        })
        .then(function(response){response.json()
          .then((data)=>  
          {
            console.log(data);
        //    setmotorCondition('ON');      
          });
      })
  }

  const handleEventOff=()=>{
    alert("Motor Off.. Wait for sometime because of systen delay");
       var url1="https://localhost:5001/motor"; 
        fetch(url1,
        {
          method:'POST',

          headers:{
            'Content-Type':'application/json'
          },

          body:JSON.stringify(
            {
                Motor:"m0"
            }
          )
        })
        .then(function(response){response.json()
          .then((data)=>  
          {
              console.log(data);
          //    setmotorCondition('OFF');      
          });
      })

      

  }
    return(
    <div className="container-fluid .verticalHeight">
      
      <div className="mainHead">
        <Header className="headStyle" title="Irrigation System"/>
      </div>
      
      <div className="row">
        
        <div className="col-lg-3 col-md-6">
         
            <Meter 
                minValue={-40}
                maxValue={125}
                value={currentData.Temperature}
                segments={15}
                title="Temperature"
                />
        </div>        
        
        <div className="col-lg-3 col-md-6">
        
            <Meter 
                minValue={0}
                maxValue={100}
                value={currentData.Humidity}
                segments={20}
                title="Humidity"
            />
        </div>
        
        <div className="col-lg-3 col-md-6">
        
            <Meter 
                minValue={0}
                maxValue={100}
                value={currentData.SoilMoisture}
                segments={20}
                title="Soil Moisture"
            />
          
        </div> 

        <div className="col-lg-3 col-md-6">
        
            <Meter 
                minValue={0}
                maxValue={100}
                value={currentData.CO2}
                segments={20}
                title="CO2 level"
            />
          
        </div>
      
      </div>

      <div className="row">

          <div className="col-lg-3 col-md-6 col-lg-offset-3">

            <div className="Motor">
              <Header title="Manual Motor Control"></Header>
                <p>Current condition: <b>{motorCondition}</b></p> 
              <Motor   className="MotorButton" onClick={handleEventOn} title="Motor ON"> </Motor>
              <Motor   className="MotorButton" onClick={handleEventOff} title="Motor OFF"> </Motor>
            
            </div>
            
          </div>

          <div className="col-lg-3 col-md-6">

            <div className="manualControl">

              <Header title="Set Parameter Value"></Header>
          
              <div className="slideDiv">

                <p> Min Acceptable Soil Moisture: {currentData.MinAcceptableSoilMoisture} </p>
                <Slider id="soilValue" value={currentData.MinAcceptableSoilMoisture}  min="0" max="100" />
              </div>

            </div>
          </div>

          
      </div> 

    </div>  
  )
}

export default App;

/*
   <div className="slideDiv">
              <p> Temperature </p>
                <Slider id="humidyValue"  min="-40" max="120" />
            </div>
          
            <div className="slideDiv">
              <p> Humidity </p>
                <Slider id="tempValue" min="0" max="80" />
            </div>
            
          

*/