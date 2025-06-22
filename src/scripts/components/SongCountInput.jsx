import React, { useRef, useEffect, useState } from "react";
import Slider from "@mui/material/Slider";
import MuiInput from "@mui/material/Input";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";

const Input = styled(MuiInput)`
  width: 50px;
`;

export default function SongCountInput({ numSongs, setNumSongs, max }) {
  const [localNumSongs, setLocalNumSongs] = useState(numSongs);
  const timerRef = useRef(null);

  useEffect(() => {
    setLocalNumSongs(numSongs);
  }, [numSongs]);

  useEffect(() => {
    if (localNumSongs !== numSongs) {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setNumSongs(localNumSongs);
      }, 200);
    }
    return () => clearTimeout(timerRef.current);
  }, [localNumSongs, numSongs, setNumSongs]);

  const handleSliderChange = (_, newValue) => {
    setLocalNumSongs(newValue);
  };

  const handleInputChange = (event) => {
    let value = Number(event.target.value); // Ensure value is a number
    if (value > max) value = max;
    setLocalNumSongs(value);
  };

  const handleBlur = () => {
    if (localNumSongs < 1) {
      setLocalNumSongs(1);
    } else if (localNumSongs > max) {
      setLocalNumSongs(max);
    }
  };

  return (
    <Box sx={{ marginBottom: 0, marginTop: "20px" }}>
      <label htmlFor="num-songs-slider">Number of songs: </label>
      <Grid container spacing={3} alignItems="center">
        <Grid>
          <Slider
            id="num-songs-slider"
            value={typeof localNumSongs === "number" ? localNumSongs : 1}
            min={1}
            max={max}
            step={1}
            onChange={handleSliderChange}
            valueLabelDisplay="auto"
            sx={{ width: 200, marginLeft: 0, verticalAlign: "middle" }}
          />
        </Grid>
        <Grid>
          <Input
            sx={{
              "& input": { color: "white" },
              "&:before": { borderBottomColor: "white" },
              "&:hover:before": { borderBottomColor: "white !important" },
              "&.Mui-focused:before": { borderBottomColor: "white !important" },
              "&:after": { borderBottomColor: "white" },
            }}
            value={localNumSongs}
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 1,
              min: 1,
              max: max,
              type: "number",
              "aria-labelledby": "num-songs-slider",
            }}
          />
        </Grid>
        <Grid>
          <span style={{ marginLeft: -15, color: "#888", marginTop: 0 }}>
            (max {max})
          </span>
        </Grid>
      </Grid>
    </Box>
  );
}
