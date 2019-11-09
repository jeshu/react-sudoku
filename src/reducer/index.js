import { combineReducers } from "redux";
import AppDataReducer from "./AppDataReducer";
import SudokuMatix from "./SudokuMatix";


export default combineReducers({
    appData: AppDataReducer,
    sudoku: SudokuMatix
})