-- KathaQuest Database Schema

-- Heroes table
CREATE TABLE IF NOT EXISTS heroes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INTEGER NOT NULL,
    language VARCHAR(50) DEFAULT 'en',
    character_type VARCHAR(50),
    avatar_url VARCHAR(255),
    level INTEGER DEFAULT 1,
    experience FLOAT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_heroes_name ON heroes(name);

-- Stories table
CREATE TABLE IF NOT EXISTS stories (
    id SERIAL PRIMARY KEY,
    hero_id INTEGER NOT NULL REFERENCES heroes(id),
    mission_id INTEGER,
    world VARCHAR(100),
    title VARCHAR(200),
    content TEXT,
    image_url VARCHAR(255),
    voice_url VARCHAR(255),
    choices JSON,
    interactive_objects JSON,
    puzzle_data JSON,
    current_scene INTEGER DEFAULT 1,
    is_complete BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_stories_hero_id ON stories(hero_id);
CREATE INDEX idx_stories_mission_id ON stories(mission_id);
CREATE INDEX idx_stories_world ON stories(world);

-- Learning Profiles table
CREATE TABLE IF NOT EXISTS learning_profiles (
    id SERIAL PRIMARY KEY,
    hero_id INTEGER NOT NULL REFERENCES heroes(id) UNIQUE,
    vocabulary_level VARCHAR(50),
    reading_comprehension FLOAT DEFAULT 50,
    problem_solving FLOAT DEFAULT 50,
    creativity_score FLOAT DEFAULT 50,
    learning_style VARCHAR(50),
    adaptation_notes JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_learning_profiles_hero_id ON learning_profiles(hero_id);

-- Story Memory table
CREATE TABLE IF NOT EXISTS story_memories (
    id SERIAL PRIMARY KEY,
    hero_id INTEGER NOT NULL REFERENCES heroes(id),
    memory_data JSON,
    mission_progress JSON,
    rewards JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_story_memories_hero_id ON story_memories(hero_id);

-- Missions table
CREATE TABLE IF NOT EXISTS missions (
    id SERIAL PRIMARY KEY,
    world VARCHAR(100),
    mission_number INTEGER,
    title VARCHAR(200),
    description TEXT,
    difficulty VARCHAR(50),
    learning_objectives JSON,
    rewards JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_missions_world ON missions(world);

-- Mission Progress table (to track hero's progress through missions)
CREATE TABLE IF NOT EXISTS mission_progress (
    id SERIAL PRIMARY KEY,
    hero_id INTEGER NOT NULL REFERENCES heroes(id),
    mission_id INTEGER NOT NULL REFERENCES missions(id),
    status VARCHAR(50) DEFAULT 'in_progress',  -- in_progress, completed, abandoned
    progress_data JSON,
    score FLOAT DEFAULT 0,
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX idx_mission_progress_hero_mission ON mission_progress(hero_id, mission_id);

-- Story Interactions table (to track interactions for learning analytics)
CREATE TABLE IF NOT EXISTS story_interactions (
    id SERIAL PRIMARY KEY,
    hero_id INTEGER NOT NULL REFERENCES heroes(id),
    story_id INTEGER NOT NULL REFERENCES stories(id),
    interaction_type VARCHAR(50),  -- choice, puzzle, tap, voice, etc.
    interaction_data JSON,
    response_text TEXT,
    is_correct BOOLEAN,
    time_spent_seconds INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_interactions_hero_id ON story_interactions(hero_id);
CREATE INDEX idx_interactions_story_id ON story_interactions(story_id);

-- Rewards/Achievements table
CREATE TABLE IF NOT EXISTS achievements (
    id SERIAL PRIMARY KEY,
    hero_id INTEGER NOT NULL REFERENCES heroes(id),
    achievement_type VARCHAR(100),
    achievement_name VARCHAR(200),
    badge_url VARCHAR(255),
    earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_achievements_hero_id ON achievements(hero_id);

-- World Data table (static data for worlds)
CREATE TABLE IF NOT EXISTS worlds (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE,
    description TEXT,
    thumbnail_url VARCHAR(255),
    difficulty_level VARCHAR(50),
    is_unlocked BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default worlds
INSERT INTO worlds (name, description, difficulty_level) VALUES
    ('Lumora', 'The magical kingdom of Lumora where all adventures begin', 'beginner'),
    ('Whispering Forest', 'A mystical forest filled with ancient secrets and magical creatures', 'easy'),
    ('Crystal Caverns', 'Sparkling caves filled with puzzles and hidden treasures', 'medium'),
    ('Sky Islands', 'Floating islands suspended in the clouds with amazing views', 'medium'),
    ('Dragon''s Peak', 'A majestic mountain with the dragon''s castle and ancient magic', 'hard')
ON CONFLICT (name) DO NOTHING;

-- Heroes World Progress (to track which worlds are unlocked)
CREATE TABLE IF NOT EXISTS hero_world_progress (
    id SERIAL PRIMARY KEY,
    hero_id INTEGER NOT NULL REFERENCES heroes(id),
    world_id INTEGER NOT NULL REFERENCES worlds(id),
    is_unlocked BOOLEAN DEFAULT FALSE,
    is_completed BOOLEAN DEFAULT FALSE,
    progress FLOAT DEFAULT 0,
    visited_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP
);

CREATE UNIQUE INDEX idx_hero_world ON hero_world_progress(hero_id, world_id);

-- Session Logs (for debugging and analytics)
CREATE TABLE IF NOT EXISTS session_logs (
    id SERIAL PRIMARY KEY,
    hero_id INTEGER REFERENCES heroes(id),
    session_type VARCHAR(50),
    event_data JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_session_logs_hero_id ON session_logs(hero_id);
CREATE INDEX idx_session_logs_created_at ON session_logs(created_at);
