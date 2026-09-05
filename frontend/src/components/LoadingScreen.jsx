import React from "react";

export default function LoadingScreen({ message = "Gathering magic for your next chapter..." }) {
  return (
    <div className="loading-screen-overlay">
      <div className="loading-screen-content">
        <div className="loading-orb-container">
          <div className="loading-orb">✦</div>
          <div className="loading-ring ring-1"></div>
          <div className="loading-ring ring-2"></div>
        </div>
        <h2 className="loading-title">LUMORA ADVENTURE</h2>
        <p className="loading-message">{message}</p>
        <div className="loading-dots">
          <span className="dot dot-1"></span>
          <span className="dot dot-2"></span>
          <span className="dot dot-3"></span>
        </div>
      </div>
    </div>
  );
}
