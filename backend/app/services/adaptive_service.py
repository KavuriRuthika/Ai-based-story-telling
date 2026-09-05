"""Adaptive Service for personalized story generation"""
from typing import Dict, Any, Optional, List
import json

class AdaptiveService:
    
    def __init__(self):
        self.max_difficulty = 10
        self.min_difficulty = 1
    
    def adapt_story_to_child(
        self,
        base_story: Dict[str, Any],
        learning_profile: Dict[str, Any],
        mission_progress: Dict[str, Any],
        previous_performance: float
    ) -> Dict[str, Any]:
        """Adapt story content based on child's learning profile and performance"""
        
        adapted_story = base_story.copy()
        
        # Adapt narrative complexity
        adapted_story["narrative"] = self._adapt_narrative(
            base_story["narrative"],
            learning_profile.get("vocabulary_level"),
            learning_profile.get("reading_comprehension", 50)
        )
        
        # Adapt choices
        adapted_story["choices"] = self._adapt_choices(
            base_story.get("choices", []),
            learning_profile.get("vocabulary_level"),
            previous_performance
        )
        
        # Adapt puzzle
        if "puzzle" in base_story:
            adapted_story["puzzle"] = self._adapt_puzzle(
                base_story["puzzle"],
                learning_profile.get("problem_solving", 50),
                mission_progress.get("puzzles_solved", 0)
            )
        
        # Adapt interactive elements
        if "interactive_objects" in base_story:
            adapted_story["interactive_objects"] = self._adapt_interactive_objects(
                base_story["interactive_objects"],
                learning_profile.get("learning_style"),
                mission_progress.get("interaction_style")
            )
        
        # Add adaptive hints
        adapted_story["adaptive_hint"] = self._generate_adaptive_hint(
            base_story,
            learning_profile,
            previous_performance
        )
        
        return adapted_story
    
    def _adapt_narrative(
        self,
        narrative: str,
        vocabulary_level: str,
        comprehension_score: float
    ) -> str:
        """Adapt narrative based on vocabulary level and comprehension"""
        
        # This is a simplified version - in production, use NLP
        # For now, return as-is with metadata
        
        adaptations = {
            "beginner": "shorter sentences, simpler words, more descriptive",
            "intermediate": "balanced complexity, some advanced words, varied sentence structure",
            "advanced": "complex sentences, rich vocabulary, subtle descriptions"
        }
        
        # In real implementation, would modify the actual narrative
        return narrative
    
    def _adapt_choices(
        self,
        choices: List[Dict[str, Any]],
        vocabulary_level: str,
        performance_score: float
    ) -> List[Dict[str, Any]]:
        """Adapt choice options based on performance"""
        
        adapted_choices = []
        
        for choice in choices:
            adapted_choice = choice.copy()
            
            # Make choices simpler for beginners
            if vocabulary_level == "beginner" and len(adapted_choice.get("text", "")) > 50:
                adapted_choice["text"] = adapted_choice["text"][:50] + "..."
            
            # Adjust hint visibility based on performance
            if performance_score < 50:
                adapted_choice["hint_available"] = True
            
            adapted_choices.append(adapted_choice)
        
        # For low performance, may simplify number of choices
        if performance_score < 30 and len(adapted_choices) > 2:
            adapted_choices = adapted_choices[:2]
        
        return adapted_choices
    
    def _adapt_puzzle(
        self,
        puzzle: Dict[str, Any],
        problem_solving_score: float,
        puzzles_solved: int
    ) -> Dict[str, Any]:
        """Adapt puzzle difficulty"""
        
        adapted_puzzle = puzzle.copy()
        
        # Determine difficulty level
        difficulty = self._calculate_difficulty(problem_solving_score, puzzles_solved)
        adapted_puzzle["difficulty"] = difficulty
        
        # Add hints if struggling
        if problem_solving_score < 40:
            adapted_puzzle["show_hint"] = True
            adapted_puzzle["hint_text"] = self._generate_puzzle_hint(puzzle)
        
        # Adjust number of wrong options based on performance
        if "options" in adapted_puzzle:
            options_count = len(adapted_puzzle["options"])
            
            if problem_solving_score < 30:
                adapted_puzzle["options"] = adapted_puzzle["options"][:2]
            elif problem_solving_score < 60 and options_count > 4:
                adapted_puzzle["options"] = adapted_puzzle["options"][:3]
        
        return adapted_puzzle
    
    def _adapt_interactive_objects(
        self,
        objects: List[Dict[str, Any]],
        learning_style: str,
        interaction_style: Optional[str]
    ) -> List[Dict[str, Any]]:
        """Adapt interactive objects based on learning style"""
        
        adapted_objects = []
        
        learning_style_objects = {
            "visual": ["tap", "observe", "examine"],
            "audio": ["listen", "speak", "hear"],
            "kinesthetic": ["tap", "drag", "shake"],
            "reading/writing": ["read", "write", "type"]
        }
        
        preferred_types = learning_style_objects.get(learning_style, ["tap"])
        
        for obj in objects:
            obj_type = obj.get("type", "tap")
            if obj_type in preferred_types or not interaction_style:
                adapted_objects.append(obj)
        
        # If no matching objects, return all
        if not adapted_objects:
            adapted_objects = objects
        
        return adapted_objects
    
    def _calculate_difficulty(self, problem_solving_score: float, puzzles_solved: int) -> int:
        """Calculate adaptive difficulty level"""
        
        base_difficulty = 5  # Start at medium
        
        # Adjust based on problem solving score
        if problem_solving_score > 80:
            base_difficulty += 3
        elif problem_solving_score > 60:
            base_difficulty += 1
        elif problem_solving_score < 40:
            base_difficulty = max(1, base_difficulty - 2)
        
        # Increase with more puzzles solved
        base_difficulty += min(puzzles_solved // 5, 2)
        
        return min(base_difficulty, self.max_difficulty)
    
    def _generate_puzzle_hint(self, puzzle: Dict[str, Any]) -> str:
        """Generate a hint for the puzzle"""
        
        puzzle_type = puzzle.get("type", "unknown")
        
        hints = {
            "word_match": "Look at the letters carefully and match them with similar words.",
            "sequence": "Try to find the pattern in the sequence.",
            "riddle": "Think about what the words mean in real life.",
            "logic": "Look for patterns or connections between items."
        }
        
        return hints.get(puzzle_type, "Take your time and think about this carefully!")
    
    def _generate_adaptive_hint(
        self,
        story: Dict[str, Any],
        learning_profile: Dict[str, Any],
        performance_score: float
    ) -> Optional[str]:
        """Generate an adaptive hint based on context"""
        
        if performance_score > 70:
            return None  # No hint needed
        
        if performance_score < 40:
            hint_level = "detailed"
        else:
            hint_level = "subtle"
        
        # Generate hint based on learning style
        learning_style = learning_profile.get("learning_style", "visual")
        
        if learning_style == "visual":
            return "Pay close attention to the pictures and descriptions."
        elif learning_style == "audio":
            return "Listen carefully to what the characters are saying."
        elif learning_style == "kinesthetic":
            return "Try tapping on different objects to discover new things."
        else:
            return "Read through the story carefully and pay attention to details."
    
    def should_advance_difficulty(
        self,
        performance_history: List[float],
        window_size: int = 5
    ) -> bool:
        """Determine if child should advance to harder content"""
        
        if len(performance_history) < window_size:
            return False
        
        recent_scores = performance_history[-window_size:]
        avg_score = sum(recent_scores) / len(recent_scores)
        
        # Advance if consistently scoring above 75%
        return avg_score > 75
    
    def should_decrease_difficulty(
        self,
        performance_history: List[float],
        window_size: int = 5
    ) -> bool:
        """Determine if child needs easier content"""
        
        if len(performance_history) < 3:
            return False
        
        recent_scores = performance_history[-window_size:]
        avg_score = sum(recent_scores) / len(recent_scores)
        
        # Decrease if consistently scoring below 40%
        return avg_score < 40
    
    def get_next_recommended_mission(
        self,
        completed_missions: List[int],
        learning_profile: Dict[str, Any],
        available_missions: List[Dict[str, Any]]
    ) -> Optional[Dict[str, Any]]:
        """Recommend the next mission based on learning profile"""
        
        vocabulary_level = learning_profile.get("vocabulary_level", "intermediate")
        
        level_difficulty = {
            "beginner": ["easy", "medium"],
            "intermediate": ["medium", "hard"],
            "advanced": ["hard", "expert"]
        }
        
        suitable_difficulties = level_difficulty.get(vocabulary_level, ["medium"])
        
        # Find first uncompleted mission matching difficulty
        for mission in available_missions:
            if (mission["id"] not in completed_missions and 
                mission.get("difficulty") in suitable_difficulties):
                return mission
        
        # If none match, return first uncompleted mission
        for mission in available_missions:
            if mission["id"] not in completed_missions:
                return mission
        
        return None
