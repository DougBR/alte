import { calculateWinner } from "./boardHelpers";

export const calculateComputerMove = (emptySquares, board, gameLevel) => {
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
  const randomIndex = Math.floor(Math.random() * emptySquares.length);
  console.log("Game level: ", gameLevel);
  console.log(board);

  if (gameLevel === "low") {
    return emptySquares[randomIndex];
  }
  if (gameLevel === "super") {
    return aiMove(board);
  }

  // Check if computer can win
  for (const [a, b, c] of lines) {
    const line = [board[a], board[b], board[c]];
    const positions = [a, b, c];
    const xCount = line.filter((v) => v === "❌").length;
    const emptyIndex = line.findIndex((v) => v === null);
    if (xCount === 2 && emptyIndex !== -1) return positions[emptyIndex];
  }

  // Check if player can win, block them
  for (const [a, b, c] of lines) {
    const line = [board[a], board[b], board[c]];
    const positions = [a, b, c];
    const oCount = line.filter((v) => v === "🟢").length;
    const emptyIndex = line.findIndex((v) => v === null);
    if (oCount === 2 && emptyIndex !== -1) return positions[emptyIndex];
  }

  // Check if center is empty, prefer it
  if (emptySquares.includes(4)) return 4;

  const corners = [0, 2, 6, 8].filter((i) => emptySquares.includes(i));
  const sides = [1, 3, 5, 7].filter((i) => emptySquares.includes(i));

  // counter corners strategy
  const enemyCorners = [0, 2, 6, 8].filter((i) => board[i] === "🟢");
  if (
    gameLevel === "high" &&
    enemyCorners.length === 2 &&
    (board[0] === board[8] || (board[2] === board[6] && sides.length > 0))
  )
    return sides[Math.floor(Math.random() * sides.length)];

  //prefer corners
  if (corners.length > 0) return corners[Math.floor(Math.random() * corners.length)];

  if (sides.length > 0) return sides[Math.floor(Math.random() * sides.length)];

  return emptySquares[randomIndex];
};

const aiMove = (board) => {
  return minimax(board);
};

const minimax = (board) => {
  let [_v, move] = max_value(board);
  console.log("Move, value: ", move, _v);
  return move;
};

const max_value = (board) => {
  let v = -Infinity;
  if (terminal(board)) return [utility(board), null];
  let best_move = null;
  for (let action of actions(board)) {
    let [value, move] = min_value(result(board, action));
    if (value > v) {
      v = value;
      best_move = action;
    }
  }
  return [v, best_move];
};

const min_value = (board) => {
  let v = Infinity;
  if (terminal(board)) return [utility(board), null];
  let best_move = null;
  for (let action of actions(board)) {
    let [value, move] = max_value(result(board, action));
    if (value < v) {
      v = value;
      best_move = action;
    }
  }
  return [v, best_move];
};

const terminal = (board) => {
  return !board.includes(null) || calculateWinner(board);
};

const actions = (board) => {
  return board.map((sq, idx) => (sq === null ? idx : "")).filter(String);
};

const result = (board, action) => {
  let newBoard = board.slice();
  newBoard[action] = "❌";
  return newBoard;
};

const utility = (board) => {
  const winner = calculateWinner(board);
  if (winner === "❌") return 1;
  if (winner === "🟢") return -1;
  return 0;
};
