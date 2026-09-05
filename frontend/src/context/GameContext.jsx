import { createContext, useContext, useState, useEffect } from "react";

const GameContext = createContext();

const WORLD_UNLOCK_SEQUENCE = ["forest", "ocean", "cloud", "castle", "dragon", "rainbow"];

export function GameProvider({ children }) {
  const [hero, setHero] = useState(() => {
    try {
      const savedHero = localStorage.getItem("heroData");
      return savedHero ? JSON.parse(savedHero) : null;
    } catch {
      return null;
    }
  });

  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("selectedLanguage") || "en";
  });

  const [currentScene, setCurrentScene] = useState(0);
  const [choices, setChoices] = useState([]);
  const [score, setScore] = useState(0);
  const [vocabulary, setVocabulary] = useState([]);
  const [completedMissions, setCompletedMissions] = useState([]);
  const [unlockedWorlds, setUnlockedWorlds] = useState(["forest"]);

  const [learningProfile, setLearningProfile] = useState({
    vocabulary_level: "beginner",
    reading_comprehension: 50,
    problem_solving: 50,
    creativity_score: 50,
    learning_style: "visual",
  });

  // Save language preference
  useEffect(() => {
    localStorage.setItem("selectedLanguage", language);
  }, [language]);

  // Save hero data
  useEffect(() => {
    if (hero) {
      localStorage.setItem("heroData", JSON.stringify(hero));
    }
  }, [hero]);

  const setHeroData = (heroData) => {
    setHero((prev) => ({
      ...prev,
      ...heroData,
      level: heroData?.level || prev?.level || 1,
      experience: heroData?.experience || prev?.experience || 0,
    }));
  };

  const addChoice = (choice) => {
    setChoices((previous) => [...previous, choice]);
  };

  const addVocabulary = (word) => {
    if (!word) return;
    setVocabulary((previous) => {
      if (previous.includes(word)) return previous;
      return [...previous, word];
    });
  };

  const increaseScore = (amount = 10) => {
    setScore((previous) => previous + amount);
    if (hero) {
      setHero((prev) => {
        if (!prev) return prev;
        const newXp = (prev.experience || 0) + amount;
        const newLevel = Math.floor(newXp / 100) + 1;
        return {
          ...prev,
          experience: newXp,
          level: newLevel,
        };
      });
    }
  };

  const completeMission = (missionId) => {
    setCompletedMissions((previous) => {
      if (previous.includes(missionId)) return previous;
      return [...previous, missionId];
    });

    increaseScore(200);

    // Auto unlock next world if applicable
    setUnlockedWorlds((prevUnlocked) => {
      const currentHighestIndex = Math.max(
        ...prevUnlocked.map((w) => WORLD_UNLOCK_SEQUENCE.indexOf(w))
      );
      if (currentHighestIndex + 1 < WORLD_UNLOCK_SEQUENCE.length) {
        const nextWorld = WORLD_UNLOCK_SEQUENCE[currentHighestIndex + 1];
        if (!prevUnlocked.includes(nextWorld)) {
          return [...prevUnlocked, nextWorld];
        }
      }
      return prevUnlocked;
    });
  };

  const unlockWorld = (worldId) => {
    setUnlockedWorlds((previous) => {
      if (previous.includes(worldId)) return previous;
      return [...previous, worldId];
    });
  };

  const updateLearning = (updates) => {
    setLearningProfile((previous) => ({
      ...previous,
      ...updates,
    }));
  };

  const resetAdventure = () => {
    setCurrentScene(0);
    setChoices([]);
    setScore(0);
    setVocabulary([]);
    setCompletedMissions([]);
    setUnlockedWorlds(["forest"]);
    setLearningProfile({
      vocabulary_level: "beginner",
      reading_comprehension: 50,
      problem_solving: 50,
      creativity_score: 50,
      learning_style: "visual",
    });
  };

  return (
    <GameContext.Provider
      value={{
        hero,
        setHero: setHeroData,
        language,
        setLanguage,

        currentScene,
        setCurrentScene,

        choices,
        addChoice,

        score,
        increaseScore,

        vocabulary,
        addVocabulary,

        completedMissions,
        completeMission,

        unlockedWorlds,
        unlockWorld,

        learningProfile,
        updateLearning,

        resetAdventure,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGameContext() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within GameProvider");
  }
  return context;
}

export const useGame = useGameContext;
