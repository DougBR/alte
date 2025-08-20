import { Snackbar, Alert } from "@mui/material";

export default function EndGameSnackbar({ open, onClose, isDraw, winnerSymbol }) {
  return (
    <Snackbar open={open} autoHideDuration={2000} onClose={onClose}>
      <Alert severity={isDraw ? "info" : "success"} className="alert" onClose={onClose}>
        {winnerSymbol ? "Vencedor: " + winnerSymbol : "Deu velha!"}
      </Alert>
    </Snackbar>
  );
}
