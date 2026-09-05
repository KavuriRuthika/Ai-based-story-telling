import { createContext, useContext, useState } from "react";
import { useGameContext } from "./GameContext";

const StoryContext = createContext();

export function StoryProvider({ children }) {
  const game = useGameContext();
  const [currentStory, setCurrentStory] = useState(null);
  const [currentScene, setCurrentScene] = useState(0);
  const [storyHistory, setStoryHistory] = useState([]);
  const [userChoices, setUserChoices] = useState([]);
  const [loadingStory, setLoadingStory] = useState(false);
  const [storyError, setStoryError] = useState(null);

  const [currentMission, setCurrentMission] = useState(null);
  const [currentWorld, setCurrentWorld] = useState("forest");
  const [puzzleSolved, setPuzzleSolved] = useState(false);
  const [collectedObjects, setCollectedObjects] = useState([]);

  const loadStory = async (storyData) => {
    setLoadingStory(true);
    setStoryError(null);
    try {
      setCurrentStory(storyData);
      setCurrentScene(0);
      setUserChoices([]);
      setStoryHistory([storyData]);
      setPuzzleSolved(false);
      setCollectedObjects([]);
    } catch (error) {
      setStoryError(error.message);
    } finally {
      setLoadingStory(false);
    }
  };

  const recordChoice = (choice) => {
    if (!choice) return;
    const choiceEntry = {
      scene: currentScene,
      choiceId: choice.id || choice.text,
      choiceText: choice.text || choice.label || "",
      timestamp: new Date().toISOString(),
    };
    setUserChoices((previous) => [...previous, choiceEntry]);
    game.addChoice(choiceEntry);
  };

  const solvePuzzle = () => {
    setPuzzleSolved(true);
    game.increaseScore(50);
  };

  const collectObject = (obj) => {
    if (!obj) return;
    setCollectedObjects((prev) => [...prev, obj]);
    if (obj.english) game.addVocabulary(obj.english);
    if (obj.telugu) game.addVocabulary(obj.telugu);
    game.increaseScore(30);
  };

  const nextScene = (newSceneData) => {
    setCurrentScene((prev) => prev + 1);
    if (newSceneData) {
      setStoryHistory((prev) => [...prev, newSceneData]);
      setCurrentStory(newSceneData);
    }
    setPuzzleSolved(false);
  };

  const previousScene = () => {
    if (currentScene > 0) {
      setCurrentScene((prev) => prev - 1);
      const previousSceneData = storyHistory[currentScene - 1];
      if (previousSceneData) {
        setCurrentStory(previousSceneData);
      }
    }
  };

  const resetStory = () => {
    setCurrentStory(null);
    setCurrentScene(0);
    setStoryHistory([]);
    setUserChoices([]);
    setStoryError(null);
    setPuzzleSolved(false);
    setCollectedObjects([]);
  };

  return (
    <StoryContext.Provider
      value={{
        // Story State
        currentStory,
        currentScene,
        setCurrentScene,
        storyHistory,
        userChoices,
        loadingStory,
        storyError,

        // Mission & World
        currentMission,
        setCurrentMission,
        currentWorld,
        setCurrentWorld,
        puzzleSolved,
        collectedObjects,

        // Game Integration
        hero: game.hero,
        addWord: game.addVocabulary,
        completeMission: game.completeMission,
        learnedWords: game.vocabulary,
        crystalPieces: game.completedMissions.length,
        learningProfile: game.learningProfile,
        score: game.score,
        increaseScore: game.increaseScore,

        // Story Actions
        loadStory,
        recordChoice,
        solvePuzzle,
        collectObject,
        nextScene,
        previousScene,
        resetStory,
      }}
    >
      {children}
    </StoryContext.Provider>
  );
}

export function useStory() {
  const context = useContext(StoryContext);
  if (!context) {
    throw new Error("useStory must be used within StoryProvider");
  }
  return context;
}