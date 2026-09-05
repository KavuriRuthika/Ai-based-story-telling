import React from "react";

export default function ProgressBar({ current, total }) {
  const percentage = Math.min(100, Math.round((current / total) * 100));

  return (
    <div className="story-progress-track">
      <div
        className="story-progress-fill"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}