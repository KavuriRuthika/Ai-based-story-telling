import React, { useState } from "react";
import { Brain, CheckCircle2, HelpCircle } from "lucide-react";

export default function PuzzleCard({ puzzle, onSolve, isSolved = false }) {
  const [input, setInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  if (!puzzle) return null;

  const options = puzzle.options || puzzle.answers || [];
  const correctAnswer = puzzle.answer || puzzle.correctAnswer || "";

  const handleSelectOption = (opt) => {
    if (isSolved) return;
    if (String(opt).trim().toLowerCase() === String(correctAnswer).trim().toLowerCase()) {
      setErrorMsg("");
      onSolve(true);
    } else {
      setErrorMsg("Not quite! Try another answer.");
    }
  };

  const handleSubmitInput = (e) => {
    e.preventDefault();
    if (isSolved) return;
    if (input.trim().toLowerCase() === String(correctAnswer).trim().toLowerCase()) {
      setErrorMsg("");
      onSolve(true);
    } else {
      setErrorMsg("Incorrect! Give it another try.");
    }
  };

  return (
    <div className={`puzzle-card-container ${isSolved ? "solved" : ""}`}>
      <div className="puzzle-card-header">
        <Brain className="puzzle-icon" size={24} />
        <div>
          <h3 className="puzzle-title">{puzzle.title || "Story Puzzle"}</h3>
          <p className="puzzle-question">{puzzle.question}</p>
        </div>
      </div>

      {isSolved ? (
        <div className="puzzle-solved-banner">
          <CheckCircle2 size={20} />
          <span>Puzzle Solved! Great thinking!</span>
        </div>
      ) : (
        <>
          {options.length > 0 ? (
            <div className="puzzle-options-grid">
              {options.map((opt, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="puzzle-option-button"
                  onClick={() => handleSelectOption(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          ) : (
            <form onSubmit={handleSubmitInput} className="puzzle-input-form">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your answer..."
                className="puzzle-text-input"
              />
              <button type="submit" className="puzzle-submit-button">
                Unlock
              </button>
            </form>
          )}

          {errorMsg && (
            <div className="puzzle-error-message">
              <HelpCircle size={16} />
              {errorMsg}
            </div>
          )}
        </>
      )}
    </div>
  );
}