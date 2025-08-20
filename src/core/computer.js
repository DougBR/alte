import { OSYMBOL, XSYMBOL, calculateWinner } from "../core/boardHelpers";

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

  if (gameLevel === "low") {
    return randomChoice(emptySquares);
  }

  if (gameLevel === "super") {
    return aiMove(board, XSYMBOL);
  }

  const winMove = findWinningMove(XSYMBOL, board, lines);
  if (winMove !== null) return winMove;

  const blockMove = findWinningMove(OSYMBOL, board, lines);
  if (blockMove !== null) return blockMove;

  if (emptySquares.includes(4)) return 4;

  const corners = [0, 2, 6, 8].filter((i) => emptySquares.includes(i));
  const sides = [1, 3, 5, 7].filter((i) => emptySquares.includes(i));

  const enemyCorners = [0, 2, 6, 8].filter((i) => board[i] === OSYMBOL);
  if (
    gameLevel === "high" &&
    enemyCorners.length === 2 &&
    (board[0] === board[8] || board[2] === board[6]) &&
    sides.length > 0
  ) {
    return randomChoice(sides);
  }

  if (corners.length > 0) return randomChoice(corners);

  if (sides.length > 0) return randomChoice(sides);

  return randomChoice(emptySquares);
};

const findWinningMove = (symbol, board, lines) => {
  for (const [a, b, c] of lines) {
    const line = [board[a], board[b], board[c]];
    const positions = [a, b, c];
    const count = line.filter((v) => v === symbol).length;
    const emptyIndex = line.findIndex((v) => v === null);
    if (count === 2 && emptyIndex !== -1) {
      return positions[emptyIndex];
    }
  }
  return null;
};

const randomChoice = (arr) => arr[Math.floor(Math.random() * arr.length)];

const aiMove = (board, player) => {
  const [, move] = minimax(board, player);
  return move;
};

const minimax = (board, player) => (player === XSYMBOL ? maxValue(board) : minValue(board));

const maxValue = (board) => {
  if (isTerminal(board)) return [utility(board), null];

  let bestValue = -Infinity,
    bestMove = null;
  for (const action of actions(board)) {
    const [value] = minValue(result(board, action, XSYMBOL));
    if (value > bestValue) [bestValue, bestMove] = [value, action];
  }
  return [bestValue, bestMove];
};

const minValue = (board) => {
  if (isTerminal(board)) return [utility(board), null];

  let bestValue = Infinity,
    bestMove = null;
  for (const action of actions(board)) {
    const [value] = maxValue(result(board, action, OSYMBOL));
    if (value < bestValue) [bestValue, bestMove] = [value, action];
  }
  return [bestValue, bestMove];
};

const isTerminal = (board) => !board.includes(null) || Boolean(calculateWinner(board));

const actions = (board) => {
  const moves = [];
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) moves.push(i);
  }
  return moves;
};

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
