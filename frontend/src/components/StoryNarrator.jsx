import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Play, Pause, Sparkles, Settings2 } from "lucide-react";
import { useGameContext } from "../context/GameContext";

export default function StoryNarrator({
  title,
  narrative,
  targetWord,
  translation,
  autoStart = false,
}) {
  const { language } = useGameContext();
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoNarrate, setAutoNarrate] = useState(() => {
    return localStorage.getItem("autoNarrateStory") === "true";
  });
  const [rate, setRate] = useState(0.9);
  const [showSettings, setShowSettings] = useState(false);

  const utteranceRef = useRef(null);

  const getLanguageTag = () => {
    if (language === "te" || language === "Telugu") return "te-IN";
    if (language === "hi" || language === "Hindi") return "hi-IN";
    return "en-US";
  };

  const getCleanText = () => {
    let fullText = "";
    if (title) fullText += `${title}. `;
    if (narrative) fullText += `${narrative} `;
    if (targetWord) fullText += `Word of the chapter is ${targetWord}. `;
    return fullText;
  };

  const stopSpeech = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
  };

  const startSpeech = () => {
    if (!("speechSynthesis" in window)) {
      alert("Text-to-speech narration is not supported in this browser.");
      return;
    }

    stopSpeech();

    const textToSpeak = getCleanText();
    if (!textToSpeak.trim()) return;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = getLanguageTag();
    utterance.rate = rate;
    utterance.pitch = 1.05; // Slightly cheerful pitch for storytelling

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      stopSpeech();
    } else {
      startSpeech();
    }
  };

  const toggleAutoNarrate = () => {
    const nextVal = !autoNarrate;
    setAutoNarrate(nextVal);
    localStorage.setItem("autoNarrateStory", String(nextVal));
  };

  // Auto-play narration when text changes if autoNarrate is active
  useEffect(() => {
    if (autoNarrate || autoStart) {
      const timer = setTimeout(() => {
        startSpeech();
      }, 400);
      return () => {
        clearTimeout(timer);
        stopSpeech();
      };
    } else {
      stopSpeech();
    }
    return () => {
      stopSpeech();
    };
  }, [narrative, title, autoNarrate]);

  return (
    <div className={`story-narrator-bar ${isPlaying ? "narrating" : ""}`}>
      <div className="narrator-main-info">
        <div className="narrator-avatar">
          <Sparkles size={20} className={isPlaying ? "sparkle-pulse" : ""} />
        </div>
        <div className="narrator-text-copy">
          <span className="narrator-label">STORY NARRATOR</span>
          <strong>{isPlaying ? "Lumi is reading aloud..." : "Listen to the Storyteller"}</strong>
        </div>
      </div>

      {isPlaying && (
        <div className="narrator-sound-waves">
          <span className="wave-bar w1"></span>
          <span className="wave-bar w2"></span>
          <span className="wave-bar w3"></span>
          <span className="wave-bar w4"></span>
        </div>
      )}

      <div className="narrator-controls">
        <button
          type="button"
          onClick={togglePlayPause}
          className={`narrator-play-btn ${isPlaying ? "playing" : ""}`}
          title={isPlaying ? "Pause Story Narration" : "Play Story Narration"}
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          <span>{isPlaying ? "Pause" : "Listen"}</span>
        </button>

        <button
          type="button"
          onClick={() => setShowSettings(!showSettings)}
          className={`narrator-settings-btn ${showSettings ? "active" : ""}`}
          title="Storyteller Settings"
        >
          <Settings2 size={16} />
        </button>
      </div>

      {showSettings && (
        <div className="narrator-settings-dropdown">
          <label className="narrator-setting-row">
            <input
              type="checkbox"
              checked={autoNarrate}
              onChange={toggleAutoNarrate}
            />
            <span>Auto-read story chapters</span>
          </label>

          <div className="narrator-setting-row rate-selector">
            <span>Reading Speed:</span>
            <div className="rate-buttons">
              {[0.8, 0.95, 1.1].map((r) => (
                <button
                  key={r}
                  type="button"
                  className={rate === r ? "active" : ""}
                  onClick={() => setRate(r)}
                >
                  {r === 0.8 ? "Slow" : r === 0.95 ? "Normal" : "Fast"}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
