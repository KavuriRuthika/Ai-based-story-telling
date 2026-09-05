import { voiceAPI } from './api';

export const voiceService = {
  recordAudio: async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      return stream;
    } catch (error) {
      console.error('Error accessing microphone:', error);
      throw error;
    }
  },

  transcribeAudio: async (audioBlob, language = 'en') => {
    try {
      const result = await voiceAPI.transcribeAudio(audioBlob, language);
      return result.data;
    } catch (error) {
      console.error('Error transcribing audio:', error);
      throw error;
    }
  },

  processVoiceAnswer: async (heroId, expectedAnswer, audioBlob, language = 'en') => {
    try {
      const result = await voiceAPI.processVoiceAnswer(
        heroId,
        expectedAnswer,
        audioBlob,
        language
      );
      return result.data;
    } catch (error) {
      console.error('Error processing voice answer:', error);
      throw error;
    }
  },

  playAudio: (audioUrl) => {
    const audio = new Audio(audioUrl);
    audio.play().catch(err => console.error('Error playing audio:', err));
    return audio;
  },

  stopAudio: (audio) => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  },

  // Browser support check
  isVoiceSupported: () => {
    return !!(
      navigator.mediaDevices &&
      navigator.mediaDevices.getUserMedia &&
      window.AudioContext
    );
  },
};
