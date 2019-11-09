import React from 'react';
import './App.css';
import Header from './components/layout/Header';
import Sudoku from './components/game/Sudoku';


function getDummyData() {
  const x = []
  for(var i = 0; i<9; i++) {
      x.push("123456789".split(""))
  }
  return [[0,"#1",8,4,0,3,5,0,6],
  [0,0,3,1,0,2,0,0,4],
  [0,4,5,7,0,0,0,9,0],
  [6,9,0,0,0,5,0,0,7],
  [0,8,0,0,0,0,0,5,0],
  [4,0,0,3,0,0,0,1,8],
  [0,7,0,0,0,6,2,4,0],
  [1,0,0,5,0,7,8,0,0],
  [8,0,6,9,0,1,3,0,0]];
}
function App() {

  return (
    <div className="App">
      <Header title={"Sudoko"} />
      <Sudoku data={getDummyData()}/>
    </div>
  );
}

export default App;
