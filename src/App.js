import { useState } from "react";
import { Button, Stack, Typography, Switch } from "@mui/material";

function Square({ value, inWinner, onSquareClick }) {
  return (
    <Button
      variant={inWinner ? "contained" : "outlined"}
      className="square"
      color="primary"
      sx={{ borderRadius: 0, fontWeight: "bold" }}
      onClick={onSquareClick}
    >
      {value}
    </Button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let winningSquares = [-1, -1, -1];
  let status;
  if (winner) {
    status = "Vencedor: " + winner[0];
    winningSquares = winner;
  } else {
    status = "Próximo jogador: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      {[0, 1, 2].map((i) => (
        <div key={i} className="board-row">
          {[0, 1, 2].map((j) => (
            <Square
              key={j}
              inWinner={winningSquares.includes(i * 3 + j)}
              value={squares[i * 3 + j]}
              onSquareClick={() => handleClick(i * 3 + j)}
            />
          ))}
        </div>
      ))}
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [ascending, setAscending] = useState(true);
  const [playMode, setPlayMode] = useState(false);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function changePlayMode() {
    setPlayMode(!playMode);
    jumpTo(0);
    setHistory([Array(9).fill(null)]);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      if (move === currentMove) {
        description = "Movimento atual #" + move;
      } else {
        description = "Ir para o movimento #" + move;
      }
    } else {
      description = "Ir para o movimento inicial";
    }
    return (
      <li key={move}>
        <Button color="primary" onClick={() => jumpTo(move)}>
          {description}
        </Button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        <div className="view-order">
          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
            <Typography>Humano x humano</Typography>
            <Switch checked={playMode} onChange={changePlayMode} />
            <Typography>Humano x computador</Typography>
          </Stack>
        </div>
      </div>
      <div className="game-info">
        <div className="view-order">
          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
            <Typography>Decrescente</Typography>
            <Switch checked={ascending} onChange={() => setAscending(!ascending)} />
            <Typography>Crescente</Typography>
          </Stack>
        </div>
        <ol reversed={!ascending}>{ascending ? moves : moves.reverse()}</ol>
      </div>
    </div>
  );
}

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
