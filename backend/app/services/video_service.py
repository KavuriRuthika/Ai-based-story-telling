import os
import time
import uuid

from dotenv import load_dotenv
from google import genai

load_dotenv()


class VideoService:

    def __init__(self):

        api_key = os.getenv("GEMINI_API_KEY")

        if not api_key:
            raise RuntimeError(
                "GEMINI_API_KEY is missing."
            )

        self.client = genai.Client(
            api_key=api_key
        )

        self.model = os.getenv(
            "GEMINI_VIDEO_MODEL",
            "veo-3.1-generate-preview"
        )

        self.output_dir = os.path.join(
            os.path.dirname(
                os.path.dirname(
                    os.path.dirname(__file__)
                )
            ),
            "generated_videos"
        )

        os.makedirs(
            self.output_dir,
            exist_ok=True
        )

    def generate_video(
        self,
        prompt: str,
        image_path: str = None,
    ) -> str:

        image = None

        if image_path:

            if image_path.startswith("/"):
                image_path = image_path[1:]

            absolute_path = os.path.join(
                os.path.dirname(
                    os.path.dirname(
                        os.path.dirname(__file__)
                    )
                ),
                image_path
            )

            if os.path.exists(absolute_path):

                image = self.client.files.upload(
                    file=absolute_path
                )

        if image:

            operation = self.client.models.generate_videos(
                model=self.model,
                prompt=prompt,
                image=image,
            )

        else:

            operation = self.client.models.generate_videos(
                model=self.model,
                prompt=prompt,
            )

        # Veo is asynchronous.
        while not operation.done:

            print(
                "Waiting for Veo video generation..."
            )

            time.sleep(10)

            operation = self.client.operations.get(
                operation
            )

        if not operation.response:

            raise RuntimeError(
                "Veo did not return a response."
            )

        generated_videos = (
            operation.response.generated_videos
        )

        if not generated_videos:

            raise RuntimeError(
                "Veo did not generate a video."
            )

        generated_video = generated_videos[0]

        filename = (
            f"{uuid.uuid4().hex}.mp4"
        )

        path = os.path.join(
            self.output_dir,
            filename
        )

        self.client.files.download(
            file=generated_video.video,
            destination=path,
        )

        return (
            f"/generated-videos/{filename}"
        )