import { Button } from "@mui/material";

export default function MovesList({ history, currentMove, jumpTo }) {
  return (
    <ol>
      {history.map((_, move) => {
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
      })}
    </ol>
  );
}
