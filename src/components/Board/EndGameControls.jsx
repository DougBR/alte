import { Button, Box } from "@mui/material";

export default function EndGameControls({ endGame, onNewGame }) {
  return (
    <div className="game-restart">
      {endGame ? (
        <Button variant="contained" color="secondary" onClick={onNewGame}>
          Novo Jogo
        </Button>
      ) : (
        <Box className="empty-box" />
      )}
    </div>
  );
}
