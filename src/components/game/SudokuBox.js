import React from 'react'

function SudokuBox({row, index}) {
    const clickHandler = (evt)=> {
        console.log(evt.target.id, evt.target.innerText)
    }

    const getValue = (i) => i === 0 ? {"isEdited":false, "value":""} : 
            i.toString().indexOf("#") === -1? {"isEdited":false, "value":i}: {"isEdited":true,"value":i.toString().charAt(1)}; 
    const boxClass = (i) => i !== 0 ? getValue(i).isEdited === false ? "box": "box edited":"box empty";
    
    return (<div className="box9">{
        row.map((el, i) => 
            <div id={index+"-"+i+"c"} onChange={clickHandler} key={index + "-"+i+"col"} 
                className={boxClass(el)} >{getValue(el).value}</div>
            )
    }</div>)
}

export default SudokuBox
