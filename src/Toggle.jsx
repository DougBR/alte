import { Stack, Typography, Switch } from "@mui/material";

export default function Toggle({ checked, onChange, off, on }) {
  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
      <Typography>{off}</Typography>
      <Switch checked={checked} onChange={onChange} size="large" />
      <Typography>{on}</Typography>
    </Stack>
  );
}
