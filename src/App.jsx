import { useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import FourWayToggle from "./components/FourWayToggle";
import Board from "./components/Board/Board";
import Toggle from "./components/Toggle";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [playAgainstComputer, setPlayAgainstComputer] = useState(false);
  const [gameLevel, setGameLevel] = useState("middle");
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [draw, setDraw] = useState(0);

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
    setDraw(0);
    setScore1(0);
    setScore2(0);
    newGame();
  }

  function newGame() {
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
      <Box className="placcard">
        <Typography variant="h5" component="h1">
          🟢: {score1} | ❌: {score2} | #️⃣: {draw}
        </Typography>
      </Box>
      <div className="view-order">
        <Toggle checked={playAgainstComputer} onChange={changePlayMode} off="" on="Jogar com Bot" />
      </div>

      <div className="level-toggle">
        {playAgainstComputer && (
          <FourWayToggle
            labels={["Fácil", "Normal", "Difícil", "Impossível"]}
            option={gameLevel}
            setOption={setGameLevel}
          />
        )}
      </div>
      <div className="game-board">
        <Board
          playAgainstComputer={playAgainstComputer}
          xIsNext={xIsNext}
          gameLevel={gameLevel}
          squares={currentSquares}
          onPlay={handlePlay}
          newGame={newGame}
          setScore1={setScore1}
          setScore2={setScore2}
          setDraw={setDraw}
        />
      </div>

      <div className="game-info">
        <hr className="divider" />
        <span>Veja e estude os movimentos feitos:</span>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
