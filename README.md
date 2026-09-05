# 🌌 KathaQuest - AI-Powered Adaptive Story Creation Platform

KathaQuest is an innovative, AI-based interactive storytelling platform designed to create personalized, adaptive learning experiences for children. Through immersive narratives in the magical world of Lumora, children embark on adventures that adapt to their learning styles and abilities.

## 📋 Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Frontend Pages](#frontend-pages)
- [Learning Adaptation](#learning-adaptation)
- [Development Guide](#development-guide)
- [Contributing](#contributing)

## ✨ Features

### Core Features
- **AI-Generated Stories**: Dynamic, adaptive story generation using OpenAI's GPT-4
- **Multi-Language Support**: Stories in English, Spanish, French, German, and Hindi
- **Interactive Elements**: Choices, puzzles, tap-interactions, and voice-based activities
- **Adaptive Learning**: Stories adapt to each child's learning profile and performance
- **Voice Integration**: Text-to-speech for narration and speech-to-text for voice answers
- **Image Generation**: AI-generated illustrations for each story scene
- **Learning Analytics**: Comprehensive tracking of vocabulary, comprehension, and problem-solving

### Worlds & Missions
- **Lumora**: The magical kingdom where adventures begin
- **Whispering Forest**: A mystical forest with magical creatures
- **Crystal Caverns**: Puzzle-filled caves with hidden treasures
- **Sky Islands**: Floating islands in the clouds
- **Dragon's Peak**: A majestic mountain with ancient magic

### Learning Features
- **Vocabulary Adaptation**: Content complexity adjusts to child's vocabulary level
- **Learning Style Detection**: Visual, Audio, Kinesthetic, Reading/Writing
- **Problem-Solving Challenges**: Adaptive puzzles based on performance
- **Reward System**: Achievements, badges, and personalized encouragement
- **Progress Tracking**: Detailed learning profiles and mission progress

## 🏗️ Architecture

### Technology Stack

**Backend:**
- FastAPI (Python web framework)
- OpenAI API (GPT-4, DALL-E, TTS, Whisper)
- SQLAlchemy (ORM)
- PostgreSQL/SQLite (Database)

**Frontend:**
- React 19 with Vite
- React Router for navigation
- Axios for API calls
- Lucide React for icons
- CSS3 for styling

### System Design

```
┌─────────────────────────────────────────────────────────────┐
│                     React Frontend                          │
│  (Components, Pages, Context, Services)                     │
### ⚡ QUICK START: Run Everything with One Command!
└──────────────────┬──────────────────────────────────────────┘
For detailed single-command startup options, see [STARTUP.md](STARTUP.md)

**Option 1: npm (Recommended)**
```bash
npm run dev
```

**Option 2: PowerShell (Windows)**
```powershell
powershell -ExecutionPolicy Bypass -File run.ps1
```

**Option 3: Bash (Mac/Linux)**
```bash
./run.sh
```

**Option 4: Docker Compose**
```bash
docker-compose up
```

✅ Access at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs
                   │ HTTP/REST API
                   ▼
┌─────────────────────────────────────────────────────────────┐
│                    FastAPI Backend                          │
├─────────────────────────────────────────────────────────────┤
│ Routes: /heroes, /story, /learning, /voice, /missions       │
                   │
        ┌──────────┼──────────┐
    │OpenAI  │ │Database│ │External  │
    │API     │ │(SQLite)│ │Services  │

## 📁 Project Structure
KathaQuest/
│
│   ├── app/
│   │   ├── main.py (FastAPI app initialization)
│   │   │   ├── __init__.py (Database models)
│   │   │   └── story.py (Pydantic schemas)
│   │   ├── routes/
│   │   │   └── story.py (API endpoints)
│   │   └── services/
│   │       ├── llm_service.py (Story generation)
│   │       ├── image_service.py (Image generation)
│   │       ├── tts_service.py (Text-to-speech)
│   │       ├── stt_service.py (Speech-to-text)
│   │       ├── learning_service.py (Learning analytics)
│   │       └── adaptive_service.py (Adaptive storytelling)
│   ├── requirements.txt
│   ├── .env
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── ChoiceButton.jsx
│   │   │   ├── WorldCard.jsx
│   │   │   ├── PuzzleCard.jsx
│   │   │   ├── RewardModal.jsx
│   │   │   ├── ProgressBar.jsx
│   │   │   └── LoadingScreen.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── CreateHero.jsx
│   │   │   ├── LumoraIntro.jsx
│   │   │   ├── Map.jsx
│   │   │   ├── Mission.jsx
│   │   │   ├── Story.jsx
│   │   │   ├── MissionComplete.jsx
│   │   │   └── Profile.jsx
│   │   ├── context/
│   │   │   ├── GameContext.jsx (Global game state)
│   │   │   └── StoryContext.jsx (Story state)
│   │   ├── services/
│   │   │   ├── api.js (API client)
│   │   │   ├── storyService.js
│   │   │   ├── voiceService.js
│   │   │   └── imageService.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── App.css
│   │   └── index.css
│   ├── package.json
│   ├── .env
│   └── vite.config.js
│
├── database/
│   └── schema.sql (Database schema)
│
├── .env.example
└── README.md
```

## 🔧 Prerequisites

- **Python 3.9+** (for backend)
- **Node.js 18+** (for frontend)
- **npm or yarn** (package manager)
- **OpenAI API Key** (for story/image generation)
- **Git** (for version control)

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/kathaquest.git
cd kathaquest
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install
# or
yarn install
```

## ⚙️ Configuration

### 1. Backend Configuration

Create `.env` file in the `backend/` directory:

```env
# OpenAI API
OPENAI_API_KEY=sk-your-api-key-here

# Database
DATABASE_URL=sqlite:///./kathaquest.db

# CORS
CORS_ORIGINS=http://localhost:5173,http://localhost:3000

# Features
ENABLE_VOICE_FEATURES=True
ENABLE_IMAGE_GENERATION=True
ENABLE_ADAPTIVE_LEARNING=True

# Environment
ENVIRONMENT=development
DEBUG=True
```

### 2. Frontend Configuration

Create `.env` file in the `frontend/` directory:

```env
VITE_API_URL=http://localhost:8000/api
VITE_APP_NAME=KathaQuest
VITE_ENABLE_VOICE=true
VITE_ENABLE_IMAGES=true
VITE_DEFAULT_LANGUAGE=en
```

### 3. Database Setup

```bash
# In backend directory, create database
python
>>> from app.models import Base
>>> from sqlalchemy import create_engine
>>> engine = create_engine('sqlite:///kathaquest.db')
>>> Base.metadata.create_all(engine)
>>> exit()
```

Or use the schema.sql:

```bash
sqlite3 kathaquest.db < ../database/schema.sql
```

## 🚀 Running the Application

### 1. Start Backend Server

```bash
cd backend

# Activate virtual environment
source venv/bin/activate  # or venv\Scripts\activate on Windows

# Run FastAPI server
uvicorn app.main:app --reload --port 8000
```

Server will be available at: `http://localhost:8000`
API Documentation: `http://localhost:8000/docs`

### 2. Start Frontend Development Server

```bash
cd frontend

# Start Vite dev server
npm run dev
# or
yarn dev
```

Frontend will be available at: `http://localhost:5173`

## 📚 API Documentation

### Available Endpoints

**Heroes:**
- `POST /api/heroes` - Create a new hero
- `GET /api/heroes/{hero_id}` - Get hero details

**Stories:**
- `POST /api/story/generate` - Generate a story scene
- `POST /api/story/evaluate` - Evaluate child's response

**Learning:**
- `POST /api/learning-profile/{hero_id}` - Create/update learning profile
- `GET /api/learning-profile/{hero_id}` - Get learning profile

**Voice:**
- `POST /api/voice/transcribe` - Transcribe audio
- `POST /api/voice/process-answer` - Process voice answer

**Missions:**
- `GET /api/missions` - Get available missions

**Rewards:**
- `POST /api/reward-message/{hero_id}` - Get personalized reward message

Full documentation available at: `http://localhost:8000/docs`

## 🎮 Frontend Pages

### Home Page (`/`)
- Welcome screen with KathaQuest branding
- "Create Hero" and "Continue Adventure" options
- World overview

### Create Hero (`/create-hero`)
- Hero name and age input
- Character type selection (Wizard, Warrior, Explorer, Healer, Scholar)
- Language preference
- Learning goal selection

### Lumora Intro (`/lumora`)
- Introduction to the magical world
- Story setup
- Initial world exploration

### World Map (`/world-map`)
- Visual representation of Lumora worlds
- World unlock status
- Mission availability
- Navigation between worlds

### Mission (`/mission`)
- Mission briefing and objectives
- Learning goals
- Difficulty level
- Mission start button

### Story (`/story`)
- Interactive story scenes
- Choices and decisions
- Puzzle challenges
- Interactive object interactions
- Voice-based activities

### Mission Complete (`/mission-complete`)
- Mission summary
- XP and rewards earned
- Achievement unlocks
- Next mission preview

### Profile (`/profile`)
- Hero stats and progress
- Learning profile
- Vocabulary learned
- Achievements and badges
- Mission history

## 🧠 Learning Adaptation

### Vocabulary Level Adaptation

The system adapts story complexity based on the child's age and performance:

- **Beginner**: Simple words, short sentences, concrete concepts
- **Intermediate**: Mixed complexity, varied sentence structure
- **Advanced**: Rich vocabulary, complex concepts, abstract ideas

### Learning Style Detection

Stories adapt to four learning styles:

- **Visual**: Detailed descriptions, rich imagery
- **Audio**: Dialogue, character voices, sound effects
- **Kinesthetic**: Interactive elements, puzzles, hands-on activities
- **Reading/Writing**: Narrative focus, vocabulary building

### Adaptive Difficulty

- Puzzle difficulty increases with success
- Number of choices decreases if struggling
- Hints provided automatically for low performance
- Pacing adjusted based on comprehension

## 🔨 Development Guide

### Adding New Story Scenes

```python
# In backend/app/services/llm_service.py
def generate_story_scene(
    hero_name: str,
    hero_type: str,
    world: str,
    mission_id: int,
    scene_number: int,
    language: str = "en"
):
    # Customize prompt and generation logic
    pass
```

### Adding New Missions

```python
# In backend/app/routes/story.py
missions = [
    {
        "id": 4,
        "mission_number": 4,
        "world": "New World",
        "title": "New Mission",
        "description": "Description",
        "difficulty": "hard",
        "learning_objectives": ["objective1", "objective2"],
        "rewards": {"xp": 300, "badge": "new_badge"}
    }
]
```

### Customizing Learning Analytics

```python
# In backend/app/services/learning_service.py
def calculate_learning_profile(
    quiz_results,
    interaction_patterns,
    age
):
    # Customize how learning profiles are calculated
    pass
```

### Styling Components

Each component has accompanying CSS files:

```css
/* frontend/src/components/ComponentName.css */
.component-name {
  /* Your styles */
}
```

## 📖 Usage Examples

### Starting the Application

1. Open terminal and run backend server
2. Open another terminal and run frontend server
3. Navigate to `http://localhost:5173`
4. Create a hero character
5. Select a world and mission
6. Engage with the adaptive story

### Example API Call

```javascript
// Frontend calling backend
import { storyAPI } from './services/api';

const scene = await storyAPI.generateScene({
  hero_id: 1,
  hero_name: "Arjun",
  hero_type: "wizard",
  world: "Whispering Forest",
  mission_id: 1,
  current_scene: 1,
  target_language: "en"
});
```

## 🔒 Security Considerations

- API keys stored in `.env` files (never commit)
- CORS configured for specific origins
- Input validation on all endpoints
- SQL injection prevention via SQLAlchemy ORM
- XSS protection in frontend rendering

## 🐛 Troubleshooting

### Backend Issues

**Issue: ModuleNotFoundError**
```bash
# Ensure virtual environment is activated
source venv/bin/activate
pip install -r requirements.txt
```

**Issue: OpenAI API Error**
- Verify API key in `.env`
- Check API usage limits
- Ensure OpenAI account has credits

### Frontend Issues

**Issue: Port 5173 already in use**
```bash
# Kill process on port or specify different port
npm run dev -- --port 3000
```

**Issue: API calls returning 404**
- Ensure backend is running on port 8000
- Check VITE_API_URL in frontend `.env`

## 📝 License

MIT License - see LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📞 Support

For issues or questions:
- Create GitHub issue
- Contact: support@kathaquest.com
- Documentation: https://docs.kathaquest.com

## 🎯 Future Features

- Real-time multiplayer stories
- Mobile app (React Native)
- Advanced NLP for better response evaluation
- Parent dashboard for learning insights
- Integration with educational standards (NCERT, Common Core)
- Advanced analytics and reporting
- Social features (story sharing, competition)

---

**Made with ❤️ for children's education**
