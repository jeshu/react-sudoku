import React from 'react'

function SudokuBox({row, index}) {
    const clickHandler = (evt)=> {
        console.log(evt.target.id, evt.target.innerText)
    }

    const boxClass = (i) => {return i!==0? "box":"box empty"} ;
    const boxValue = (i) => {return i===0? "": i};

    return (<div className="box9">{
        row.map((el, i) => 
            <div id={index+"-"+i+"c"} onChange={clickHandler} key={index + "-"+i+"col"} 
                className={boxClass(el)} contentEditable="true">{boxValue(el)}</div>
            )
    }</div>)
}

export default SudokuBox
