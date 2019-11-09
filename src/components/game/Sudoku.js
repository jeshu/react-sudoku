import React from 'react'
import SudokuBox from './SudokuBox'


function Sudoku({data}) {
    // const rows = data.values();
    // console.log(rows)
    return (
        <div className="sudoko">
            {
                data && data.map((rows,j) => <SudokuBox key={j+"box"} row={rows} index={"r"+j}/> )
            }
        </div>
    )
}

export default Sudoku;