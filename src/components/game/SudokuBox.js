import React from 'react'

function SudokuBox({row, index, setIdToUpdate, activeBoxId}) {
    const clickHandler = (evt, el)=> {
        if(isEditable(el)) {
            setIdToUpdate(evt.target.id);
        } else {
            setIdToUpdate();
        }
    }

    const getValue = (i) => i === 0 ? {"isEdited":false, "value":""} : 
            i.toString().indexOf("#") === -1? {"isEdited":false, "value":i}: {"isEdited":true,"value":i.toString().charAt(1)}; 
    const boxClass = (i) => {
        const className = i !== 0 ? getValue(i).isEdited === false ? "box": "box edited":"box empty";
        return className
    }
    const isActive = (id) => id === activeBoxId? " active":"";
    const isEditable = (i) => i === 0 || typeof i === "string";
    return (<div className="box9">{
        row.map((el, i) => 
            <div id={index+"-"+i+"c"} onClick={(evt)=>{clickHandler(evt, el)}} key={index + "-"+i+"col"} 
                className={boxClass(el) + " " + isActive(index+"-"+i+"c")} >{getValue(el).value}</div>
            )
    }</div>)
}

export default SudokuBox
