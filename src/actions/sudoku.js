import { solvePuzzle } from "../utils/sudoku";

export const setIdToUpdate = (id = "") => {
    return (dispatch, getState) => {
        console.log(id);

        dispatch({ type: "setIdToUpdate", payload: id })
    }
}

export const setValue = (value = 0) => {
    return (dispatch, getState) => {
        console.log(value);

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

    }
}
export const validateGame = () => {
    return (dispatch, getState) => {
        let matrix = getState().sudoku.matrix;
        const values = solvePuzzle(matrix);
        for (let i = 0; i < values.length; i++) {
            let pos = values[i];
            setTimeout(() => {
                let matrix = getState().sudoku.matrix;
                let newMatix = Object.assign([...matrix], {
                    [pos[0]]: Object.assign([...matrix[pos[0]]], {
                        [pos[1]]: "#" + pos[2]
                    })
                })
                dispatch({ type: "valueToBeUpdated", payload: newMatix })
            }, 100 * i);
        }
    }
}

export const enableHints = () => {
    return (dispatch, getState) => {

    }
}