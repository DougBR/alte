import Square from "./Square";

export default function Board({ xIsNext, squares, onPlay, playAgainstComputer }) {
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

  function calculateComputerMove(emptySquares, board) {
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

    for (const [a, b, c] of lines) {
      const line = [board[a], board[b], board[c]];
      const positions = [a, b, c];
      const xCount = line.filter((v) => v === "X").length;
      const emptyIndex = line.findIndex((v) => v === null);
      if (xCount === 2 && emptyIndex !== -1) return positions[emptyIndex];
    }

    for (const [a, b, c] of lines) {
      const line = [board[a], board[b], board[c]];
      const positions = [a, b, c];
      const oCount = line.filter((v) => v === "O").length;
      const emptyIndex = line.findIndex((v) => v === null);
      if (oCount === 2 && emptyIndex !== -1) return positions[emptyIndex];
    }

    if (emptySquares.includes(4)) return 4;

    const corners = [0, 2, 6, 8].filter((i) => emptySquares.includes(i));
    if (corners.length > 0) return corners[0];

    const sides = [1, 3, 5, 7].filter((i) => emptySquares.includes(i));
    if (sides.length > 0) return sides[0];

    const randomIndex = Math.floor(Math.random() * emptySquares.length);
    return emptySquares[randomIndex];
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
      i = calculateComputerMove(emptySquares, nextSquares);
      nextSquares[i] = "X";
    } else if (xIsNext) nextSquares[i] = "X";
    else nextSquares[i] = "O";

    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let winningSquares = [-1, -1, -1];
  let status;
  if (winner) {
    status = "Vencedor: " + squares[winner[0]];
    winningSquares = winner;
  } else if (squares.every((square) => square !== null)) {
    status = "Deu velha!";
  } else if (playAgainstComputer) {
    status = "Pode jogar";
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
