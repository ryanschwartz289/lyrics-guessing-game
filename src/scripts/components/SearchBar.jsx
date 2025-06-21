import { TextField, Autocomplete, Stack, Button } from "@mui/material";
import { useState } from "react";

export default function SearchBar({ items, correctTitle, onSubmit }) {
  const [inputValue, setInputValue] = useState("");
  const [animate, setAnimate] = useState(false);
  const [buttonText, setButtonText] = useState("Submit");
  const [isCorrectAnim, setIsCorrectAnim] = useState(null); // null, true, or false
  // Map the items array to extract just the titles
  const titles = items.map((item) => item.title);

  const handleClick = () => {
    if (inputValue && correctTitle) {
      const isCorrect =
        inputValue.trim().toLowerCase() === correctTitle.trim().toLowerCase();
      if (isCorrect) {
        setButtonText("Correct!");
        setIsCorrectAnim(true);
        setAnimate(true);
        setTimeout(() => {
          setButtonText("Submit");
          setAnimate(false);
          setIsCorrectAnim(null);
        }, 700);
      } else {
        setButtonText("Incorrect");
        setIsCorrectAnim(false);
        setAnimate(true);
        setTimeout(() => {
          setButtonText("Submit");
          setAnimate(false);
          setIsCorrectAnim(null);
        }, 700);
      }
      onSubmit(isCorrect);
      setInputValue(""); // reset input after submit
    }
  };

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        minWidth: 680,
        width: "100%",
        maxWidth: 680,
        margin: "0 auto",
      }}
    >
      <Autocomplete
        options={titles}
        value={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        renderInput={(params) => <TextField {...params} label="Songs" />}
        sx={{
          backgroundColor: "black",
          "& .MuiInputLabel-root": { color: "white" },
          "& .MuiInputBase-input": { color: "white" },
          minWidth: 560,
          width: "100%",
          maxWidth: 560,
          borderRadius: "4px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
        slotProps={{
          paper: {
            sx: {
              bgcolor: "#121212", // Dark background
              color: "#ffffff", // White text
            },
          },
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleClick}
        sx={{
          height: "56px",
          width: "120px",
          transition: "background-color 0.2s",
          backgroundColor: animate
            ? isCorrectAnim === true
              ? "#4caf50"
              : isCorrectAnim === false
              ? "#f44336"
              : undefined
            : undefined,
        }}
      >
        {buttonText}
      </Button>
    </Stack>
  );
}
