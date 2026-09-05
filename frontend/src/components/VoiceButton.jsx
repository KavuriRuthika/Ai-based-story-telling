import React, { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { useGameContext } from "../context/GameContext";

export default function VoiceButton({ text, lang }) {
  const { language } = useGameContext();
  const [speaking, setSpeaking] = useState(false);

  const getLanguageTag = () => {
    if (lang) return lang;
    if (language === "te" || language === "Telugu") return "te-IN";
    if (language === "hi" || language === "Hindi") return "hi-IN";
    return "en-US";
  };

  const speak = () => {
    if (!text) return;

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = getLanguageTag();
      utterance.rate = 0.9;

      utterance.onstart = () => setSpeaking(true);
      utterance.onend = () => setSpeaking(false);
      utterance.onerror = () => setSpeaking(false);

      window.speechSynthesis.speak(utterance);
    } else {
      alert("Text-to-speech is not supported in this browser.");
    }
  };

  return (
    <button
      onClick={speak}
      className={`voice-button ${speaking ? "speaking" : ""}`}
      title="Listen to pronunciation"
      type="button"
    >
      {speaking ? <VolumeX size={18} /> : <Volume2 size={18} />}
      <span>{speaking ? "Speaking..." : "Listen"}</span>
    </button>
  );
}