import { OSYMBOL, XSYMBOL, calculateWinner } from "./boardHelpers";

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
    const xCount = line.filter((v) => v === XSYMBOL).length;
    const emptyIndex = line.findIndex((v) => v === null);
    if (xCount === 2 && emptyIndex !== -1) return positions[emptyIndex];
  }

  // Check if player can win, block them
  for (const [a, b, c] of lines) {
    const line = [board[a], board[b], board[c]];
    const positions = [a, b, c];
    const oCount = line.filter((v) => v === OSYMBOL).length;
    const emptyIndex = line.findIndex((v) => v === null);
    if (oCount === 2 && emptyIndex !== -1) return positions[emptyIndex];
  }

  // Check if center is empty, prefer it
  if (emptySquares.includes(4)) return 4;

  const corners = [0, 2, 6, 8].filter((i) => emptySquares.includes(i));
  const sides = [1, 3, 5, 7].filter((i) => emptySquares.includes(i));

  // counter corners strategy
  const enemyCorners = [0, 2, 6, 8].filter((i) => board[i] === OSYMBOL);
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
  const [value, move] = minimax(board, XSYMBOL);
  return move;
};

const minimax = (board, player) => {
  return player === XSYMBOL ? maxValue(board, player) : minValue(board, player);
};

const maxValue = (board, player) => {
  if (isTerminal(board)) return [utility(board), null];

  let bestValue = -Infinity;
  let bestMove = null;

  for (const action of actions(board)) {
    const [value] = minValue(result(board, action, player), switchPlayer(player));
    if (value > bestValue) {
      bestValue = value;
      bestMove = action;
    }
  }
  return [bestValue, bestMove];
};

const minValue = (board, player) => {
  if (isTerminal(board)) return [utility(board), null];

  let bestValue = Infinity;
  let bestMove = null;

  for (const action of actions(board)) {
    const [value] = maxValue(result(board, action, player), switchPlayer(player));
    if (value < bestValue) {
      bestValue = value;
      bestMove = action;
    }
  }
  return [bestValue, bestMove];
};

const isTerminal = (board) => !board.includes(null) || Boolean(calculateWinner(board));

const actions = (board) => board.reduce((acc, sq, idx) => (sq === null ? [...acc, idx] : acc), []);

const result = (board, action, player) => {
  const newBoard = [...board];
  newBoard[action] = player;
  return newBoard;
};

const utility = (board) => {
  const winnerLine = calculateWinner(board);
  const winner = winnerLine ? board[winnerLine[0]] : null;
  if (winner === XSYMBOL) return 1;
  if (winner === OSYMBOL) return -1;
  return 0;
};

const switchPlayer = (player) => (player === XSYMBOL ? OSYMBOL : XSYMBOL);
