import { useState, useMemo } from "react";
import FourWayToggle from "../FourWayToggle";
import Board from "../Board/Board";
import Toggle from "../Toggle";
import ScoreBoard from "./ScoreBoard";
import MovesList from "./MovesList";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [playAgainstComputer, setPlayAgainstComputer] = useState(false);
  const [gameLevel, setGameLevel] = useState("middle");
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [draw, setDraw] = useState(0);

  const xIsNext = useMemo(() => currentMove % 2 === 1, [currentMove]);
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(move) {
    setCurrentMove(move);
  }

  function togglePlayMode() {
    setPlayAgainstComputer((prev) => !prev);
    setDraw(0);
    setScore1(0);
    setScore2(0);
    resetBoard();
  }

  function resetBoard() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  }

  return (
    <div className="game">
      <ScoreBoard score1={score1} score2={score2} draw={draw} />

      <div className="view-order">
        <Toggle checked={playAgainstComputer} onChange={togglePlayMode} off="" on="Jogar com Bot" />
      </div>

      {playAgainstComputer && (
        <div className="level-toggle">
          <FourWayToggle
            labels={["Fácil", "Normal", "Difícil", "Impossível"]}
            option={gameLevel}
            setOption={setGameLevel}
          />
        </div>
      )}

      <div className="game-board">
        <Board
          playAgainstComputer={playAgainstComputer}
          xIsNext={xIsNext}
          gameLevel={gameLevel}
          squares={currentSquares}
          onPlay={handlePlay}
          newGame={resetBoard}
          setScore1={setScore1}
          setScore2={setScore2}
          setDraw={setDraw}
        />
      </div>

      <div className="game-info">
        <hr className="divider" />
        <span>Veja e estude os movimentos feitos:</span>
        <MovesList history={history} currentMove={currentMove} jumpTo={jumpTo} />
      </div>
    </div>
  );
}
