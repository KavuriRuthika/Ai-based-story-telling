from sqlalchemy import Column, Integer, String, Text, Float, DateTime, JSON, Boolean, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class Hero(Base):
    __tablename__ = "heroes"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), index=True)
    age = Column(Integer)
    language = Column(String(50), default="en")
    character_type = Column(String(50))  # wizard, warrior, explorer, etc.
    avatar_url = Column(String(255))
    level = Column(Integer, default=1)
    experience = Column(Float, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Story(Base):
    __tablename__ = "stories"
    
    id = Column(Integer, primary_key=True, index=True)
    hero_id = Column(Integer, ForeignKey("heroes.id"))
    mission_id = Column(Integer)
    world = Column(String(100))
    title = Column(String(200))
    content = Column(Text)
    image_url = Column(String(255))
    voice_url = Column(String(255))
    choices = Column(JSON)  # Store choice options
    interactive_objects = Column(JSON)  # Tap-able objects
    puzzle_data = Column(JSON)  # Puzzle information
    current_scene = Column(Integer, default=1)
    is_complete = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class LearningProfile(Base):
    __tablename__ = "learning_profiles"
    
    id = Column(Integer, primary_key=True, index=True)
    hero_id = Column(Integer, ForeignKey("heroes.id"))
    vocabulary_level = Column(String(50))  # beginner, intermediate, advanced
    reading_comprehension = Column(Float)
    problem_solving = Column(Float)
    creativity_score = Column(Float)
    learning_style = Column(String(50))  # visual, audio, kinesthetic
    adaptation_notes = Column(JSON)  # Track what works for the child
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class StoryMemory(Base):
    __tablename__ = "story_memories"
    
    id = Column(Integer, primary_key=True, index=True)
    hero_id = Column(Integer, ForeignKey("heroes.id"))
    memory_data = Column(JSON)  # Store story context and choices
    mission_progress = Column(JSON)
    rewards = Column(JSON)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Mission(Base):
    __tablename__ = "missions"
    
    id = Column(Integer, primary_key=True, index=True)
    world = Column(String(100))
    mission_number = Column(Integer)
    title = Column(String(200))
    description = Column(Text)
    difficulty = Column(String(50))  # easy, medium, hard
    learning_objectives = Column(JSON)
    rewards = Column(JSON)
    created_at = Column(DateTime, default=datetime.utcnow)
