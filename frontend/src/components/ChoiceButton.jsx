import React from "react";

export default function ChoiceButton({ choice, onSelect, disabled = false }) {
  if (!choice) return null;

  const choiceText = choice.text || choice.label || choice.title || "";
  const emoji = choice.emoji || choice.icon || null;
  const firstLetter = choiceText.length > 0 ? choiceText.charAt(0).toUpperCase() : "✦";

  return (
    <button
      onClick={() => !disabled && onSelect(choice)}
      disabled={disabled}
      className={`choice-button ${disabled ? "disabled" : ""}`}
    >
      <span className="choice-letter">{emoji || firstLetter}</span>
      <span className="choice-text">{choiceText}</span>
      <span className="choice-arrow">&#8594;</span>
    </button>
  );
}