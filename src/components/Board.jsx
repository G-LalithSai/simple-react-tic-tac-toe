import React, { useState } from "react";
import Block from "./Block";

const Board = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [choice, setChoice] = useState(true);
  const [warn, setWarn] = useState(false);

  const handleBlock = (board, index) => {
    const boardCopy = [...board];
    boardCopy[index] = choice ? "X" : "O";
    setBoard(boardCopy);
    setChoice(!choice);
  };

  const checkWinner = () => {
    const possibilities = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let possibility of possibilities) {
      const [a, b, c] = possibility;
      if (board[a] !== null && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return false;
  };

  const checkEmpty = () => {
    const emptyBlock = board.filter((block) => {
      return block === null;
    });
    return emptyBlock.length;
  };

  const isWinner = checkWinner();
  const isEmpty = checkEmpty();

  const handleError = () => {
    setTimeout(() => {
      setWarn(false);
    }, 2000);
    setWarn(true);
  };

  const handleClick = (index) => {
    board[index] === null ? handleBlock(board, index) : handleError();
  };

  const checkState = (isWinner, isEmpty) => {
    if (isWinner) {
      return `${isWinner} won the game 🥳`;
    } else if (isEmpty === 0) {
      return "game over 😵‍💫";
    } else {
      return false;
    }
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setChoice(true);
  };

  const gameStatus = checkState(isWinner, isEmpty);

  return (
    <div>
      <div>
        <p
          className="error"
          style={{ color: "red", display: warn ? "block" : "none" }}
        >
          Block already selected
        </p>
        {gameStatus ? (
          <div>
            <h1>{gameStatus}</h1>
            <div>
              <button onClick={handleReset}>Restart</button>
            </div>
          </div>
        ) : (
          <div className="game">
            <div className="board">
              {board.map((item, index) => (
                <Block
                  key={index}
                  onCLick={() => handleClick(index)}
                  value={item}
                />
              ))}
            </div>
            <div className="player">
              <div className="card">
                <div
                  style={{
                    fontSize: "40px",
                    fontWeight: "900",
                  }}
                >
                  {choice ? "X" : "O"}
                </div>
                <div>Turn</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Board;
