"""Learning Service for tracking educational progress"""
from typing import Dict, Any, Optional, List

class LearningService:
    
    def __init__(self):
        self.learning_levels = ["beginner", "intermediate", "advanced"]
        self.learning_styles = ["visual", "audio", "kinesthetic", "reading/writing"]
    
    def calculate_learning_profile(
        self,
        quiz_results: List[Dict[str, Any]],
        interaction_patterns: Dict[str, Any],
        age: int
    ) -> Dict[str, Any]:
        """Calculate learning profile based on quiz results and interactions"""
        
        # Calculate vocabulary level
        vocabulary_level = self._determine_vocabulary_level(quiz_results, age)
        
        # Calculate comprehension
        reading_comprehension = self._calculate_reading_comprehension(quiz_results)
        
        # Calculate problem solving
        problem_solving = self._calculate_problem_solving(quiz_results)
        
        # Calculate creativity
        creativity_score = self._calculate_creativity(interaction_patterns)
        
        # Determine learning style
        learning_style = self._determine_learning_style(interaction_patterns)
        
        return {
            "vocabulary_level": vocabulary_level,
            "reading_comprehension": reading_comprehension,
            "problem_solving": problem_solving,
            "creativity_score": creativity_score,
            "learning_style": learning_style,
            "adaptation_notes": self._generate_adaptation_notes(
                vocabulary_level, learning_style, creativity_score
            )
        }
    
    def _determine_vocabulary_level(self, quiz_results: List[Dict], age: int) -> str:
        """Determine vocabulary level based on quiz performance and age"""
        
        if not quiz_results:
            # Default based on age
            if age < 6:
                return "beginner"
            elif age < 9:
                return "intermediate"
            else:
                return "advanced"
        
        avg_score = sum(r.get("score", 0) for r in quiz_results) / len(quiz_results)
        
        if avg_score < 50:
            return "beginner"
        elif avg_score < 75:
            return "intermediate"
        else:
            return "advanced"
    
    def _calculate_reading_comprehension(self, quiz_results: List[Dict]) -> float:
        """Calculate reading comprehension score (0-100)"""
        
        if not quiz_results:
            return 50.0
        
        comprehension_scores = [
            r.get("score", 0) for r in quiz_results 
            if r.get("type") == "comprehension"
        ]
        
        if comprehension_scores:
            return sum(comprehension_scores) / len(comprehension_scores)
        
        return 50.0
    
    def _calculate_problem_solving(self, quiz_results: List[Dict]) -> float:
        """Calculate problem solving score (0-100)"""
        
        if not quiz_results:
            return 50.0
        
        problem_scores = [
            r.get("score", 0) for r in quiz_results 
            if r.get("type") in ["puzzle", "logic", "riddle"]
        ]
        
        if problem_scores:
            return sum(problem_scores) / len(problem_scores)
        
        return 50.0
    
    def _calculate_creativity(self, interaction_patterns: Dict[str, Any]) -> float:
        """Calculate creativity score (0-100)"""
        
        # Factors: unique choices, puzzle solving time, interaction diversity
        base_score = 50.0
        
        if interaction_patterns.get("unique_choice_count", 0) > 5:
            base_score += 15
        
        if interaction_patterns.get("puzzle_solving_time", 0) > 60:  # Takes time to think
            base_score += 10
        
        if interaction_patterns.get("interaction_diversity", 0) > 0.7:
            base_score += 15
        
        return min(base_score, 100.0)
    
    def _determine_learning_style(self, interaction_patterns: Dict[str, Any]) -> str:
        """Determine primary learning style"""
        
        style_scores = {
            "visual": interaction_patterns.get("visual_interactions", 0),
            "audio": interaction_patterns.get("audio_interactions", 0),
            "kinesthetic": interaction_patterns.get("kinesthetic_interactions", 0),
            "reading/writing": interaction_patterns.get("reading_interactions", 0)
        }
        
        if not any(style_scores.values()):
            return "visual"
        
        return max(style_scores, key=style_scores.get)
    
    def _generate_adaptation_notes(
        self,
        vocabulary_level: str,
        learning_style: str,
        creativity_score: float
    ) -> Dict[str, Any]:
        """Generate adaptation notes for personalizing content"""
        
        notes = {
            "vocabulary_recommendations": self._get_vocabulary_recommendations(vocabulary_level),
            "content_style": self._get_content_style(learning_style),
            "pacing": self._get_pacing(creativity_score),
            "puzzle_difficulty": self._get_puzzle_difficulty(vocabulary_level, creativity_score),
            "voice_speed": self._get_voice_speed(creativity_score)
        }
        
        return notes
    
    def _get_vocabulary_recommendations(self, level: str) -> str:
        """Get vocabulary recommendations"""
        
        recommendations = {
            "beginner": "Use simple words, short sentences, concrete concepts",
            "intermediate": "Mix simple and complex words, introduce abstract concepts gradually",
            "advanced": "Use rich vocabulary, complex sentence structures, abstract ideas"
        }
        
        return recommendations.get(level, "Adaptive vocabulary")
    
    def _get_content_style(self, learning_style: str) -> str:
        """Get content style recommendations"""
        
        styles = {
            "visual": "Focus on detailed descriptions and rich imagery",
            "audio": "Emphasis on dialogue, character voices, sound effects",
            "kinesthetic": "Interactive elements, puzzles, hands-on activities",
            "reading/writing": "Narrative-focused, vocabulary building, writing prompts"
        }
        
        return styles.get(learning_style, "Balanced approach")
    
    def _get_pacing(self, creativity_score: float) -> str:
        """Get pacing recommendations"""
        
        if creativity_score > 75:
            return "Fast pacing with open-ended challenges"
        elif creativity_score > 50:
            return "Moderate pacing with guided exploration"
        else:
            return "Slower pacing with clear guidance"
    
    def _get_puzzle_difficulty(self, vocabulary_level: str, creativity_score: float) -> str:
        """Get puzzle difficulty recommendations"""
        
        if vocabulary_level == "beginner" or creativity_score < 40:
            return "Easy puzzles with hints"
        elif vocabulary_level == "intermediate" or creativity_score < 70:
            return "Medium puzzles with partial hints"
        else:
            return "Hard puzzles with minimal hints"
    
    def _get_voice_speed(self, creativity_score: float) -> float:
        """Get recommended voice speed (0.8-1.2)"""
        
        if creativity_score > 75:
            return 1.1  # Faster for advanced learners
        elif creativity_score > 40:
            return 1.0  # Normal speed
        else:
            return 0.9  # Slower for careful processing
    
    def update_learning_metrics(
        self,
        current_metrics: Dict[str, Any],
        quiz_score: float,
        time_spent: int,
        interaction_quality: float
    ) -> Dict[str, Any]:
        """Update learning metrics based on performance"""
        
        updated = current_metrics.copy()
        
        # Update reading comprehension
        current_rc = updated.get("reading_comprehension", 50)
        updated["reading_comprehension"] = (current_rc * 0.7 + quiz_score * 0.3)
        
        # Update problem solving (based on time spent - optimal is around 60-120 seconds)
        if 60 <= time_spent <= 120:
            interaction_quality = 100
        else:
            interaction_quality = max(0, 100 - abs(time_spent - 90) / 2)
        
        current_ps = updated.get("problem_solving", 50)
        updated["problem_solving"] = (current_ps * 0.7 + interaction_quality * 0.3)
        
        # Update creativity
        current_cs = updated.get("creativity_score", 50)
        updated["creativity_score"] = (current_cs * 0.8 + interaction_quality * 0.2)
        
        return updated
