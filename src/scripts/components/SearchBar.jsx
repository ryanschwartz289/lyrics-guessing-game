import { TextField, Autocomplete, Button, Fade } from "@mui/material";
import { useState, useRef, useLayoutEffect } from "react";

export default function SearchBar({ items, correctTitle, onSubmit }) {
  const [inputValue, setInputValue] = useState("");
  const [animate, setAnimate] = useState(false);
  const [buttonText, setButtonText] = useState("Submit");
  const [isCorrectAnim, setIsCorrectAnim] = useState(null); // null, true, or false
  const [showCorrect, setShowCorrect] = useState(false); // Show correct answer animation
  const [shownCorrectTitle, setShownCorrectTitle] = useState(""); // Store the correct answer to show
  const [answerLeft, setAnswerLeft] = useState(null);
  const buttonRef = useRef(null);
  const autocompleteRef = useRef(null);
  const answerRef = useRef(null);
  // Map the items array to extract just the titles
  const titles = items.map((item) => item.title);

  useLayoutEffect(() => {
    if (buttonRef.current && answerRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const parentRect =
        buttonRef.current.parentNode.parentNode.getBoundingClientRect();
      // Place 10px to the right of the button, relative to the parent (.searchbar-flex)
      setAnswerLeft(buttonRect.right - parentRect.left + 10);
    }
  }, [showCorrect]);

  const handleClick = () => {
    if (inputValue && correctTitle) {
      const isCorrect =
        inputValue.trim().toLowerCase() === correctTitle.trim().toLowerCase();
      if (isCorrect) {
        setButtonText("Correct!");
        setIsCorrectAnim(true);
        setAnimate(true);
        setShowCorrect(false);
        setTimeout(() => {
          setButtonText("Submit");
          setAnimate(false);
          setIsCorrectAnim(null);
          onSubmit(true);
          setInputValue(""); // reset input after submit
        }, 700);
      } else {
        setButtonText("Incorrect");
        setIsCorrectAnim(false);
        setAnimate(true);
        setShownCorrectTitle(correctTitle); // Capture the correct answer at this moment
        setShowCorrect(true);
        setTimeout(() => {
          setButtonText("Submit");
          setAnimate(false);
          setIsCorrectAnim(null);
          setShowCorrect(false);
          onSubmit(false);
          setInputValue(""); // reset input after submit
        }, 1800);
      }
    }
  };

  return (
    <div className="searchbar-container">
      <div className="searchbar-flex">
        <div ref={autocompleteRef} className="autocomplete-box">
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
              width: "100%",
              borderRadius: "4px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              paddingLeft: "0",
              "& .MuiInputBase-root": {
                paddingLeft: 0, // Remove left padding from the input root
              },
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
        </div>
        <div className="button-box">
          <Button
            ref={buttonRef}
            variant="contained"
            color="primary"
            onClick={handleClick}
            sx={{
              height: "56px",
              width: "100%",
              minWidth: 120,
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
        </div>
      </div>
      <Fade in={showCorrect} timeout={{ enter: 200, exit: 400 }}>
        <div
          className="correct-answer"
          ref={answerRef}
          style={{
            left: answerLeft !== null ? answerLeft : 700,
            display: showCorrect ? "block" : "none",
          }}
        >
          <strong>Correct answer:</strong> <br></br>
          {shownCorrectTitle}
        </div>
      </Fade>
    </div>
  );
}
