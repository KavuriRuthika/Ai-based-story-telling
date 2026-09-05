export const MULTILINGUAL_STORIES = {
  forest: {
    en: [
      {
        id: 1,
        title: "The Whispering Forest",
        narrative: "Giant trees stretched toward the sky while tiny blue flowers glowed beneath their roots. A soft voice whispered through the leaves...",
        targetWord: "Crystal",
        translation: "Sparkling Gem",
        choices: [
          { text: "🌊 Follow the sparkling river", isCorrect: true },
          { text: "🪨 Enter the mysterious cave", isCorrect: true },
          { text: "⛰️ Climb the glowing hill", isCorrect: true }
        ],
        interactiveObject: { name: "Glow Flower", emoji: "🌸", english: "Glow Flower" }
      },
      {
        id: 2,
        title: "Miko the Friendly Fox",
        narrative: "A tiny golden fox named Miko jumped from behind a glowing tree, pointing to an ancient riddle lock.",
        targetWord: "Friendship",
        translation: "Kind Connection",
        choices: [
          { text: "❤️ Help Miko solve the riddle", isCorrect: true },
          { text: "💬 Talk to the forest guardian", isCorrect: true }
        ],
        puzzle: {
          title: "Ancient Tree Math Lock",
          question: "What is 3 + 2?",
          options: ["4", "5", "6"],
          answer: "5"
        }
      },
      {
        id: 3,
        title: "The First Story Crystal Fragment",
        narrative: "The ancient door unlocked! Floating on a pedestal of starlight, the first piece of Lumora's Story Crystal shone brightly.",
        targetWord: "Victory",
        translation: "Great Success",
        choices: [
          { text: "✨ Collect the Story Crystal", isCorrect: true }
        ]
      }
    ],
    te: [
      {
        id: 1,
        title: "మర్మమైన అడవి",
        narrative: "రాకాసి చెట్లు ఆకాశం వైపు చాచబడ్డాయి. నీలిరంగు పువ్వులు తమ వేళ్ళ కింద మెరుస్తున్నాయి. ఆకుల గుండా ఒక మృదువైన స్వరం వినపడింది...",
        targetWord: "స్ఫటికం",
        translation: "Crystal",
        choices: [
          { text: "🌊 మెరిసే నదిని అనుసరించండి", isCorrect: true },
          { text: "🪨 మర్మమైన గుహలోకి ప్రవేశించండి", isCorrect: true },
          { text: "⛰️ ప్రకాశించే కొండను ఎక్కండి", isCorrect: true }
        ],
        interactiveObject: { name: "దివ్య పువ్వు", emoji: "🌸", telugu: "పువ్వు", english: "Glow Flower" }
      },
      {
        id: 2,
        title: "స్నేహపూర్వక నక్క మీకో",
        narrative: "మీకో అనే చిన్న బంగారు నక్క చెట్టు వెనుక నుండి దూకి, ప్రాచీన పొడుపు విప్పే తాళం వైపు చూపించింది.",
        targetWord: "స్నేహం",
        translation: "Friendship",
        choices: [
          { text: "❤️ మీకోకు పొడుపు విప్పడంలో సహాయపడండి", isCorrect: true },
          { text: "💬 అడవి రక్షకుడితో మాట్లాడండి", isCorrect: true }
        ],
        puzzle: {
          title: "ప్రాచీన గణిత తాళం",
          question: "3 + 2 ఎంత?",
          options: ["4", "5", "6"],
          answer: "5"
        }
      },
      {
        id: 3,
        title: "మొదటి కథా స్ఫటిక ముక్క",
        narrative: "ప్రాచీన తలుపు తెరవబడింది! నక్షత్రాల కాంతిపై తేలుతూ, లూమోరా కథా స్ఫటికం యొక్క మొదటి ముక్క ప్రకాశవంతంగా మెరిసింది.",
        targetWord: "విజయం",
        translation: "Victory",
        choices: [
          { text: "✨ కథా స్ఫటికాన్ని సేకరించండి", isCorrect: true }
        ]
      }
    ],
    hi: [
      {
        id: 1,
        title: "रहस्यमयी जंगल",
        narrative: "विशाल पेड़ आसमान की ओर फैले थे और नीले फूल चमक रहे थे। हवा में एक मधुर आवाज़ गूंजी...",
        targetWord: "क्रिस्टल",
        translation: "Crystal",
        choices: [
          { text: "🌊 चमकती नदी का पीछा करें", isCorrect: true },
          { text: "🪨 रहस्यमयी गुफा में प्रवेश करें", isCorrect: true },
          { text: "⛰️ जगमगाती पहाड़ी पर चढ़ें", isCorrect: true }
        ],
        interactiveObject: { name: "जादुई फूल", emoji: "🌸", hindi: "फूल" }
      },
      {
        id: 2,
        title: "मित्रवत लोमड़ी मीको",
        narrative: "मीको नाम की एक छोटी सुनहरी लोमड़ी पेड़ के पीछे से कूदी और एक प्राचीन ताले की ओर इशारा किया।",
        targetWord: "मित्रता",
        translation: "Friendship",
        choices: [
          { text: "❤️ मीको की मदद करें", isCorrect: true },
          { text: "💬 जंगल के रक्षक से बात करें", isCorrect: true }
        ],
        puzzle: {
          title: "प्राचीन गणित पहेली",
          question: "3 + 2 कितना होता है?",
          options: ["4", "5", "6"],
          answer: "5"
        }
      },
      {
        id: 3,
        title: "पहला स्टोरी क्रिस्टल टुकड़ा",
        narrative: "प्राचीन दरवाजा खुल गया! तारों की रोशनी में तैरता हुआ स्टोरी क्रिस्टल का पहला टुकड़ा चमक उठा।",
        targetWord: "विजय",
        translation: "Victory",
        choices: [
          { text: "✨ क्रिस्टल इकट्ठा करें", isCorrect: true }
        ]
      }
    ],
    es: [
      {
        id: 1,
        title: "El Bosque Susurrante",
        narrative: "Árboles gigantes se alzaban hacia el cielo mientras flores azules brillaban en el suelo. Una suave voz susurró...",
        targetWord: "Cristal",
        translation: "Crystal",
        choices: [
          { text: "🌊 Sigue el río brillante", isCorrect: true },
          { text: "🪨 Entra en la cueva misteriosa", isCorrect: true }
        ],
        interactiveObject: { name: "Flor Brillante", emoji: "🌸" }
      },
      {
        id: 2,
        title: "Miko el Zorro Amistoso",
        narrative: "Un pequeño zorro dorado llamado Miko señaló un candado con un acertijo mágico.",
        targetWord: "Amistad",
        translation: "Friendship",
        choices: [
          { text: "❤️ Ayuda a Miko a resolver el acertijo", isCorrect: true }
        ],
        puzzle: {
          title: "Acertijo Matemático",
          question: "¿Cuánto es 3 + 2?",
          options: ["4", "5", "6"],
          answer: "5"
        }
      },
      {
        id: 3,
        title: "El Primer Fragmento de Cristal",
        narrative: "¡La puerta mágica se abrió! El primer fragmento del Cristal de Historias brilló intensamente.",
        targetWord: "Victoria",
        translation: "Victory",
        choices: [
          { text: "✨ Recoge el Cristal", isCorrect: true }
        ]
      }
    ],
    fr: [
      {
        id: 1,
        title: "La Forêt Chuchotante",
        narrative: "Des arbres géants s'étendaient vers le ciel tandis que des fleurs bleues brillaient sur le sol. Une voix douce chuchota...",
        targetWord: "Cristal",
        translation: "Crystal",
        choices: [
          { text: "🌊 Suivez la rivière scintillante", isCorrect: true },
          { text: "🪨 Entrez dans la grotte mystérieuse", isCorrect: true }
        ],
        interactiveObject: { name: "Fleur Lumineuse", emoji: "🌸" }
      },
      {
        id: 2,
        title: "Miko le Renard Amical",
        narrative: "Un petit renard doré nommé Miko montra une serrure magique contenant une énigme.",
        targetWord: "Amitié",
        translation: "Friendship",
        choices: [
          { text: "❤️ Aidez Miko à résoudre l'énigme", isCorrect: true }
        ],
        puzzle: {
          title: "Énigme Mathématique",
          question: "Combien font 3 + 2 ?",
          options: ["4", "5", "6"],
          answer: "5"
        }
      },
      {
        id: 3,
        title: "Le Premier Fragment de Cristal",
        narrative: "La porte magique s'est ouverte ! Le premier fragment du Cristal d'Histoires brillait de mille feux.",
        targetWord: "Victoire",
        translation: "Victory",
        choices: [
          { text: "✨ Ramassez le Cristal", isCorrect: true }
        ]
      }
    ]
  },
  ocean: {
    en: [
      {
        id: 1,
        title: "The Coral Sanctuary",
        narrative: "You submerge into glowing blue ocean waters. Schools of bioluminescent fish swim around you.",
        targetWord: "Ocean",
        translation: "Deep Blue Sea",
        choices: [
          { text: "🌊 Swim towards the Coral Reef", isCorrect: true },
          { text: "🐬 Follow the friendly Dolphin", isCorrect: true }
        ],
        interactiveObject: { name: "Pearl Shell", emoji: "🦪" }
      },
      {
        id: 2,
        title: "The Ocean Pearl Puzzle",
        narrative: "A friendly octopus guards an underwater chest containing the second crystal fragment.",
        targetWord: "Pearl",
        translation: "Ocean Gem",
        choices: [
          { text: "🔑 Open the Treasure Chest", isCorrect: true }
        ],
        puzzle: {
          title: "Sea Star Math",
          question: "Count 5 + 5 sea star arms:",
          options: ["8", "10", "12"],
          answer: "10"
        }
      }
    ],
    te: [
      {
        id: 1,
        title: "పగడపు అభయారణ్యం",
        narrative: "మీరు ప్రకాశించే నీలి సముద్రపు నీటిలో మునిగిపోయారు. జీవకాంతి చేపలు మీ చుట్టూ ఈదుతున్నాయి.",
        targetWord: "సముద్రము",
        translation: "Ocean",
        choices: [
          { text: "🌊 పగడపు దిబ్బ వైపు ఈదండి", isCorrect: true },
          { text: "🐬 స్నేహపూర్వక డాల్ఫిన్‌ను అనుసరించండి", isCorrect: true }
        ],
        interactiveObject: { name: "ముత్యపు గుల్ల", emoji: "🦪" }
      },
      {
        id: 2,
        title: "సముద్ర ముత్యపు పొడుపు",
        narrative: "ఒక స్నేహపూర్వక అష్టపది రెండవ స్ఫటిక ముక్కను కలిగి ఉన్న నీటి అడుగున పెట్టెను రక్షిస్తోంది.",
        targetWord: "ముత్యము",
        translation: "Pearl",
        choices: [
          { text: "🔑 నిధి పెట్టెను తెరవండి", isCorrect: true }
        ],
        puzzle: {
          title: "సముద్ర నక్షత్ర గణితం",
          question: "5 + 5 ఎంత?",
          options: ["8", "10", "12"],
          answer: "10"
        }
      }
    ],
    hi: [
      {
        id: 1,
        title: "मूंगा अभयारण्य",
        narrative: "आप चमकते नीले समुद्र के पानी में गोता लगाते हैं। रंग-बिरंगी मछलियाँ आपके चारों ओर तैरती हैं।",
        targetWord: "समुद्र",
        translation: "Ocean",
        choices: [
          { text: "🌊 मूँगे की चट्टान की ओर तैरें", isCorrect: true },
          { text: "🐬 डॉल्फ़िन का पीछा करें", isCorrect: true }
        ],
        interactiveObject: { name: "मोती की सीप", emoji: "🦪" }
      },
      {
        id: 2,
        title: "समुद्री मोती पहेली",
        narrative: "एक मित्रवत ऑक्टोपस एक संदूक की रक्षा करता है जिसमें दूसरा क्रिस्टल टुकड़ा है।",
        targetWord: "मोती",
        translation: "Pearl",
        choices: [
          { text: "🔑 खजाने की तिजोरी खोलें", isCorrect: true }
        ],
        puzzle: {
          title: "स्टारफिश गणित",
          question: "5 + 5 कितना होता है?",
          options: ["8", "10", "12"],
          answer: "10"
        }
      }
    ]
  }
};
