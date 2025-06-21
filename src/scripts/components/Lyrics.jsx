import { useState, useEffect } from "react";

export default function Lyrics({ data, setCorrectTitle, nextSong, correct }) {
  const [lyrics, setLyrics] = useState("");
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (data && data.length > 0) {
      // Randomly select a song from data
      const randomSong = data[Math.floor(Math.random() * data.length)];
      setLyrics(randomSong.lyrics);
      setCorrectTitle(randomSong.title); // Set the correct title in parent
    }
  }, [data, setCorrectTitle, nextSong]);

  useEffect(() => {
    if (correct) {
      setAnimate(true);
      const timeout = setTimeout(() => setAnimate(false), 700);
      return () => clearTimeout(timeout);
    }
  }, [correct]);

  return (
    <div className={`lyrics-container${animate ? " correct-animate" : ""}`}>
      <h2>Lyrics</h2>
      <p>
        {lyrics.split("\n").map((line, idx) => (
          <span key={idx}>
            {line}
            <br />
          </span>
        ))}
      </p>
    </div>
  );
}
