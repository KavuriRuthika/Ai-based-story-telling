import React from "react";
import { Sparkles, Gem, BookOpen, Star, ArrowRight } from "lucide-react";

export default function RewardModal({
  isOpen,
  onClose,
  title = "Chapter Completed!",
  heroName = "Hero",
  crystalPieces = 1,
  learnedWords = [],
  xpEarned = 200,
}) {
  if (!isOpen) return null;

  return (
    <div className="reward-modal-backdrop">
      <div className="reward-modal-card">
        <div className="reward-modal-header">
          <div className="reward-sparkle-burst">
            <Sparkles size={32} />
          </div>
          <span className="reward-kicker">VICTORY REWARD</span>
          <h2>{title}</h2>
          <p>
            Outstanding work, <strong>{heroName}</strong>! Lumora's sky shines brighter thanks to your wisdom.
          </p>
        </div>

        <div className="reward-stats-grid">
          <div className="reward-stat-box">
            <Gem className="reward-icon crystal" size={28} />
            <div className="reward-num">+{crystalPieces}</div>
            <div className="reward-lbl">Crystal Fragment</div>
          </div>

          <div className="reward-stat-box">
            <Star className="reward-icon star" size={28} />
            <div className="reward-num">+{xpEarned}</div>
            <div className="reward-lbl">Story XP</div>
          </div>

          <div className="reward-stat-box">
            <BookOpen className="reward-icon book" size={28} />
            <div className="reward-num">{learnedWords.length}</div>
            <div className="reward-lbl">Words Discovered</div>
          </div>
        </div>

        {learnedWords.length > 0 && (
          <div className="reward-words-section">
            <h4>New Story Words</h4>
            <div className="reward-words-chips">
              {learnedWords.map((word, idx) => (
                <span key={idx} className="reward-word-chip">
                  ✨ {word}
                </span>
              ))}
            </div>
          </div>
        )}

        <button className="primary-button reward-confirm-btn" onClick={onClose}>
          Continue Adventure <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
