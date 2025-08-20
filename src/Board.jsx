import { useState } from "react";
import Square from "./components/Square";
import { Button, Box } from "@mui/material";
import { Snackbar, Alert } from "@mui/material";
import { calculateComputerMove } from "./core/computer";
import { OSYMBOL, XSYMBOL, calculateWinner, endMessage } from "./core/boardHelpers";

export default function Board({
  xIsNext,
  squares,
  gameLevel,
  onPlay,
  playAgainstComputer,
  setScore1,
  setScore2,
  setDraw,
  newGame,
}) {
  const [endGame, setEndGame] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const winnerLine = calculateWinner(squares);
  const winnerSymbol = winnerLine ? squares[winnerLine[0]] : null;
  const isDraw = !winnerSymbol && squares.every((sq) => sq !== null);

  let status;
  if (winnerSymbol) {
    if (playAgainstComputer) {
      if (winnerSymbol === OSYMBOL) status = "Nossa, parabéns!!!";
      else if (winnerSymbol === XSYMBOL) status = "Perdeu, mané :/";
    } else status = endMessage();
  } else if (isDraw) {
    status = "Deu velha!";
  } else {
    status = playAgainstComputer ? "Tente ganhar!" : `Próximo jogador: ${xIsNext ? "X" : "O"}`;
  }

  function endRound(winner) {
    if (winner === OSYMBOL) setScore1((p) => p + 1);
    else if (winner === XSYMBOL) setScore2((p) => p + 1);
    else setDraw((d) => d + 1);
    setEndGame(true);
    setShowAlert(true);
  }

  function handleClick(i) {
    if (winnerSymbol || squares[i]) return;

    let nextSquares = squares.slice();

    if (playAgainstComputer) {
      nextSquares[i] = OSYMBOL;
      if (calculateWinner(nextSquares)) {
        endRound(OSYMBOL);
        onPlay(nextSquares);
        return;
      }
      if (!nextSquares.includes(null)) {
        endRound("#");
        onPlay(nextSquares);
        return;
      }
      const emptySquares = nextSquares.map((sq, idx) => (sq === null ? idx : null)).filter((idx) => idx !== null);
      const compIndex = calculateComputerMove(emptySquares, nextSquares, gameLevel);
      nextSquares[compIndex] = XSYMBOL;
      if (calculateWinner(nextSquares)) {
        endRound(XSYMBOL);
      }
    } else {
      nextSquares[i] = xIsNext ? XSYMBOL : OSYMBOL;
      const winnerNow = calculateWinner(nextSquares);
      if (winnerNow) {
        endRound(nextSquares[winnerNow[0]]);
      } else if (!nextSquares.includes(null)) {
        endRound("#");
      }
    }

    onPlay(nextSquares);
  }

  function handleNewGame() {
    setEndGame(false);
    newGame();
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
      <div className="game-restart">
        {endGame ? (
          <Button variant="contained" color="secondary" onClick={handleNewGame}>
            Novo Jogo
          </Button>
        ) : (
          <Box className="empty-box" />
        )}
      </div>
      <Snackbar open={showAlert} autoHideDuration={2000} onClose={() => setShowAlert(false)}>
        <Alert severity={isDraw ? "info" : "success"} className="alert" onClose={() => setShowAlert(false)}>
          {winnerSymbol ? "Vencedor: " + winnerSymbol : "Deu velha!"}
        </Alert>
      </Snackbar>
    </div>
  );
}
