from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime

class HeroBase(BaseModel):
    name: str
    age: int
    language: str = "en"
    character_type: str
    topic: str = "Space"
    story_style: str = "Educational quest"
    learning_goal: str = "General Learning"

class HeroCreate(HeroBase):
    pass

class Hero(HeroBase):
    id: int
    level: int
    experience: float
    created_at: datetime
    
    class Config:
        from_attributes = True

class Choice(BaseModel):
    id: str
    text: str
    is_correct: bool = False
    impact: Optional[Dict[str, Any]] = None

class StoryRequest(BaseModel):
    hero_id: int
    hero_name: str
    hero_type: str
    target_language: str
    world: str
    current_scene: int
    mission_id: int
    topic: str = "Space"
    age: int = 7
    story_style: str = "Educational quest"
    learning_goal: str = "General Learning"

class StorySceneResponse(BaseModel):
    scene_id: int
    title: str
    narrative: str
    target_word: str
    translation: str
    image_prompt: str
    voice_prompt: Optional[str]
    choices: List[Choice]
    interactive_objects: Optional[List[Dict]] = None
    puzzle: Optional[Dict[str, Any]] = None

class StoryCreate(BaseModel):
    hero_id: int
    title: str
    content: str
    mission_id: int
    world: str

class StoryResponse(BaseModel):
    id: int
    hero_id: int
    title: str
    content: str
    image_url: Optional[str]
    voice_url: Optional[str]
    choices: Optional[Dict[str, Any]]
    interactive_objects: Optional[List[Dict]]
    current_scene: int
    is_complete: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

class LearningProfileResponse(BaseModel):
    id: int
    hero_id: int
    vocabulary_level: str
    reading_comprehension: float
    problem_solving: float
    creativity_score: float
    learning_style: str
    created_at: datetime
    
    class Config:
        from_attributes = True

class MissionResponse(BaseModel):
    id: int
    mission_number: int
    world: str
    title: str
    description: str
    difficulty: str
    learning_objectives: Optional[List[str]]
    rewards: Optional[Dict]
    
    class Config:
        from_attributes = True