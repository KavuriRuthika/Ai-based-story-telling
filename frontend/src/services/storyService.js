import { storyAPI } from './api';

export const storyService = {
  generateStoryScene: async (heroId, heroName, heroType, world, missionId, scene, language) => {
    try {
      const response = await storyAPI.generateScene({
        hero_id: heroId,
        hero_name: heroName,
        hero_type: heroType,
        world: world,
        mission_id: missionId,
        current_scene: scene,
        target_language: language,
      });
      return response.data;
    } catch (error) {
      console.error('Error generating story scene:', error);
      throw error;
    }
  },

  evaluateChildResponse: async (heroId, response, correctAnswer) => {
    try {
      const result = await storyAPI.evaluateResponse(heroId, response, correctAnswer);
      return result.data;
    } catch (error) {
      console.error('Error evaluating response:', error);
      throw error;
    }
  },

  // Local story data management
  saveStoryProgress: (heroId, storyProgress) => {
    localStorage.setItem(`story_progress_${heroId}`, JSON.stringify(storyProgress));
  },

  getStoryProgress: (heroId) => {
    const progress = localStorage.getItem(`story_progress_${heroId}`);
    return progress ? JSON.parse(progress) : null;
  },

  clearStoryProgress: (heroId) => {
    localStorage.removeItem(`story_progress_${heroId}`);
  },
};
