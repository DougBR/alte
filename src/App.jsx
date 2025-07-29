import { useState } from "react";
import { Button } from "@mui/material";
import ThreeWayToggle from "./ThreeWayToggle";
import Board from "./Board";
import Toggle from "./Toggle";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [ascending, setAscending] = useState(true);
  const [playAgainstComputer, setPlayAgainstComputer] = useState(false);
  const [gameLevel, setGameLevel] = useState("middle");

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
    setPlayAgainstComputer(!playAgainstComputer);
    jumpTo(0);
    setHistory([Array(9).fill(null)]);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      if (move === currentMove) description = "Movimento atual #" + move;
      else description = "Ir para o movimento #" + move;
    } else description = "Ir para o movimento inicial";

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
        <Board
          playAgainstComputer={playAgainstComputer}
          xIsNext={xIsNext}
          gameLevel={gameLevel}
          squares={currentSquares}
          onPlay={handlePlay}
        />
        <div className="view-order">
          <Toggle checked={playAgainstComputer} onChange={changePlayMode} off="HumanoxHumano" on="HumanoxComputador" />
        </div>
        <div className="level-toggle">
          {playAgainstComputer && (
            <ThreeWayToggle labels={["Fácil", "Normal", "Difícil"]} option={gameLevel} setOption={setGameLevel} />
          )}
        </div>
        <div className="game-restart">
          <Button variant="contained" color="secondary" onClick={() => jumpTo(0)}>
            Reiniciar
          </Button>
        </div>
      </div>
      <div className="game-info">
        <div className="view-order">
          <Toggle checked={ascending} onChange={() => setAscending(!ascending)} off="Decrescente" on="Crescente" />
        </div>
        <ol reversed={!ascending}>{ascending ? moves : moves.reverse()}</ol>
      </div>
    </div>
  );
}
