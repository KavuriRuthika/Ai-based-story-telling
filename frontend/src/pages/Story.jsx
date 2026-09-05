import { useEffect, useState } from "react";
import { BookOpen, Check, ChevronLeft, Sparkles, X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useStory } from "../context/StoryContext";
import { useGameContext } from "../context/GameContext";
import Navbar from "../components/Navbar";
import VoiceButton from "../components/VoiceButton";
import ChoiceButton from "../components/ChoiceButton";
import ProgressBar from "../components/ProgressBar";
import InteractiveObject from "../components/InteractiveObject";
import PuzzleCard from "../components/PuzzleCard";
import LoadingScreen from "../components/LoadingScreen";
import RewardModal from "../components/RewardModal";
import StoryNarrator from "../components/StoryNarrator";
import StoryVideoPlayer from "../components/StoryVideoPlayer";
import { worlds } from "../data/worlds";
import { MULTILINGUAL_STORIES } from "../data/storyData";
import { forestScenes } from "../data/forestMission";
import { mission1Scenes } from "../data/mission1";

export default function Story() {
  const navigate = useNavigate();
  const { worldId } = useParams();
  const activeWorldId = worldId || "forest";
  const { language } = useGameContext();

  const {
    hero,
    currentScene,
    setCurrentScene,
    addWord,
    completeMission,
    crystalPieces,
    learnedWords,
  } = useStory();

  const [scene, setScene] = useState(null);
  const [scenesList, setScenesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState(null);
  const [puzzleSolved, setPuzzleSolved] = useState(false);
  const [collectedItems, setCollectedItems] = useState([]);
  const [showRewardModal, setShowRewardModal] = useState(false);

  // Normalize language code ('en', 'te', 'hi', 'es', 'fr')
  const getNormalizedLangCode = () => {
    if (!language) return "en";
    const l = language.toLowerCase();
    if (l === "telugu" || l === "te") return "te";
    if (l === "hindi" || l === "hi") return "hi";
    if (l === "spanish" || l === "es") return "es";
    if (l === "french" || l === "fr") return "fr";
    return "en";
  };

  // Determine local scenes based on active world and selected language
  const getFallbackScenes = () => {
    const langCode = getNormalizedLangCode();

    if (MULTILINGUAL_STORIES[activeWorldId] && MULTILINGUAL_STORIES[activeWorldId][langCode]) {
      return MULTILINGUAL_STORIES[activeWorldId][langCode];
    }
    if (MULTILINGUAL_STORIES.forest && MULTILINGUAL_STORIES.forest[langCode]) {
      return MULTILINGUAL_STORIES.forest[langCode];
    }

    const worldObj = worlds.find((w) => w.id === activeWorldId);
    if (worldObj && worldObj.scenes && worldObj.scenes.length > 0) {
      return worldObj.scenes;
    }

    if (activeWorldId === "forest") {
      return forestScenes.map((s) => ({
        id: s.id,
        title: s.title,
        narrative: s.text || s.narration,
        targetWord: s.object?.telugu || s.object?.english || "Crystal",
        translation: s.object?.english || "Crystal",
        choices: s.choices?.map((c) => ({ text: c.label || c.text, isCorrect: true })) || [],
        interactiveObject: s.object,
        puzzle: s.puzzle,
        image: s.image,
      }));
    }

    return mission1Scenes.map((s) => ({
      id: s.id,
      title: s.title,
      narrative: s.text,
      targetWord: s.vocabulary?.telugu || "Crystal",
      translation: s.vocabulary?.english || "Crystal",
      choices: s.choices?.map((c) => ({ text: c.text, isCorrect: true })) || [],
      interactiveObject: s.objects ? s.objects[0] : null,
      puzzle: s.puzzle,
      image: s.image,
    }));
  };

  useEffect(() => {
    let active = true;
    const localScenes = getFallbackScenes();
    setScenesList(localScenes);

    async function loadScene() {
      setLoading(true);
      setFeedback(null);
      setPuzzleSolved(false);

      try {
        const response = await fetch("http://localhost:8000/api/story/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            hero_id: hero?.id || 1,
            hero_name: hero?.name || "Hero",
            hero_type: hero?.character_type || hero?.type || "Explorer",
            target_language: language || "English",
            world: activeWorldId,
            current_scene: currentScene,
            mission_id: 1,
            topic: hero?.topic || "Space",
            age: hero?.age || 14,
            story_style: hero?.storyStyle || "Educational quest",
            learning_goal: hero?.learningGoal || "Science",
          }),
        });

        if (!response.ok) throw new Error("Backend offline; using local multilingual story engine");
        const data = await response.json();

        if (active) {
          setScene({
            ...data,
            targetWord: data.target_word || "Crystal",
            translation: data.translation || "Crystal",
            choices: data.choices?.map((c) => ({
              text: c.text,
              isCorrect: c.is_correct ?? true,
            })) || [],
            puzzle: data.puzzle,
            interactiveObject: data.interactive_objects?.[0],
            image: data.image_url,
          });
        }
      } catch {
        if (active) {
          const fallback = localScenes[currentScene % localScenes.length] || localScenes[0];
          setScene(fallback);
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadScene();
    return () => {
      active = false;
    };
  }, [currentScene, activeWorldId, language, hero]);

  const handleChoice = (choice) => {
    if (choice.isCorrect === false) {
      setFeedback({
        type: "wrong",
        text: "The story path stays quiet. Listen closely and try another choice.",
      });
      return;
    }

    if (scene?.targetWord) {
      addWord(scene.targetWord);
    }

    setFeedback({
      type: "correct",
      text: "The Story Crystal glows brighter! Excellent choice.",
    });

    window.setTimeout(() => {
      const totalScenes = scenesList.length || 3;
      if (currentScene + 1 < totalScenes) {
        setCurrentScene(currentScene + 1);
      } else {
        completeMission(activeWorldId);
        setShowRewardModal(true);
      }
    }, 700);
  };

  const handleCollectObject = (obj) => {
    if (!obj) return;
    const name = obj.name || obj.label || obj.english || "Item";
    if (!collectedItems.includes(name)) {
      setCollectedItems((prev) => [...prev, name]);
      if (obj.english) addWord(obj.english);
      if (obj.telugu) addWord(obj.telugu);
      if (obj.hindi) addWord(obj.hindi);
      setFeedback({
        type: "correct",
        text: `You collected ${name}! Added to your story pouch.`,
      });
    }
  };

  const handleSolvePuzzle = () => {
    setPuzzleSolved(true);
    setFeedback({
      type: "correct",
      text: "Magical lock unlocked! The door swings open.",
    });
  };

  const handleRewardClose = () => {
    setShowRewardModal(false);
    setCurrentScene(0);
    navigate("/mission-complete");
  };

  if (loading) {
    return <LoadingScreen message={`Preparing Chapter ${currentScene + 1} for ${hero?.name || "Hero"}...`} />;
  }

  const currentWorldObj = worlds.find((w) => w.id === activeWorldId) || worlds[0];
  const totalChapters = scenesList.length || 3;
  const narrativeText = typeof scene?.narrative === "function" ? scene.narrative(hero) : scene?.narrative || scene?.text;

  return (
    <div className="story-page">
      <Navbar />

      <main className="story-layout">
        <div className="story-topline">
          <button
            className="story-back-button"
            onClick={() => navigate(`/mission/${activeWorldId}`)}
          >
            <ChevronLeft size={17} /> Mission briefing
          </button>
          <span className="story-chapter">
            <BookOpen size={15} /> Chapter {currentScene + 1} of {totalChapters}
          </span>
        </div>

        <section className="story-scene-card">
          <div className="story-scene-header">
            <span className="story-kicker">
              <Sparkles size={15} /> {currentWorldObj.title.toUpperCase()}
            </span>
            <span className="story-quest-label">{hero?.name || "Hero"}'s Quest</span>
          </div>

          <ProgressBar current={currentScene + 1} total={totalChapters} />

          {/* Interactive Multilingual Story Narrator Component */}
          <StoryNarrator
            title={scene?.title}
            narrative={narrativeText}
            targetWord={scene?.targetWord}
            translation={scene?.translation}
          />

          {/* Live Story Video & Picture Motion View */}
          <StoryVideoPlayer
            worldId={activeWorldId}
            title={scene?.title}
            emoji={currentWorldObj.emoji}
            currentScene={currentScene}
            sceneImage={scene?.image || scene?.image_url}
          />

          <div className="story-narrative">
            <p className="story-scene-title">{scene?.title || "Story Chapter"}</p>
            <p>{narrativeText}</p>
          </div>

          {scene?.targetWord && (
            <div className="story-vocabulary">
              <div>
                <span className="story-kicker">WORD OF THE CHAPTER</span>
                <strong>{scene.targetWord}</strong>
                <small>{scene.translation}</small>
              </div>
              <VoiceButton text={scene.targetWord} />
            </div>
          )}

          {/* Interactive Object Component */}
          {scene?.interactiveObject && (
            <div style={{ margin: "20px 0" }}>
              <InteractiveObject
                name={scene.interactiveObject.name || scene.interactiveObject.label}
                icon={scene.interactiveObject.emoji || scene.interactiveObject.icon || "💎"}
                collected={collectedItems.includes(scene.interactiveObject.name || scene.interactiveObject.label)}
                onClick={() => handleCollectObject(scene.interactiveObject)}
              />
            </div>
          )}

          {/* Puzzle Card Component */}
          {scene?.puzzle && (
            <PuzzleCard
              puzzle={scene.puzzle}
              onSolve={handleSolvePuzzle}
              isSolved={puzzleSolved}
            />
          )}

          {/* Choices List */}
          <div className="story-choice-heading">
            <span>What will you do?</span>
            <small>Choose your action to continue the story.</small>
          </div>

          <div className="story-choices">
            {scene?.choices && scene.choices.length > 0 ? (
              scene.choices.map((choice, index) => (
                <ChoiceButton
                  key={`${choice.text}-${index}`}
                  choice={choice}
                  onSelect={handleChoice}
                />
              ))
            ) : (
              <ChoiceButton
                choice={{ text: "Continue the Adventure →", isCorrect: true }}
                onSelect={handleChoice}
              />
            )}
          </div>

          {feedback && (
            <div className={`story-feedback ${feedback.type}`}>
              {feedback.type === "correct" ? <Check size={18} /> : <X size={18} />}
              {feedback.text}
            </div>
          )}
        </section>
      </main>

      <RewardModal
        isOpen={showRewardModal}
        onClose={handleRewardClose}
        title={`${currentWorldObj.title} Restored!`}
        heroName={hero?.name || "Hero"}
        crystalPieces={crystalPieces}
        learnedWords={learnedWords}
        xpEarned={200}
      />
    </div>
  );
}
