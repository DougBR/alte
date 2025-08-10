import { useState } from "react";
import { Button } from "@mui/material";
import ThreeWayToggle from "./ThreeWayToggle";
import Board from "./Board";
import Toggle from "./Toggle";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [playAgainstComputer, setPlayAgainstComputer] = useState(false);
  const [gameLevel, setGameLevel] = useState("middle");
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);

  const xIsNext = currentMove % 2 === 1;
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
    setPlayAgainstComputer((prev) => !prev);
    resetGame();
  }

  function resetGame() {
    jumpTo(0);
    setHistory([Array(9).fill(null)]);
  }

  const moves = history.map((_, move) => {
    let description;
    if (move > 0) {
      description = move === currentMove ? `Movimento atual #${move}` : `Ir para o movimento #${move}`;
    } else {
      description = "Ir para o movimento inicial";
    }

    return (
      <li className="move-list" key={move}>
        <Button className="move-button" onClick={() => jumpTo(move)}>
          {description}
        </Button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="placcard">
        <h1>
          Placar: {player1Score} vs {player2Score}
        </h1>
      </div>

      <div className="game-board">
        <Board
          playAgainstComputer={playAgainstComputer}
          xIsNext={xIsNext}
          gameLevel={gameLevel}
          squares={currentSquares}
          onPlay={handlePlay}
          updatePlayer1Score={setPlayer1Score}
          updatePlayer2Score={setPlayer2Score}
          resetGame={resetGame}
        />

        <div className="view-order">
          <Toggle checked={playAgainstComputer} onChange={changePlayMode} off="" on="Jogar com Bot" />
        </div>

        <div className="level-toggle">
          {playAgainstComputer && (
            <ThreeWayToggle labels={["Fácil", "Normal", "Difícil"]} option={gameLevel} setOption={setGameLevel} />
          )}
        </div>

        <div className="game-restart">
          <Button variant="contained" color="secondary" onClick={resetGame}>
            Reiniciar
          </Button>
        </div>
      </div>

      <div className="game-info">
        <hr className="divider" />
        <span>Veja e estude os movimentos feitos:</span>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
