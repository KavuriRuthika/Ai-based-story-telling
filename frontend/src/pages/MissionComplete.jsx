import { ArrowRight, BookOpen, CheckCircle2, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useStory } from "../context/StoryContext";
import Navbar from "../components/Navbar";

export default function MissionComplete() {
  const navigate = useNavigate();
  const { hero, crystalPieces, learnedWords, setCurrentScene } = useStory();
  const words = learnedWords || [];

  const returnToMap = () => {
    setCurrentScene(0);
    navigate("/map");
  };

  return (
    <div className="story-page">
      <Navbar />
      <main className="complete-layout">
        <section className="complete-card">
          <div className="complete-burst"><Sparkles size={22} /><span>✦</span><Sparkles size={16} /></div>
          <span className="story-kicker">CHAPTER COMPLETE</span>
          <h1>The story remembers your courage.</h1>
          <p>Wonderful work, <strong>{hero?.name || "Hero"}</strong>. Your choices brought a little more color back to Lumora.</p>
          <div className="reward-grid">
            <div className="reward-stat"><span>💎</span><strong>{crystalPieces}</strong><small>crystal pieces</small></div>
            <div className="reward-stat"><BookOpen /><strong>{words.length}</strong><small>words discovered</small></div>
          </div>
          {words.length > 0 && <div className="word-ribbon"><span>New story words</span>{words.map((word) => <b key={word}>{word}</b>)}</div>}
          <button className="story-primary-button complete-button" onClick={returnToMap}>Continue the adventure <ArrowRight size={18} /></button>
        </section>
        <div className="complete-note"><CheckCircle2 size={17} /> Your progress has been saved to your hero profile.</div>
      </main>
    </div>
  );
}
