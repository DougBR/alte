import { Button } from "@mui/material";

export default function Square({ value, inWinner, onSquareClick }) {
  return (
    <Button variant={inWinner ? "contained" : "outlined"} className="square" color="primary" onClick={onSquareClick}>
      {value}
    </Button>
  );
}
