import React from "react";

export default function Score({ total, correctCount }) {
  return (
    <div className="score-container">
      <h2>Score: {`${correctCount}/${total}`}</h2>
    </div>
  );
}
