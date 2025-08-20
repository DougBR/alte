export function calculateWinner(squares) {
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

export function endMessage() {
  const messages = [
    "...",
    "Revanche?",
    "Moleza!",
    "gg easy",
    "Essa foi mole",
    "Vs bot?",
    "Belas jogadas",
    "Vamos de novo",
    "Nunca desista!",
  ];
  return messages[Math.floor(Math.random() * messages.length)];
}
