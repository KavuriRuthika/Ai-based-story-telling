"""Speech-to-Text Service"""
import openai
import os
from typing import Optional

class STTService:
    def __init__(self):
        self.client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        self.model = "whisper-1"
    
    def transcribe_audio(
        self,
        audio_file_path: str,
        language: Optional[str] = None
    ) -> Optional[str]:
        """Transcribe audio file to text"""
        
        try:
            with open(audio_file_path, "rb") as audio_file:
                transcript = self.client.audio.transcriptions.create(
                    model=self.model,
                    file=audio_file,
                    language=language
                )
                return transcript.text
        except Exception as e:
            print(f"Error transcribing audio: {e}")
            return None
    
    def transcribe_and_analyze(
        self,
        audio_file_path: str,
        language: Optional[str] = None
    ) -> dict:
        """Transcribe audio and return analysis"""
        
        text = self.transcribe_audio(audio_file_path, language)
        
        if not text:
            return {
                "text": "",
                "confidence": 0,
                "language": language,
                "error": "Transcription failed"
            }
        
        return {
            "text": text,
            "confidence": 0.95,  # Whisper API doesn't return confidence
            "language": language,
            "word_count": len(text.split()),
            "character_count": len(text)
        }
    
    def process_voice_answer(
        self,
        audio_file_path: str,
        expected_answer: str,
        language: str = "en"
    ) -> dict:
        """Process a voice answer and check if it matches"""
        
        transcription = self.transcribe_audio(audio_file_path, language)
        
        if not transcription:
            return {
                "success": False,
                "transcribed_text": "",
                "matches": False,
                "error": "Could not transcribe audio"
            }
        
        # Simple matching (can be improved with NLP)
        matches = transcription.lower().strip() == expected_answer.lower().strip()
        
        return {
            "success": True,
            "transcribed_text": transcription,
            "matches": matches,
            "similarity_score": self._calculate_similarity(transcription, expected_answer)
        }
    
    def _calculate_similarity(self, text1: str, text2: str) -> float:
        """Calculate similarity between two texts (simple implementation)"""
        
        words1 = set(text1.lower().split())
        words2 = set(text2.lower().split())
        
        if not words2:
            return 0.0
        
        intersection = len(words1.intersection(words2))
        similarity = intersection / len(words2)
        
        return min(similarity, 1.0)
