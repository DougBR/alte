import { Stack, Typography, Switch } from "@mui/material";

export default function Toggle({ checked, onChange, off, on }) {
  return (
    <Stack className="toggle" direction="row" spacing={1}>
      <Typography>{off}</Typography>
      <Switch checked={checked} onChange={onChange} size="large" />
      <Typography>{on}</Typography>
    </Stack>
  );
}
