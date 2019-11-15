import { solvePuzzle, generateBoard } from "../utils/sudoku";

export const setIdToUpdate = (id = "") => {
    return (dispatch, getState) => {
        dispatch({ type: "setIdToUpdate", payload: id })
    }
}

export const setValue = (value = 0) => {
    return (dispatch, getState) => {
        const sudokuMatrix = getState().sudoku.matrix;
        const id = getState().sudoku.idToUpdate;
        if (id !== "") {
            const pos = id.split("-").map(el => el.charAt(0));
            let newMatix = Object.assign([...sudokuMatrix], {
                [pos[0]]: Object.assign([...sudokuMatrix[pos[0]]], {
                    [pos[1]]: value
                })
            })
            dispatch({ type: "valueToBeUpdated", payload: newMatix })
        }
    }
}

export const reset = () => {
    return (dispatch, getState) => {
        let matrix = getState().sudoku.matrix;
        let newMatix = [];
        for (let i = 0; i < matrix.length; i++) {
            let row = matrix[i]
            let nRow = []
            for (let j = 0; j < row.length; j++) {
                nRow.push(typeof row[j] !== "string"? row[j]: 0);
            }
            newMatix.push(nRow);
        }
        dispatch({ type: "valueToBeUpdated", payload: newMatix })
    }
}
export const newGame = () => {
    return (dispatch, getState) => {
        generateBoard(newBoard =>{
            console.log(newBoard)
            dispatch({ type: "valueToBeUpdated", payload: newBoard })
        });
    }
}
export const validateGame = () => {
    return (dispatch, getState) => {
        let matrix = getState().sudoku.matrix;
        const values = solvePuzzle(matrix);
        dispatch({ type: "setIdToUpdate", payload: "" })
        if(values.length === 0) {
            alert("no solution...");
        }
        for (let i = 0; i < values.length; i++) {
            let pos = values[i];
            setTimeout(() => {
                let matrix = getState().sudoku.matrix;
                let r = pos[0], c = pos[1];
                console.log();
                let filledVal = matrix[r][c]
                if(filledVal !== 0) {
                    let fillVal = parseInt(filledVal.charAt(filledVal.length-1))
                    let val = fillVal === pos[2] ?`#@${fillVal}`:`#!${fillVal}`;
                    let newMatix = Object.assign([...matrix], {
                        [pos[0]]: Object.assign([...matrix[pos[0]]], {
                            [pos[1]]: val
                        })
                    });
                    dispatch({ type: "valueToBeUpdated", payload: newMatix })
                }
            }, 100 * i);
        }
    }
}

export const enableHints = () => {
    return (dispatch, getState) => {

    }
}