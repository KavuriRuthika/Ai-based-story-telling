import React from "react";

export default function InteractiveObject({ name, icon = "✨", label, onClick, collected = false }) {
  const displayName = name || label || "Magic Item";

  return (
    <div
      onClick={!collected ? onClick : undefined}
      className={`interactive-object-card ${collected ? "collected" : ""}`}
      title={collected ? "Collected!" : `Discover ${displayName}`}
    >
      <div className="interactive-object-icon">{icon}</div>
      <div className="interactive-object-name">{displayName}</div>
      {collected && <span className="interactive-object-badge">✓ Found</span>}
    </div>
  );
}