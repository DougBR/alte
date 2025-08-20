import { OSYMBOL, endMessage } from "../../core/boardHelpers";

export default function GameStatus({ winnerSymbol, isDraw, xIsNext, playAgainstComputer }) {
  let status;
  if (winnerSymbol) {
    if (playAgainstComputer) {
      status = winnerSymbol === OSYMBOL ? "Nossa, parabéns!!!" : "Perdeu, mané :/";
    } else {
      status = endMessage();
    }
  } else if (isDraw) {
    status = "Deu velha!";
  } else {
    status = playAgainstComputer ? "Tente ganhar!" : `Próximo jogador: ${xIsNext ? "X" : "O"}`;
  }

  return <div className="status">{status}</div>;
}
