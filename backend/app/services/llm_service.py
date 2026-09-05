import os
import json
from typing import Any, Dict, List, Optional

from dotenv import load_dotenv
from google import genai

load_dotenv()


class LLMService:
    """
    Gemini-powered story generation service for KathaQuest.
    """

    def __init__(self):
        api_key = os.getenv("GEMINI_API_KEY")

        if not api_key:
            raise RuntimeError(
                "GEMINI_API_KEY is missing from backend/.env"
            )

        self.client = genai.Client(api_key=api_key)

        self.model = os.getenv(
            "GEMINI_TEXT_MODEL",
            "gemini-3.6-flash"
        )

    def _clean_json(self, text: str) -> Dict[str, Any]:
        """
        Safely convert Gemini JSON response into Python dict.
        """

        text = text.strip()

        if text.startswith("```json"):
            text = text[7:]

        if text.startswith("```"):
            text = text[3:]

        if text.endswith("```"):
            text = text[:-3]

        text = text.strip()

        try:
            return json.loads(text)
        except json.JSONDecodeError:
            start = text.find("{")
            end = text.rfind("}")

            if start >= 0 and end >= 0:
                return json.loads(text[start:end + 1])

            raise ValueError(
                "Gemini did not return valid JSON."
            )

    def generate_storybook(
        self,
        hero_name: str,
        age: int,
        theme: str,
        moral: str,
        language: str = "English",
        art_style: str = "storybook",
        character_description: str = "",
        pages: int = 6,
    ) -> Dict[str, Any]:

        pages = max(5, min(pages, 8))

        prompt = f"""
You are KathaQuest Story Engine.

Create a beautiful personalized children's storybook.

IMPORTANT:
- The child is the hero.
- The story must be safe for children.
- Use simple language appropriate for the child's age.
- Create exactly {pages} pages.
- Every page must move the story forward.
- The moral lesson must naturally appear in the story.
- Give every page an image prompt.
- Keep the main character visually consistent.
- Do not include violence, horror, death, or frightening content.
- Do not put text inside generated images.
- Return ONLY JSON.

CHILD INFORMATION

Hero name:
{hero_name}

Age:
{age}

Theme:
{theme}

Moral lesson:
{moral}

Language:
{language}

Art style:
{art_style}

Character description:
{character_description}

Return exactly this structure:

{{
  "title": "Story title",
  "subtitle": "Short subtitle",
  "moral": "{moral}",
  "language": "{language}",
  "art_style": "{art_style}",

  "character": {{
    "name": "{hero_name}",
    "description": "Detailed visual description of the hero"
  }},

  "pages": [
    {{
      "page_number": 1,
      "title": "Page title",
      "text": "Child-friendly story text",
      "scene_description": "What is happening visually",
      "image_prompt": "Detailed image generation prompt",
      "learning": {{
        "topic": "Learning topic",
        "question": "Simple question",
        "answer": "Correct answer"
      }},
      "choices": [
        {{
          "id": "choice_1",
          "text": "Choice one",
          "consequence": "What happens"
        }},
        {{
          "id": "choice_2",
          "text": "Choice two",
          "consequence": "What happens"
        }},
        {{
          "id": "choice_3",
          "text": "Choice three",
          "consequence": "What happens"
        }}
      ]
    }}
  ]
}}

For image_prompt, always include:

- hero appearance
- clothing
- hair
- approximate age
- environment
- lighting
- camera angle
- art style
- emotional expression
- important objects

The hero appearance must remain consistent across every page.

Do not include markdown.
Do not include explanations outside JSON.
"""

        response = self.client.models.generate_content(
            model=self.model,
            contents=prompt,
        )

        data = self._clean_json(
            response.text
        )

        if "pages" not in data:
            raise ValueError(
                "Gemini response does not contain pages."
            )

        if len(data["pages"]) < 5:
            raise ValueError(
                "Gemini generated fewer than 5 pages."
            )

        data["pages"] = data["pages"][:pages]

        return data

    def regenerate_page(
        self,
        story: Dict[str, Any],
        page_number: int,
        instruction: str = "",
    ) -> Dict[str, Any]:

        pages = story.get("pages", [])

        current_page = None

        for page in pages:
            if page.get("page_number") == page_number:
                current_page = page
                break

        if current_page is None:
            raise ValueError(
                f"Page {page_number} not found."
            )

        character = story.get(
            "character",
            {}
        )

        prompt = f"""
You are regenerating ONE page of a children's storybook.

Do not regenerate the entire book.

Story title:
{story.get("title", "")}

Moral:
{story.get("moral", "")}

Hero:
{character.get("name", "")}

Hero description:
{character.get("description", "")}

Page number:
{page_number}

Current page:
{json.dumps(current_page, ensure_ascii=False)}

User instruction:
{instruction or "Create a fresh and exciting version of this page."}

Return ONLY JSON:

{{
  "page_number": {page_number},
  "title": "New page title",
  "text": "New child-friendly story text",
  "scene_description": "New visual scene",
  "image_prompt": "Detailed image prompt maintaining EXACT hero appearance",
  "learning": {{
    "topic": "Learning topic",
    "question": "Question",
    "answer": "Answer"
  }},
  "choices": [
    {{
      "id": "choice_1",
      "text": "Choice one",
      "consequence": "Consequence"
    }},
    {{
      "id": "choice_2",
      "text": "Choice two",
      "consequence": "Consequence"
    }},
    {{
      "id": "choice_3",
      "text": "Choice three",
      "consequence": "Consequence"
    }}
  ]
}}
"""

        response = self.client.models.generate_content(
            model=self.model,
            contents=prompt,
        )

        return self._clean_json(
            response.text
        )

    def evaluate_child_response(
        self,
        response_text: str,
        correct_answer: str,
        context: Optional[Dict[str, Any]] = None,
    ) -> Dict[str, Any]:

        prompt = f"""
Evaluate this child's answer.

Child answer:
{response_text}

Expected answer:
{correct_answer}

Return ONLY JSON:

{{
  "correct": true,
  "learning_score": 90,
  "feedback": "Positive child-friendly feedback",
  "encouragement": "Short encouragement"
}}
"""

        response = self.client.models.generate_content(
            model=self.model,
            contents=prompt,
        )

        return self._clean_json(
            response.text
        )

    def generate_reward_message(
        self,
        hero_name: str,
        achievement: str,
    ) -> str:

        prompt = f"""
Create a short exciting reward message for a child.

Hero:
{hero_name}

Achievement:
{achievement}

Maximum 2 sentences.
Use simple English.
"""

        response = self.client.models.generate_content(
            model=self.model,
            contents=prompt,
        )

        return response.text.strip()

    # Compatibility method for your existing routes
    def generate_story_scene(
        self,
        hero_name: str,
        hero_type: str,
        world: str,
        mission_id: int,
        scene_number: int,
        language: str,
        learning_profile: Dict[str, Any],
        topic: str,
        age: int,
        story_style: str,
        learning_goal: str,
    ) -> Dict[str, Any]:

        book = self.generate_storybook(
            hero_name=hero_name,
            age=age,
            theme=topic or world,
            moral=learning_goal or "Kindness",
            language=language,
            art_style=story_style,
            pages=6,
        )

        index = max(
            0,
            min(
                scene_number - 1,
                len(book["pages"]) - 1
            )
        )

        page = book["pages"][index]

        return {
            "scene_id": page["page_number"],
            "title": page["title"],
            "narrative": page["text"],
            "target_word": page.get(
                "learning",
                {}
            ).get("topic", ""),
            "translation": "",
            "image_prompt": page["image_prompt"],
            "voice_prompt": page["text"],
            "choices": page.get("choices", []),
            "interactive_objects": [],
            "puzzle": page.get("learning"),
        }