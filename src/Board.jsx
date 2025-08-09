import { useState, useEffect } from "react";
import Square from "./Square";
import { Snackbar, Alert } from "@mui/material";
import { calculateComputerMove } from "./computer";

export default function Board({ xIsNext, squares, gameLevel, onPlay, playAgainstComputer }) {
  const [endGame, setEndGame] = useState(false);
  let status = "Próximo jogador: " + (xIsNext ? "X" : "O");
  useEffect(() => {
    if (status.includes("Vencedor") || status.includes("velha")) setEndGame(true);
  }, [status]);

  function calculateWinner(squares) {
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
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return lines[i];
      }
    }
    return null;
  }

  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (playAgainstComputer) {
      nextSquares[i] = "O";
      onPlay(nextSquares);
      if (calculateWinner(nextSquares)) {
        return;
      }
      const emptySquares = nextSquares
        .map((square, index) => (square === null ? index : null))
        .filter((index) => index !== null);
      i = calculateComputerMove(emptySquares, nextSquares, gameLevel);
      nextSquares[i] = "X";
    } else if (xIsNext) nextSquares[i] = "X";
    else nextSquares[i] = "O";

    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let winningSquares = [-1, -1, -1];
  if (winner) {
    status = "Vencedor: " + squares[winner[0]];
    winningSquares = winner;
  } else if (squares.every((square) => square !== null)) {
    status = "Deu velha!";
  } else if (playAgainstComputer) {
    status = "Tente ganhar!";
  }

  return (
    <>
      <div className="board">
        <div className="status">{status}</div>
        {[0, 1, 2].map((i) => (
          <div key={i} className="board-row">
            {[0, 1, 2].map((j) => {
              const index = i * 3 + j;
              return (
                <Square
                  key={index}
                  inWinner={winningSquares.includes(index)}
                  value={squares[index]}
                  onSquareClick={() => handleClick(index)}
                />
              );
            })}
          </div>
        ))}
        <Snackbar open={endGame} message={status} autoHideDuration={5000} onClose={() => setEndGame(false)}>
          <Alert severity={status.includes("velha") ? "info" : "success"} sx={{ width: "100%" }}>
            {status}
          </Alert>
        </Snackbar>
      </div>
    </>
  );
}
