import { useState } from "react";

// Line below is correct, but TS will complain about it
// @ts-ignore
import SearchBar from "./components/SearchBar";
import "../styles/App.css";
import data from "../data/titles-and-lyrics.json";
import Score from "./components/Score";
import Lyrics from "./components/Lyrics";

function App() {
  const [correct, setCorrect] = useState(false);
  const [correctTitle, setCorrectTitle] = useState("");
  const [nextSong, setNextSong] = useState(0);
  const [total, setTotal] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  const handleSubmit = (isCorrect) => {
    setTotal((t) => t + 1);
    if (isCorrect) setCorrectCount((c) => c + 1);
    setCorrect(isCorrect);
    setNextSong((n) => n + 1);
  };

  return (
    <div className="App">
      <h1 className="app-title">Guess the Future Song</h1>
      <div className="app-score">
        <Score total={total} correctCount={correctCount} />
      </div>
      <div className="app-searchbar">
        <SearchBar
          items={data}
          correctTitle={correctTitle}
          onSubmit={handleSubmit}
        />
      </div>
      <div className="app-lyrics">
        <Lyrics
          data={data}
          setCorrectTitle={setCorrectTitle}
          nextSong={nextSong}
          correct={correct}
        />
      </div>
    </div>
  );
}

export default App;
