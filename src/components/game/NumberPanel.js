import React from 'react'

function NumberPanel({setValue}) {
    const panelNums = "123456789".split("");
    const onValueSelected =(value)=>{
        setValue(value)
    }
    return (
        <div className='numberPanel'>{
            panelNums.map(el=> 
                <div className="number-box" key={"panel"+el} id={"panel"+el} 
                    onClick={()=>{ onValueSelected("#"+el)}}>{el}</div>)
        }</div>
    )
}

export default NumberPanel
