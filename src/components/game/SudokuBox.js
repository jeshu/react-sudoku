import React from 'react';

function SudokuBox({row, index, setIdToUpdate, activeBoxId}) {
    const clickHandler = (evt, el)=> {
        if(isEditable(el)) {
            setIdToUpdate(evt.target.id);
        } else {
            setIdToUpdate();
        }
    }

    const getValue = (i) => {
        if(i === 0) {
            return "";
        } else if (typeof i !== "string"){
            return i;
        } else {
            return i.charAt(i.length-1); 
        } 
    }
    const boxClass = (i) => {
        let classes = ["box"];
        if(typeof i === "string") {
            if(i.charAt(0) === "#") {
                classes.push("edited");
            }
            if(i.indexOf("@") !== -1) {
                classes.push("solved")
            }
            if(i.indexOf("!") !== -1) {
                classes.push("incorrect")
            }
        } else {
            i === 0 ? classes.push("empty"):classes.push("fixed");
        }
        return classes.join(" ");
    }
    const isActive = (id) => id === activeBoxId? " active":"";
    const isEditable = (i) => i === 0 || typeof i === "string";
    return (<div className="box9">{
        row.map((el, i) => 
            <div id={index+"-"+i+"c"} onClick={(evt)=>{clickHandler(evt, el)}} key={index + "-"+i+"col"} 
                className={boxClass(el) + " " + isActive(index+"-"+i+"c")} >{getValue(el)}</div>
            )
    }</div>)
}

export default SudokuBox
