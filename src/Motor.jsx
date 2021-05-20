
import react from "react";

const Motor=(props)=>
{
   

   return(
    <div >
       <button className={props.className} onClick={props.onClick} >{props.title}</button>
    </div>
   ) 
}

export default Motor;