import { useState } from "react";
import Square from "./Square";
import { Snackbar, Alert } from "@mui/material";
import { calculateComputerMove } from "./computer";

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
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [a, b, c];
    }
  }
  return null;
}

export default function Board({
  xIsNext,
  squares,
  gameLevel,
  onPlay,
  playAgainstComputer,
  updatePlayer1Score,
  updatePlayer2Score,
  resetGame,
}) {
  const [endGame, setEndGame] = useState(false);
  const winnerLine = calculateWinner(squares);
  const winnerSymbol = winnerLine ? squares[winnerLine[0]] : null;
  const isDraw = !winnerSymbol && squares.every((sq) => sq !== null);

  let status;
  if (winnerSymbol) {
    status = `Vencedor: ${winnerSymbol}`;
  } else if (isDraw) {
    status = "Deu velha!";
  } else {
    status = playAgainstComputer ? "Tente ganhar!" : `Próximo jogador: ${xIsNext ? "X" : "O"}`;
  }

  function endRound(winner) {
    if (winner === "O") updatePlayer1Score((p) => p + 1);
    else if (winner === "X") updatePlayer2Score((p) => p + 1);
    setEndGame(true);
  }

  function handleClick(i) {
    if (winnerSymbol || squares[i]) return;

    let nextSquares = squares.slice();

    if (playAgainstComputer) {
      nextSquares[i] = "O";
      if (calculateWinner(nextSquares)) {
        endRound("O");
        onPlay(nextSquares);
        return;
      }
      if (!nextSquares.includes(null)) {
        setEndGame(true);
        onPlay(nextSquares);
        return;
      }
      const emptySquares = nextSquares.map((sq, idx) => (sq === null ? idx : null)).filter((idx) => idx !== null);
      const compIndex = calculateComputerMove(emptySquares, nextSquares, gameLevel);
      nextSquares[compIndex] = "X";
      if (calculateWinner(nextSquares)) {
        endRound("X");
      }
    } else {
      nextSquares[i] = xIsNext ? "X" : "O";
      const winnerNow = calculateWinner(nextSquares);
      if (winnerNow) {
        endRound(nextSquares[winnerNow[0]]);
      } else if (!nextSquares.includes(null)) {
        setEndGame(true);
      }
    }

    onPlay(nextSquares);
  }

  return (
    <div className="board">
      <div className="status">{status}</div>
      {[0, 1, 2].map((row) => (
        <div key={row} className="board-row">
          {[0, 1, 2].map((col) => {
            const idx = row * 3 + col;
            return (
              <Square
                key={idx}
                inWinner={winnerLine?.includes(idx)}
                value={squares[idx]}
                onSquareClick={() => handleClick(idx)}
              />
            );
          })}
        </div>
      ))}

      <Snackbar open={endGame} autoHideDuration={5000} onClose={() => setEndGame(false)}>
        <Alert severity={isDraw ? "info" : "success"} sx={{ width: "100%" }} onClose={() => setEndGame(false)}>
          {status}
        </Alert>
      </Snackbar>
    </div>
  );
}
