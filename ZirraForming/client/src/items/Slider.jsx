import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { useEffect } from "react";

export function MySlider({ value, setNow, count, color }) {
  return (
    <Box>
      <Slider
        sx={{
          color: color,
          height: 8,
          "& .MuiSlider-track": {
            border: `3px solid ${color}`,
            backgroundColor: "black",
            borderRadius: "1px",
          },
          "& .MuiSlider-rail": {
            border: `3px solid ${color}`,
            backgroundColor: "black",
            borderRadius: "1px",
          },
          "& .MuiSlider-thumb": {
            height: 20,
            width: 20,
            border: `3px solid ${color}`,
            backgroundColor: "black",
            "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
              boxShadow: "inherit",
            },
          },
          "&:before": {
            display: "none",
          },

          "& .MuiSlider-valueLabel": {
            lineHeight: 1.2,
            fontSize: 12,
            background: "unset",
            padding: 0,
            width: 32,
            height: 32,
            borderRadius: "50% 50% 50% 0",
            backgroundColor: "#52af77",
            transformOrigin: "bottom left",
            transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
            "&:before": { display: "none" },
            "&.MuiSlider-valueLabelOpen": {
              transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
            },
            "& > *": {
              transform: "rotate(45deg)",
            },
          },
        }}
        min={0}
        max={count}
        onChange={(e, v) => setNow(v)}
        value={value}
      />
    </Box>
  );
}

export default MySlider;
