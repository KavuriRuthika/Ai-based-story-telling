export const imageService = {
  getPlaceholderImage: (width = 1024, height = 1024, text = 'KathaQuest Image') => {
    return `https://via.placeholder.com/${width}x${height}?text=${encodeURIComponent(text)}`;
  },

  preloadImage: (imageUrl) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = imageUrl;
    });
  },

  getWorldThumbnail: (worldName) => {
    const thumbnails = {
      'Lumora': 'https://via.placeholder.com/400x300?text=Lumora+Kingdom',
      'Whispering Forest': 'https://via.placeholder.com/400x300?text=Whispering+Forest',
      'Crystal Caverns': 'https://via.placeholder.com/400x300?text=Crystal+Caverns',
      'Sky Islands': 'https://via.placeholder.com/400x300?text=Sky+Islands',
      'Dragon\'s Peak': 'https://via.placeholder.com/400x300?text=Dragons+Peak',
    };
    return thumbnails[worldName] || this.getPlaceholderImage();
  },

  getCharacterAvatar: (characterType) => {
    const avatars = {
      'wizard': '🧙‍♂️',
      'warrior': '⚔️',
      'explorer': '🧭',
      'healer': '⚕️',
      'scholar': '📚',
    };
    return avatars[characterType.toLowerCase()] || '👤';
  },
};
