import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Volume2, ArrowRight } from "lucide-react";

import Navbar from "../components/Navbar";
import MagicBackground from "../components/MagicBackground";
import { useGame } from "../context/GameContext";

function LumoraIntro() {
  const navigate = useNavigate();
  const { hero } = useGame();

  const [stage, setStage] = useState(0);

  const lines = [
    "Can you hear me?",
    "Our world is losing its colors.",
    "The Great Story Crystal has disappeared.",
    "Only a child from another world can bring it back.",
    `And that child is ${hero?.name || "YOU"}.`,
  ];

  useEffect(() => {
    if (stage < lines.length - 1) {
      const timer = setTimeout(() => {
        setStage((previous) => previous + 1);
      }, 2600);

      return () => clearTimeout(timer);
    }
  }, [stage]);

  const speak = () => {
    if (!window.speechSynthesis) return;

    const speech = new SpeechSynthesisUtterance(lines[stage]);

    speech.rate = 0.9;
    speech.pitch = 1.1;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
  };

  return (
    <div className="intro-page">
      <MagicBackground />

      <Navbar />

      <main className="intro-container">
        <div className="lumi-character">
          ✨
        </div>

        <div className="lumi-name">LUMI</div>

        <div className="intro-message">
          {lines[stage]}
        </div>

        <button
          className="voice-mini-button"
          onClick={speak}
        >
          <Volume2 size={18} />
          Listen
        </button>

        {stage === lines.length - 1 && (
          <button
            className="primary-button intro-button"
            onClick={() => navigate("/map")}
          >
            Enter Lumora
            <ArrowRight size={19} />
          </button>
        )}

        <div className="intro-dots">
          {lines.map((_, index) => (
            <span
              key={index}
              className={
                index <= stage ? "dot active" : "dot"
              }
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default LumoraIntro;
