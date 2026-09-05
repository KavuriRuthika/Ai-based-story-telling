"""Text-to-Speech Service"""
import openai
import os
from typing import Optional
import tempfile

class TTSService:
    def __init__(self):
        self.client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        self.model = "tts-1"
        self.voice_options = ["alloy", "echo", "fable", "onyx", "nova", "shimmer"]
    
    def generate_speech(
        self,
        text: str,
        voice: str = "nova",
        language: str = "en",
        speed: float = 1.0
    ) -> Optional[str]:
        """Generate speech from text"""
        
        if voice not in self.voice_options:
            voice = "nova"
        
        try:
            response = self.client.audio.speech.create(
                model=self.model,
                voice=voice,
                input=text,
                speed=speed
            )
            
            # Save to temporary file
            with tempfile.NamedTemporaryFile(delete=False, suffix=".mp3") as tmp_file:
                tmp_file.write(response.content)
                return tmp_file.name
            
        except Exception as e:
            print(f"Error generating speech: {e}")
            return None
    
    def get_voice_for_character(self, character_type: str) -> str:
        """Get appropriate voice for character type"""
        
        voice_mapping = {
            "wizard": "echo",
            "warrior": "onyx",
            "explorer": "nova",
            "healer": "shimmer",
            "scholar": "fable"
        }
        
        return voice_mapping.get(character_type.lower(), "nova")
    
    def generate_story_voice(
        self,
        narrative: str,
        character_voice: str = "nova",
        emotion: str = "neutral"
    ) -> Optional[str]:
        """Generate voice for story narrative"""
        
        # Adjust speed based on emotion
        speed_mapping = {
            "excited": 1.1,
            "calm": 0.9,
            "urgent": 1.2,
            "neutral": 1.0
        }
        
        speed = speed_mapping.get(emotion, 1.0)
        
        return self.generate_speech(narrative, voice=character_voice, speed=speed)
    
    def generate_multiple_character_voices(
        self,
        dialogues: list,
        character_voices: dict
    ) -> Optional[str]:
        """Generate voices for multiple characters in dialogue"""
        
        # This would require more complex audio processing
        # For now, we'll generate the main narrative
        combined_text = " ".join([d.get("text", "") for d in dialogues])
        return self.generate_speech(combined_text)
