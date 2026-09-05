import { ArrowLeft, BookOpen, Gem, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useStory } from "../context/StoryContext";
import Navbar from "../components/Navbar";

export default function Profile() {
  const navigate = useNavigate();
  const { hero, crystalPieces, learnedWords, learningProfile } = useStory();
  const words = learnedWords || [];
  const profile = learningProfile || {};
  const skills = [
    ["Vocabulary", profile.vocabulary_level || "beginner"],
    ["Reading", `${profile.reading_comprehension || 50}%`],
    ["Problem solving", `${profile.problem_solving || 50}%`],
    ["Creativity", `${profile.creativity_score || 50}%`],
  ];

  return (
    <div className="story-page">
      <Navbar />
      <main className="profile-layout">
        <button className="story-back-button" onClick={() => navigate("/map")}><ArrowLeft size={17} /> Back to world map</button>
        <section className="profile-hero-card">
          <div className="profile-avatar">{hero?.name ? hero.name.charAt(0).toUpperCase() : "H"}</div>
          <div><span className="story-kicker">YOUR STORYKEEPER PROFILE</span><h1>{hero?.name || "Brave Hero"}</h1><p>{hero?.type || hero?.character_type || "Explorer"} · {hero?.language || "English"}</p></div>
          <div className="profile-level"><Star size={16} /> Level {hero?.level || 1}</div>
        </section>
        <div className="profile-stats"><div><Gem /><strong>{crystalPieces}</strong><span>crystals</span></div><div><BookOpen /><strong>{words.length}</strong><span>words learned</span></div><div><Star /><strong>{hero?.experience || 0}</strong><span>story XP</span></div></div>
        <section className="profile-section"><div className="profile-section-heading"><span className="story-kicker">YOUR GROWING MAGIC</span><h2>Learning through the story</h2></div><div className="skill-list">{skills.map(([name, value]) => <div className="skill-row" key={name}><span>{name}</span><strong>{value}</strong><div className="skill-track"><i style={{ width: typeof value === "string" && value.endsWith("%") ? value : "45%" }} /></div></div>)}</div></section>
        <section className="profile-section"><div className="profile-section-heading"><span className="story-kicker">COLLECTED CHAPTER WORDS</span><h2>Your story vocabulary</h2></div>{words.length ? <div className="word-ribbon">{words.map((word) => <b key={word}>{word}</b>)}</div> : <p className="empty-story-state">Your first discovered word will appear here after a story choice.</p>}</section>
      </main>
    </div>
  );
}
