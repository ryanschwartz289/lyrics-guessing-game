import React from "react";
// correct, incorrect, percent
export default function Score({ total, correctCount }) {
  return (
    <div className="score-container">
      <div className="score-box" id="correct-score-box">
        Correct: {correctCount}
      </div>
      <div className="score-box" id="incorrect-score-box">
        Incorrect: {total - correctCount}
      </div>
      <div className="score-box" id="accuracy-score-box">
        Accuracy:{" "}
        {total > 0 ? ((100 * correctCount) / total).toFixed(1) : "0.0"}%
      </div>
    </div>
  );
}
