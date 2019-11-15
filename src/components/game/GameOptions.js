import React from 'react'
import { connect } from 'react-redux';
import {validateGame,newGame,reset,enableHints} from "../../actions/sudoku"
function GameOptions({validateGame,newGame,reset,enableHints}) {
    return (
        <div className="game-options">
            <span className="btn" onClick={reset}>Reset</span>
            <span onClick={newGame} className="btn">New</span>
            <span className="btn">Hint</span>
            <span onClick={validateGame} className="btn">Submit</span>
            <span></span>
        </div>
    )
}


const mapDispatchToProps = {
    validateGame,newGame,reset,enableHints
}


export default connect(null, mapDispatchToProps)(GameOptions)
