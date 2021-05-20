import ValueMeter from "react-d3-speedometer"

const Meter=(props)=>{

    return(
      <div className="divMeter">
        <h3>{props.title}</h3>
        <ValueMeter
          textColor="white"
          height="20"
          minValue={props.minValue}
          maxValue={props.maxValue}
          value={props.value}
          needleColor="black"
          startColor= "#6CA915"
          segments={props.segments}
          endColor="red"/>
      </div>  
    )
}

export default Meter;