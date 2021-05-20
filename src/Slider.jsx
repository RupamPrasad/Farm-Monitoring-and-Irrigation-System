import react, { useRef } from "react";
import Motor from "./Motor.jsx"

;

const Slider=(props)=>{

    const x =useRef(0);

    const handleEvent=(event)=>{
        x.current=event.target.value;
        document.getElementById(props.id).innerHTML=x.current;
         
    }

    const handleSave=()=>{
        
        console.log(x.current.toString());
        alert("Saved "+x.current);
        
        var url2="https://localhost:5001/parameter"; 
        fetch(url2,
        {
          method:'POST',

          headers:{
            'Content-Type':'application/json'
          },

          body:JSON.stringify(
            {
                SoilMoistureMax:"sm"+x.current.toString()
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
        <div className="slideDiv">
          <span id={props.id}>{props.MinAcceptableSoilMoisture}</span>
          
          <input type="range"  value={props.MinAcceptableSoilMoisture} min={props.min} max={props.max} onChange={handleEvent} ></input>
          <br></br>
          <Motor  className="MotorButton" onClick={handleSave} title="save"> </Motor>
          
        </div>
    )
}

export default Slider ;
