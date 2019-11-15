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
        if (i === -1) {
            return [];
        }
    }
    return emptyPositions
};

const cloneMatrix = (matrix) => {
    const newMatrix = [];
    for (let i = 0; i < matrix.length; i++) {
        newMatrix.push(matrix[i].map(el => {
            return typeof el === "string" ? 0 : el;
        }));
    }
    return newMatrix
}

export const getEmptySpots = (matrix) => {
    const emptyList = [];
    for (let i = 0; i < matrix.length; i++) {
        const row = matrix[i];
        for (let j = 0; j < row.length; j++) {
            const el = row[j];
            if (el === 0 || typeof el === "string") {
                emptyList.push([i, j, el]);
            }
        }
    };
    return emptyList;
}

//------- new game  methods....

const getBoard = () => {
    let x = new Map();
    for (let r = 0; r < 9; r++) {
        let row = new Map()
        x.set(r, row);
        for (let c = 0; c < 9; c++) {
            row.set(c, 0)
        }
    }
    return x;
}
const getMatrixFromMap = (mapData) => {
    let arr = [...mapData.values()];
    for (let i = 0; i < mapData.size; i++)
        arr[i] = [...arr[i].values()];
    return arr;
}

const isValidInput = (map, row, col, value) => {
    // for row
    let i = 0;
    let mapRow = map.get(row)
    while (mapRow.size > i) {
        if (mapRow.get(i) === value)
            return false;
        i++;
    }

    // for col
    let j = 0;
    while (map.size > j) {
        if (map.get(j).get(col) === value)
            return false;
        j++;
    }

    //   // for 3x3 box
    let x = Math.floor(row / 3) * 3;
    let y = Math.floor(col / 3) * 3;
    let maxX = x + 3;
    let maxY = y + 3;
    // console.log("check -----------------")
    while (x < maxX) {
        // console.log("3x3 check x", `r${row}-c${col}`, x, y, value)
        while (y < maxY) {
            // console.log("3x3 check y", `r${row}-c${col}`, x, y, value)
            if (map.get(x).get(y) === value)
                return false;
            y++
        }
        x++;
        y = Math.floor(col / 3) * 3;
    }

    return true;
}

const setNvalues = (map, rRow, rCol, i = 0, j = 0, counter = 0, cb) => {
    counter++
    if (i ===9) {
        console.log(counter);
        cb(getMatrixFromMap(map))
    }
    if (i < 9 && j < 9) {
        let row = map.get(i);
        if (i !== rRow || j !== rCol) {
            let value = row.get(j) + 1,
                found = false;
            while (found === false && value <= 9) {
                if (isValidInput(map, i, j, value)) {
                    found = true;
                } else {
                    value++;
                }
            }
            if (found) {
                row.set(j, value);
                j++;
                if (j === 9) {
                    i++;
                    j = 0;
                }
            } else {
                row.set(j, 0);
                j--;
                if (j < 0) {
                    j = 0;
                    i--;
                }
            }
            // console.log(`check ${i}-${j}`, value, found);
        } else {
            j++;
            if (j === 9) {
                i++;
                j = 0;
            }
        }
        
        if( i >= 0 && j >= 0) {
            setTimeout(setNvalues,0, map, rRow, rCol, i, j, counter, cb)
        } else {
            console.log("seed ------ i or j got -1");  
        }
        
    }
    if (i === -1) {
        console.log("failed in getting new matirx")
    }
}

export const generateBoard = (cb) => {
    const map = getBoard();
    // initial seed added...

    // let rRow = Math.floor(Math.random() * 3);
    let set = [1,2,3,4,5,6,7,8,9];

    for (let i = 0; i < 9; i++) {
        let val = Math.floor(Math.random() * set.length);
        map.get(0).set(i, set[val]);
        set.splice(val,1);
    }
    const finalMap = setNvalues(map, 0, 1, 1, 0, 0, (data)=>{
        console.log(data);
        let count = 0;
        while(count < 40) {
            let row = Math.floor(Math.random()*9); 
            let col = Math.floor(Math.random()*9); 
            let val = data[row][col]
            if(val !== 0) {
                data[row][col] = 0;
                count++;
            }
        }
        for(let i = 0; i< 40; i++) {
        }
        cb(data);
    })
    return finalMap
}



