import Square from "../Square";

export default function BoardGrid({ squares, winnerLine, onSquareClick }) {
  return (
    <>
      {[0, 1, 2].map((row) => (
        <div key={row} className="board-row">
          {[0, 1, 2].map((col) => {
            const idx = row * 3 + col;
            return (
              <Square
                key={idx}
                inWinner={winnerLine?.includes(idx)}
                value={squares[idx]}
                onSquareClick={() => onSquareClick(idx)}
              />
            );
          })}
        </div>
      ))}
    </>
  );
}
