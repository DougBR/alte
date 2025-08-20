import { useState } from "react";
import GameStatus from "./GameStatus";
import BoardGrid from "./BoardGrid";
import EndGameControls from "./EndGameControls";
import EndGameSnackbar from "./EndGameSnackbar";
import { calculateComputerMove } from "../../core/computer";
import { OSYMBOL, XSYMBOL, calculateWinner } from "../../core/boardHelpers";

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

  function endRound(winner) {
    if (winner === OSYMBOL) setScore1((p) => p + 1);
    else if (winner === XSYMBOL) setScore2((p) => p + 1);
    else setDraw((d) => d + 1);

    setEndGame(true);
    setShowAlert(true);
  }

  function playComputerTurn(nextSquares) {
    const emptySquares = nextSquares.map((sq, idx) => (sq === null ? idx : null)).filter((i) => i !== null);
    const compIndex = calculateComputerMove(emptySquares, nextSquares, gameLevel);

    nextSquares[compIndex] = XSYMBOL;
    if (calculateWinner(nextSquares)) endRound(XSYMBOL);
  }

  function playHumanTurn(i) {
    if (squares[i] || winnerSymbol) return;

    let nextSquares = [...squares];

    if (playAgainstComputer) {
      nextSquares[i] = OSYMBOL;

      if (calculateWinner(nextSquares)) {
        endRound(OSYMBOL);
      } else if (!nextSquares.includes(null)) {
        endRound("#"); // draw
      } else {
        playComputerTurn(nextSquares);
      }
    } else {
      nextSquares[i] = xIsNext ? XSYMBOL : OSYMBOL;

      if (calculateWinner(nextSquares)) {
        endRound(nextSquares[calculateWinner(nextSquares)[0]]);
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
      <GameStatus
        winnerSymbol={winnerSymbol}
        isDraw={isDraw}
        xIsNext={xIsNext}
        playAgainstComputer={playAgainstComputer}
      />

      <BoardGrid squares={squares} winnerLine={winnerLine} onSquareClick={playHumanTurn} />

      <EndGameControls endGame={endGame} onNewGame={handleNewGame} />

      <EndGameSnackbar
        open={showAlert}
        onClose={() => setShowAlert(false)}
        isDraw={isDraw}
        winnerSymbol={winnerSymbol}
      />
    </div>
  );
}
