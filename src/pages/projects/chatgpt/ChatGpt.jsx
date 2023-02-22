import React, { useState } from "react";

export const ChatGpt = () => {
  const [board, setBoard] = useState(Array(9).fill(null)); // The game board
  const [player, setPlayer] = useState("X"); // The current player

  // Function to handle a player clicking on a square
  function handleClick(index) {
    // If the square is already filled or the game is over, return
    if (board[index] || calculateWinner(board)) {
      return;
    }

    // Update the board with the current player's symbol
    const newBoard = [...board];
    newBoard[index] = player;
    setBoard(newBoard);

    // Check if there is a winner
    const winner = calculateWinner(newBoard);
    if (winner) {
      alert(`Player ${winner} wins!`);
      setBoard(Array(9).fill(null));
      return;
    }

    // Switch to the other player
    setPlayer(player === "X" ? "O" : "X");
  }

  return(
    <div className="tic-tac-toe">
      <h1>Tic Tac Toe</h1>
      <div className="board">
        {/* Map over the board array and create a Square component for each square on the board */}
        <div className="row">
          {board.slice(0, 3).map((square, index) => (
            <Square
              key={index}
              value={square}
              onClick={() => handleClick(index)}
            />
          ))}
        </div>
        <div className="row">
          {board.slice(3, 6).map((square, index) => (
            <Square
              key={index + 3}
              value={square}
              onClick={() => handleClick(index + 3)}
            />
          ))}
        </div>
        <div className="row">
          {board.slice(6, 9).map((square, index) => (
            <Square
              key={index + 6}
              value={square}
              onClick={() => handleClick(index + 6)}
            />
          ))}
        </div>
      </div>
      <p>Current player: {player}</p>
    </div>
  )
}

// A component to represent a square on the game board
function Square({ value, onClick }) {
  return (
    <div className="square" onClick={onClick}>
      {value}
    </div>
  );
}

// Function to check if a player has won the game
function calculateWinner(board) {
  // Array of all possible winning combinations
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Loop over each possible winning combination
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    // If all three squares in this combination are filled with the same symbol, we have a winner!
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  // If no winner was found, return null
  return null;
}
