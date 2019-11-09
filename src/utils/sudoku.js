export const checkRow = (matirx, row, value) => {
    for (let i = 0; i < matirx[row].length; i++) {
        if (matirx[row][i] === value) {
            return false;
        }
    }
    return true;
}

export const checkColumn = (matirx, column, value) => {
    for (let i = 0; i < matirx.length; i++) {
        if (matirx[i][column] === value) {
            return false;
        }
    }
    return true;
}

export const check3x3Square = (matirx, column, row, value) => {
    let columnCorner = 0,
        rowCorner = 0,
        squareSize = 3;
    while (column >= columnCorner + squareSize) {
        columnCorner += squareSize;
    }
    while (row >= rowCorner + squareSize) {
        rowCorner += squareSize;
    }

    for (let i = rowCorner; i < rowCorner + squareSize; i++) {
        for (let j = columnCorner; j < columnCorner + squareSize; j++) {
            if (matirx[i][j] === value) {
                return false;
            }
        }
    }
    return true;
}

export const checkValue = (matirx, column, row, value) => {
    if (checkRow(matirx, row, value) &&
        checkColumn(matirx, column, value) &&
        check3x3Square(matirx, column, row, value)) {
        return true;
    } else {
        return false;
    }
};

export const solvePuzzle = (matrix, emptyPositions) => {
    let newMatrix = cloneMatrix(matrix);
    let limit = 9,
        i, row, column, value, found;
    
    emptyPositions = emptyPositions || getEmptySpots(matrix)
    for (i = 0; i < emptyPositions.length;) {
        row = emptyPositions[i][0];
        column = emptyPositions[i][1];
        value = newMatrix[row][column] + 1;
        found = false;
        while (!found && value <= limit) {
            if (checkValue(newMatrix, column, row, value)) {
                found = true;
                newMatrix[row][column] = value;
                emptyPositions[i][2] = value;
                i++;
            } else {
                value++;
            }
        }
        if (!found) {
            newMatrix[row][column] = 0;
            i--;
        }
    }
    return emptyPositions
};

const cloneMatrix= (matrix)=> {
    const newMatrix = [];
    for (let i = 0; i < matrix.length; i++) {
        newMatrix.push([...matrix[i]]);
    }
    return newMatrix
}

export const getEmptySpots = (matrix)=>{
    const emptyList = [];
    for (let i = 0; i < matrix.length; i++) {
        const row = matrix[i];
        for (let j = 0; j < row.length; j++) {
            const el = row[j];
            if(el === 0 || typeof el === "string") {
                emptyList.push([i,j]);
            }
        }
    };
    return emptyList;
}