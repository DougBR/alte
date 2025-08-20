import { ToggleButtonGroup, ToggleButton } from "@mui/material";

export default function ThreeWayToggle({ labels, option, setOption }) {
  const handleChange = (event, newValue) => {
    if (newValue === null) return;

    setOption(newValue);
  };
  return (
    <div className="three-way-toggle">
      <ToggleButtonGroup color="primary" value={option} exclusive onChange={handleChange}>
        <ToggleButton value="low">{labels[0]}</ToggleButton>
        <ToggleButton value="middle">{labels[1]}</ToggleButton>
        <ToggleButton value="high">{labels[2]}</ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}
