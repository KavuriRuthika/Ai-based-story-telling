export const mission1Scenes = [
  {
    id: 1,
    title: "The Whispering Forest",
    text: "Anu stepped into the Whispering Forest. Giant trees reached toward the sky while tiny blue flowers glowed beneath her feet. Suddenly, she heard a soft whisper behind her.",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80",
    choices: [
      { id: "river", emoji: "🌊", text: "Follow the sparkling river", isCorrect: true },
      { id: "cave", emoji: "🪨", text: "Enter the mysterious cave", isCorrect: true },
      { id: "hill", emoji: "⛰️", text: "Climb the glowing hill", isCorrect: true }
    ],
    vocabulary: {
      english: "Crystal",
      telugu: "స్ఫటికం",
      hindi: "क्रिस्टल"
    }
  },
  {
    id: 2,
    title: "Miko the Fox",
    text: "A tiny fox jumped from behind a tree. His name was Miko. He knew where the first Story Crystal piece was hidden, but he could not remember exactly where he had seen it.",
    image: "https://images.unsplash.com/photo-1474511320723-9a56873867b5?auto=format&fit=crop&w=1200&q=80",
    choices: [
      { id: "help", emoji: "❤️", text: "Help Miko remember", isCorrect: true },
      { id: "search", emoji: "🔎", text: "Search the forest", isCorrect: true },
      { id: "ignore", emoji: "🚶", text: "Continue alone", isCorrect: true }
    ]
  },
  {
    id: 3,
    title: "The Glowing Crystal",
    text: "Following the clues, you reach the river. Something is floating in the sparkling water. A key, an apple and a blue crystal are waiting for you.",
    image: "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?auto=format&fit=crop&w=1200&q=80",
    interactive: true,
    objects: [
      { id: "key", emoji: "🔑", label: "Key", name: "Key" },
      { id: "apple", emoji: "🍎", label: "Apple", name: "Apple" },
      { id: "crystal", emoji: "💎", label: "Crystal", name: "Crystal", correct: true }
    ],
    choices: []
  },
  {
    id: 4,
    title: "The Magical Lock",
    text: "Miko finds a magical box. A glowing lock appears. Numbers dance across its surface. Solve the puzzle to open it.",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
    puzzle: {
      title: "Magical Lock",
      question: "3 + 2 = ?",
      options: ["4", "5", "6"],
      answer: "5"
    },
    choices: []
  },
  {
    id: 5,
    title: "The First Crystal Piece",
    text: "The lock opens with a magical flash. Inside lies the first piece of the Story Crystal. Lumora has regained a little of its color, but a mysterious shadow appears in the sky.",
    image: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?auto=format&fit=crop&w=1200&q=80",
    choices: [
      { id: "continue", emoji: "✨", text: "Continue the adventure", isCorrect: true }
    ]
  }
];
