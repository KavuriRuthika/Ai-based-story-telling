export const forestScenes = [
  {
    id: 1,
    title: "The Whispering Forest",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1400&q=80",
    text: "The magical forest opened before Anu. Giant trees whispered in the wind while glowing flowers lit the path.",
    narration: "The magical forest opened before you. Giant trees whispered in the wind while glowing flowers lit the path.",
    choices: [
      { id: "river", label: "🌊 Follow the sparkling river" },
      { id: "cave", label: "🪨 Enter the mysterious cave" },
      { id: "hill", label: "⛰️ Climb the glowing hill" }
    ]
  },
  {
    id: 2,
    title: "Miko's Discovery",
    image: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1400&q=80",
    text: "A tiny fox named Miko suddenly appeared. He remembered seeing something magical near the river.",
    narration: "A tiny fox named Miko suddenly appeared. He remembered seeing something magical near the river.",
    object: {
      emoji: "💎",
      name: "Crystal",
      english: "Crystal",
      telugu: "స్ఫటికం",
      hindi: "क्रिस्टल"
    },
    choices: [
      { id: "help", label: "❤️ Help Miko" },
      { id: "explore", label: "🧭 Explore alone" },
      { id: "wait", label: "🌿 Wait quietly" }
    ]
  },
  {
    id: 3,
    title: "The Crystal Lock",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=80",
    text: "Miko found a magical box. A glowing lock appeared on its surface.",
    narration: "Miko found a magical box. A glowing lock appeared on its surface.",
    puzzle: {
      title: "Ancient Rune Lock",
      question: "3 + 2 = ?",
      options: ["4", "5", "6"],
      answer: "5"
    },
    choices: [
      { id: "solve", label: "🧠 Solve the magical puzzle" }
    ]
  },
  {
    id: 4,
    title: "The Magical Door",
    image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1400&q=80",
    text: "The box opened and revealed a magical door. The door responded to your voice.",
    narration: "The box opened and revealed a magical door. The door responded to your voice.",
    voiceCommand: "Open the door.",
    choices: [
      { id: "open", label: "🎤 Say: Open the door" },
      { id: "knock", label: "🚪 Knock on the door" }
    ]
  },
  {
    id: 5,
    title: "The First Crystal",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1400&q=80",
    text: "Behind the door was the first piece of the Great Story Crystal. Lumora began to glow again.",
    narration: "Behind the door was the first piece of the Great Story Crystal. Lumora began to glow again.",
    choices: [
      { id: "collect", label: "✨ Collect the Crystal" }
    ]
  }
];
