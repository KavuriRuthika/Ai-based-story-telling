import os
import base64
import uuid

from dotenv import load_dotenv
from google import genai
from google.genai import types

load_dotenv()


class ImageService:
    """
    Gemini-powered image generation service for KathaQuest.
    """

    def __init__(self):

        api_key = os.getenv("GEMINI_API_KEY")

        if not api_key:
            raise RuntimeError(
                "GEMINI_API_KEY is missing from backend/.env"
            )

        self.client = genai.Client(
            api_key=api_key
        )

        self.model = os.getenv(
            "GEMINI_IMAGE_MODEL",
            "gemini-3.1-flash-image"
        )

        self.output_dir = os.path.join(
            os.path.dirname(
                os.path.dirname(
                    os.path.dirname(__file__)
                )
            ),
            "generated_images"
        )

        os.makedirs(
            self.output_dir,
            exist_ok=True
        )

    def _save_image(self, response) -> str:

        for part in response.parts:

            if part.inline_data is not None:

                image = part.as_image()

                filename = (
                    f"{uuid.uuid4().hex}.png"
                )

                path = os.path.join(
                    self.output_dir,
                    filename
                )

                image.save(path)

                print(
                    f"Image generated successfully: {path}"
                )

                return (
                    f"/generated-images/{filename}"
                )

        raise RuntimeError(
            "Gemini did not return an image."
        )

    def generate_story_image(
        self,
        prompt: str,
        use_real_world_grounding: bool = True,
    ) -> str:

        print(
            "Generating Gemini image..."
        )

        print(
            f"Image model: {self.model}"
        )

        if use_real_world_grounding:

            config = types.GenerateContentConfig(
                response_modalities=["IMAGE"],
                response_format={
                    "image": {
                        "aspect_ratio": "16:9",
                        "image_size": "1K",
                    }
                },
                tools=[
                    types.Tool(
                        google_search=types.GoogleSearch(
                            search_types=types.SearchTypes(
                                web_search=types.WebSearch(),
                                image_search=types.ImageSearch(),
                            )
                        )
                    )
                ],
            )

        else:

            config = types.GenerateContentConfig(
                response_modalities=["IMAGE"],
                response_format={
                    "image": {
                        "aspect_ratio": "16:9",
                        "image_size": "1K",
                    }
                },
            )

        response = self.client.models.generate_content(
            model=self.model,
            contents=prompt,
            config=config,
        )

        return self._save_image(response)

    def generate_character_avatar(
        self,
        name: str,
        character_type: str,
    ) -> str:

        prompt = f"""
Create a friendly children's storybook character portrait.

Character name:
{name}

Character type:
{character_type}

Visual requirements:
- cheerful
- colorful
- friendly
- child-safe
- storybook quality
- expressive face
- clean composition
- no text
- no letters
- no logos
- no watermark

Create a polished 3D children's storybook illustration.
"""

        return self.generate_story_image(
            prompt,
            use_real_world_grounding=False
        )