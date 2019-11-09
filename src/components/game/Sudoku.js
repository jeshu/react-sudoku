import React from 'react'
import SudokuBox from './SudokuBox'
import NumberPanel from './NumberPanel'
import GameOptions from './GameOptions';
import { connect } from 'react-redux'
import {setIdToUpdate, setValue} from "../../actions/sudoku"

function Sudoku({matrix, setIdToUpdate, setValue, activeBoxId}) {
    return (
        <div className="gameBody">
        <div className="sudoko">
            {
                matrix && matrix.map((rows,j) => 
                    <SudokuBox setIdToUpdate={setIdToUpdate} activeBoxId={activeBoxId} 
                        key={j+"box"} row={rows} index={j+"r"}/> )
            }
        </div>
        <NumberPanel setValue={setValue}/>
        <GameOptions />
        </div>
    )
}

const mapStateToProps = (state) => {
    console.log(state);
    return {matrix:state.sudoku.matrix, activeBoxId:state.sudoku.idToUpdate}
}

const mapDispatchToProps = (dispatch) =>{
    return {
        setIdToUpdate: (payload)=>{dispatch(setIdToUpdate(payload))},
        setValue: (payload)=>{dispatch(setValue(payload))}
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Sudoku);