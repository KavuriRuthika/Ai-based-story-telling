import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";

import Navbar from "../components/Navbar";
import MagicBackground from "../components/MagicBackground";
import { useGame } from "../context/GameContext";
import { heroAPI } from "../services/api";

function CreateHero() {
  const navigate = useNavigate();
  const { hero, setHero } = useGame();

  const topics = [
    { id: "Space", emoji: "🚀", title: "Space", description: "Planets, stars and brave explorers" },
    { id: "Ocean", emoji: "🌊", title: "Ocean life", description: "Discover creatures beneath the waves" },
    { id: "Environment", emoji: "🌱", title: "Our planet", description: "Care for nature and the future" },
    { id: "Friendship", emoji: "🫶", title: "Friendship", description: "Understand feelings and teamwork" },
    { id: "Mathematics", emoji: "🔢", title: "Mathematics", description: "Solve mysteries with numbers" },
    { id: "History", emoji: "🏛️", title: "History", description: "Travel through important moments" },
  ];

  const [form, setForm] = useState(
    hero || {
      name: "",
      age: 14,
      language: "Telugu",
      type: "Explorer",
      learningGoal: "Science",
      topic: "Space",
      storyStyle: "Educational quest",
    }
  );

  const heroTypes = [
    {
      id: "Wizard",
      emoji: "🧙",
      title: "Wizard",
    },
    {
      id: "Explorer",
      emoji: "🧭",
      title: "Explorer",
    },
    {
      id: "Guardian",
      emoji: "🦸",
      title: "Guardian",
    },
    {
      id: "Young Scientist",
      emoji: "🔬",
      title: "Scientist",
    },
  ];

  const handleChange = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.name.trim()) {
      alert("Please enter your hero name.");
      return;
    }

    const languageCodes = {
      English: "en",
      Telugu: "te",
      Hindi: "hi",
      "English + Telugu": "en",
    };

    try {
      const response = await heroAPI.createHero({
        name: form.name.trim(),
        age: form.age,
        language: languageCodes[form.language] || "en",
        character_type: form.type,
      });

      setHero({
        ...form,
        ...response.data,
        type: form.type,
        language: form.language,
      });
    } catch (error) {
      console.warn("Backend hero creation failed; continuing locally.", error);
      setHero(form);
    }

    navigate("/lumora");
  };

  return (
    <div className="app-page">
      <MagicBackground />

      <Navbar />

      <main className="form-page">
        <div className="form-card">
          <div className="form-header">
            <div className="form-icon">
              ✨
            </div>

            <div>
              <div className="eyebrow">STEP 01</div>

              <h1>Create Your Hero</h1>

              <p>
                Every great adventure needs a hero.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>What's your name?</label>

              <input
                type="text"
                value={form.name}
                placeholder="Enter your hero name"
                onChange={(event) =>
                  handleChange("name", event.target.value)
                }
              />
            </div>

            <div className="two-column">
              <div className="form-group">
                <label>Age</label>

                <input
                  type="number"
                  min="4"
                  max="15"
                  value={form.age}
                  onChange={(event) =>
                    handleChange(
                      "age",
                      Number(event.target.value)
                    )
                  }
                />
              </div>

              <div className="form-group">
                <label>Language</label>

                <select
                  value={form.language}
                  onChange={(event) =>
                    handleChange(
                      "language",
                      event.target.value
                    )
                  }
                >
                  <option>English</option>
                  <option>Telugu</option>
                  <option>Hindi</option>
                  <option>English + Telugu</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Choose your hero</label>

              <div className="hero-type-grid">
                {heroTypes.map((type) => (
                  <button
                    type="button"
                    key={type.id}
                    className={
                      form.type === type.id
                        ? "hero-type selected"
                        : "hero-type"
                    }
                    onClick={() =>
                      handleChange("type", type.id)
                    }
                  >
                    <span>{type.emoji}</span>
                    <strong>{type.title}</strong>
                  </button>
                ))}
              </div>
            </div>

            <fieldset className="form-group topic-fieldset">
              <legend>Choose your story topic</legend>
              <p className="field-help">Select one topic. The AI will build the educational story around it.</p>
              <div className="topic-grid">
                {topics.map((topic) => {
                  const selected = form.topic === topic.id;

                  return (
                    <label className={`topic-option ${selected ? "selected" : ""}`} key={topic.id}>
                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={() => handleChange("topic", selected ? "" : topic.id)}
                      />
                      <span className="topic-checkmark">{selected ? "✓" : ""}</span>
                      <span className="topic-emoji">{topic.emoji}</span>
                      <span className="topic-copy">
                        <strong>{topic.title}</strong>
                        <small>{topic.description}</small>
                      </span>
                    </label>
                  );
                })}
              </div>
              <div className={`ai-story-status ${form.topic ? "ready" : "waiting"}`}>
                <Sparkles size={16} />
                {form.topic
                  ? `AI storytelling ready for ${form.topic}.`
                  : "Choose a topic to enable AI storytelling."}
              </div>
            </fieldset>

            <div className="two-column">
              <div className="form-group">
              <label>What would you like to learn?</label>

              <select
                value={form.learningGoal}
                onChange={(event) =>
                  handleChange(
                    "learningGoal",
                    event.target.value
                  )
                }
              >
                <option>General Learning</option>
                <option>Vocabulary</option>
                <option>Mathematics</option>
                <option>Science</option>
                <option>Emotions</option>
                <option>Problem Solving</option>
              </select>
              </div>

              <div className="form-group">
                <label>Story style</label>
                <select
                  value={form.storyStyle}
                  onChange={(event) => handleChange("storyStyle", event.target.value)}
                >
                  <option>Educational quest</option>
                  <option>Adventure</option>
                  <option>Mystery</option>
                  <option>Fantasy</option>
                  <option>Moral story</option>
                </select>
              </div>
            </div>

            <button
              className="primary-button full-width"
              type="submit"
              disabled={!form.name.trim() || !form.topic}
            >
              {form.topic ? "Create my AI story" : "Select a topic first"}
              <ArrowRight size={19} />
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default CreateHero;