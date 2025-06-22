import { useState, useMemo, useEffect } from "react";

// Line below is correct, but TS will complain about it
// @ts-ignore
import SearchBar from "./components/SearchBar";
import "../styles/App.css";
import Score from "./components/Score";
import Lyrics from "./components/Lyrics";
import SongCountInput from "./components/SongCountInput";

function App() {
  const [artistName, setArtistName] = useState("");
  const [data, setData] = useState([]);
  const [correct, setCorrect] = useState(false);
  const [correctTitle, setCorrectTitle] = useState("");
  const [nextSong, setNextSong] = useState(0);
  const [total, setTotal] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [numSongs, setNumSongs] = useState(1);

  useEffect(() => {
    fetch("/artist_name.txt")
      .then((res) => res.text())
      .then((name) => {
        setArtistName(name.trim());
        fetch(`/src/data/processed/${name.trim().replaceAll(" ", "_")}.json`)
          .then((res) => res.json())
          .then((data) => {
            setData(data);
            setNumSongs(Math.min(data.length, 100));
          });
      });
  }, []);

  const handleSubmit = (isCorrect) => {
    setTotal((t) => t + 1);
    if (isCorrect) setCorrectCount((c) => c + 1);
    setCorrect(isCorrect);
    setNextSong((n) => n + 1);
  };

  // Memoize the sorted, sliced data
  const limitedData = useMemo(() => {
    const sliced = data.slice(0, numSongs);
    return sliced.sort((a, b) => a.title.localeCompare(b.title));
  }, [numSongs]);

  return (
    <div className="App">
      <h1 className="app-title">
        Guess the {artistName ? artistName : "Artist's"} Song
      </h1>
      <SongCountInput
        numSongs={numSongs}
        setNumSongs={setNumSongs}
        max={data.length}
      />
      <div className="app-score">
        <Score total={total} correctCount={correctCount} />
      </div>
      <div className="app-searchbar">
        <SearchBar
          items={limitedData}
          correctTitle={correctTitle}
          onSubmit={handleSubmit}
        />
      </div>
      <div className="app-lyrics">
        <Lyrics
          data={limitedData}
          setCorrectTitle={setCorrectTitle}
          nextSong={nextSong}
          correct={correct}
        />
      </div>
    </div>
  );
}

export default App;
