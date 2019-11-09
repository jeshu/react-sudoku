import React from 'react'
import SudokuBox from './SudokuBox'
import NumberPanel from './NumberPanel'
import GameOptions from './GameOptions'


function Sudoku({data}) {
    return (
        <div className="gameBody">
        <div className="sudoko">
            {
                data && data.map((rows,j) => <SudokuBox key={j+"box"} row={rows} index={"r"+j}/> )
            }
        </div>
        <NumberPanel />
        <GameOptions />
        </div>
    )
}

export default Sudoku;