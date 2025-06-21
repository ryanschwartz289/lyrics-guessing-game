import { useState, useEffect } from "react";

export default function Lyrics({ data, setCorrectTitle, nextSong, correct }) {
  const [section, setSection] = useState({ title: "", content: "" });
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (data && data.length > 0) {
      // Randomly select a song from data
      const randomSong = data[Math.floor(Math.random() * data.length)];
      setCorrectTitle(randomSong.title); // Set the correct title in parent
      // Pick a random section from the lyrics array
      if (Array.isArray(randomSong.lyrics) && randomSong.lyrics.length > 0) {
        const randomSection =
          randomSong.lyrics[
            Math.floor(Math.random() * randomSong.lyrics.length)
          ];
        setSection(randomSection);
      } else {
        setSection({
          title: "",
          content:
            typeof randomSong.lyrics === "string" ? randomSong.lyrics : "",
        });
      }
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
      {section.title && <h3>{section.title}</h3>}
      <p>
        {section.content.split("\n").map((line, idx) => (
          <span key={idx}>
            {line}
            <br />
          </span>
        ))}
      </p>
    </div>
  );
}
