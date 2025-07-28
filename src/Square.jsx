import { Button } from "@mui/material";

export default function Square({ value, inWinner, onSquareClick }) {
  return (
    <Button
      variant={inWinner ? "contained" : "outlined"}
      className="square"
      color="primary"
      sx={{ borderRadius: 0, fontWeight: "bold" }}
      onClick={onSquareClick}
    >
      {value}
    </Button>
  );
}
