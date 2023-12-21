/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import "./App.css";
import { FaTimes, FaRegCircle } from "react-icons/fa";

const winnigCombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  const [gameData, setGameData] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [turn, setTurn] = useState(1);
  const [winnerCombo, setWinnerCombo] = useState(null);

  const ClickedChange = (clickedIndex) => {
    if (gameData[clickedIndex] != 0) {
      return;
    }

    if (winnerCombo) {
      return;
    }

    setGameData((prev) => {
      const newGameData = [...prev];
      newGameData[clickedIndex] = turn;
      return newGameData;
    });

    setTurn((prev) => (prev === 1 ? 2 : 1));
  };

  useEffect(() => {
    checkGameEnded();
    checkikngWinner();
  }, [gameData]);

  useEffect(() => {
    if (winnerCombo) {
      alert("houve um vencedor");
    }
  }, [winnerCombo]);

  const checkGameEnded = () => {
    if (gameData.every((item) => item != 0)) {
      alert("jogo acabou, deu velha");
    }
  };

  const checkikngWinner = () => {
    console.log("checking Winner");
    let winner = null;

    for (let values of winnigCombination) {
      if (
        gameData[values[0]] === 1 &&
        gameData[values[1]] === 1 &&
        gameData[values[2]] === 1
      ) {
        winner = "player x";
      }
      if (
        gameData[values[0]] === 2 &&
        gameData[values[1]] === 2 &&
        gameData[values[2]] === 2
      ) {
        winner = "player o";
      }
      if (winner) {
        setWinnerCombo(values);
        break;
      }
    }

    console.log({ winner });
  };

  return (
    <>
      <header className="header">
        <h1>Tic Tac Toe</h1>
        <h3>By: <span><a href="https://github.com/luizlfsr">Luiz Felipe</a></span></h3>
      </header>
      
      <div className="turn">
        <p>
          <span>vez do jogador: </span> {turn === 1 && "x"}
          {turn === 2 && "o"}
        </p>
      </div>
      <div className="board-game">
        {gameData.map((value, index) => (
          <span key={index} onClick={() => ClickedChange(index)}>
            {value === 0 && `\u00a0`}
            {value === 1 && <FaTimes />}
            {value === 2 && <FaRegCircle />}
          </span>
        ))}
      </div>
      <a href="/tic_tac_toe_react" className="reset_button">
        resetar jogo
      </a>
      <span>&nbsp;</span>
    </>
  );
}

export default App;
