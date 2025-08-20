import { Box, Typography } from "@mui/material";

export default function ScoreBoard({ score1, score2, draw }) {
  return (
    <Box className="placcard">
      <Typography variant="h5" component="h1">
        🟢: {score1} | ❌: {score2} | #️⃣: {draw}
      </Typography>
    </Box>
  );
}
