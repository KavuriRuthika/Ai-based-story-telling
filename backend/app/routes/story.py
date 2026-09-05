from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, Dict, Any
import os
import html
import uuid

from app.services.llm_service import LLMService
from app.services.image_service import ImageService
from app.services.video_service import VideoService


router = APIRouter(
    prefix="/api",
    tags=["KathaQuest"]
)


llm_service = LLMService()
image_service = ImageService()
video_service = VideoService()


# Temporary in-memory story storage
storybook_store = {}


# ---------------------------------------------------------
# CONFIGURATION
# ---------------------------------------------------------

IMAGE_GENERATION_ENABLED = (
    os.getenv(
        "ENABLE_IMAGE_GENERATION",
        "False"
    ).lower() == "true"
)


# ---------------------------------------------------------
# REQUEST MODELS
# ---------------------------------------------------------

class StorybookRequest(BaseModel):

    hero_name: str
    age: int

    theme: str
    moral: str

    language: str = "English"
    art_style: str = "storybook"

    character_description: str = ""

    pages: int = 6


class RegeneratePageRequest(BaseModel):

    story: Dict[str, Any]

    page_number: int

    instruction: str = ""


class VideoRequest(BaseModel):

    image_url: Optional[str] = None

    prompt: str


# ---------------------------------------------------------
# FREE FALLBACK ILLUSTRATION
# ---------------------------------------------------------

def create_fallback_image(
    page: Dict[str, Any],
    hero_name: str
) -> str:
    """
    Creates a simple SVG illustration locally.

    No API.
    No billing.
    No external service.

    This is only a temporary fallback while
    AI image generation is disabled.
    """

    filename = (
        f"{uuid.uuid4().hex}.svg"
    )

    generated_dir = os.path.join(
        os.path.dirname(
            os.path.dirname(
                os.path.dirname(__file__)
            )
        ),
        "generated_images"
    )

    os.makedirs(
        generated_dir,
        exist_ok=True
    )

    title = html.escape(
        str(page.get("title", "Adventure"))
    )

    scene = html.escape(
        str(
            page.get(
                "scene_description",
                "A magical adventure"
            )
        )
    )

    hero = html.escape(
        hero_name
    )

    svg = f"""<svg
        xmlns="http://www.w3.org/2000/svg"
        width="1280"
        height="720"
        viewBox="0 0 1280 720">

        <defs>
            <linearGradient
                id="sky"
                x1="0"
                y1="0"
                x2="0"
                y2="1">

                <stop
                    offset="0%"
                    stop-color="#21144f"/>

                <stop
                    offset="100%"
                    stop-color="#6b4fb3"/>

            </linearGradient>

            <linearGradient
                id="ground"
                x1="0"
                y1="0"
                x2="0"
                y2="1">

                <stop
                    offset="0%"
                    stop-color="#285943"/>

                <stop
                    offset="100%"
                    stop-color="#123326"/>

            </linearGradient>
        </defs>

        <rect
            width="1280"
            height="720"
            fill="url(#sky)"/>

        <circle
            cx="1060"
            cy="130"
            r="65"
            fill="#fff3b0"
            opacity="0.9"/>

        <circle
            cx="180"
            cy="120"
            r="5"
            fill="white"/>

        <circle
            cx="260"
            cy="180"
            r="4"
            fill="white"/>

        <circle
            cx="390"
            cy="90"
            r="5"
            fill="white"/>

        <circle
            cx="900"
            cy="200"
            r="4"
            fill="white"/>

        <path
            d="M0 510
               Q180 420 350 500
               T700 490
               T1050 470
               T1280 500
               L1280 720
               L0 720 Z"
            fill="url(#ground)"/>

        <!-- Trees -->

        <g>
            <rect
                x="90"
                y="390"
                width="45"
                height="190"
                rx="15"
                fill="#5a3925"/>

            <circle
                cx="112"
                cy="350"
                r="95"
                fill="#2f8b57"/>

            <circle
                cx="60"
                cy="390"
                r="60"
                fill="#3ca968"/>

            <circle
                cx="165"
                cy="395"
                r="60"
                fill="#237448"/>
        </g>

        <g>
            <rect
                x="1110"
                y="390"
                width="45"
                height="190"
                rx="15"
                fill="#5a3925"/>

            <circle
                cx="1132"
                cy="350"
                r="95"
                fill="#2f8b57"/>

            <circle
                cx="1080"
                cy="390"
                r="60"
                fill="#3ca968"/>

            <circle
                cx="1185"
                cy="395"
                r="60"
                fill="#237448"/>
        </g>

        <!-- Hero -->

        <circle
            cx="640"
            cy="330"
            r="70"
            fill="#f3bd91"/>

        <path
            d="M570 325
               Q640 220 710 325
               Q690 270 640 255
               Q590 270 570 325"
            fill="#3a241c"/>

        <circle
            cx="615"
            cy="330"
            r="7"
            fill="#222"/>

        <circle
            cx="665"
            cy="330"
            r="7"
            fill="#222"/>

        <path
            d="M615 370
               Q640 390 665 370"
            fill="none"
            stroke="#7a3f3f"
            stroke-width="6"
            stroke-linecap="round"/>

        <rect
            x="570"
            y="400"
            width="140"
            height="150"
            rx="35"
            fill="#ffb84d"/>

        <rect
            x="590"
            y="540"
            width="40"
            height="90"
            rx="15"
            fill="#284c8c"/>

        <rect
            x="650"
            y="540"
            width="40"
            height="90"
            rx="15"
            fill="#284c8c"/>

        <!-- Magic stars -->

        <text
            x="470"
            y="280"
            font-size="42"
            fill="#ffe88a">
            ✦
        </text>

        <text
            x="800"
            y="300"
            font-size="36"
            fill="#ffe88a">
            ✧
        </text>

        <text
            x="850"
            y="420"
            font-size="30"
            fill="#fff3b0">
            ✦
        </text>

        <!-- Story title -->

        <rect
            x="270"
            y="35"
            width="740"
            height="95"
            rx="30"
            fill="#140c2d"
            opacity="0.82"/>

        <text
            x="640"
            y="95"
            text-anchor="middle"
            font-family="Arial"
            font-size="38"
            font-weight="bold"
            fill="white">
            {title}
        </text>

        <!-- Hero name -->

        <text
            x="640"
            y="660"
            text-anchor="middle"
            font-family="Arial"
            font-size="30"
            font-weight="bold"
            fill="white">
            {hero}
        </text>

        <!-- Small scene description -->

        <text
            x="640"
            y="700"
            text-anchor="middle"
            font-family="Arial"
            font-size="18"
            fill="#e5dcff">
            {scene[:120]}
        </text>

    </svg>
    """

    path = os.path.join(
        generated_dir,
        filename
    )

    with open(
        path,
        "w",
        encoding="utf-8"
    ) as file:

        file.write(svg)

    return (
        f"/generated-images/{filename}"
    )


# ---------------------------------------------------------
# GENERATE STORYBOOK
# ---------------------------------------------------------

@router.post("/storybook/generate")
def generate_storybook(
    request: StorybookRequest
):

    try:

        # -----------------------------------------
        # 1. Generate story using Gemini
        # -----------------------------------------

        story = llm_service.generate_storybook(
            hero_name=request.hero_name,
            age=request.age,
            theme=request.theme,
            moral=request.moral,
            language=request.language,
            art_style=request.art_style,
            character_description=request.character_description,
            pages=request.pages,
        )

        # -----------------------------------------
        # 2. Generate illustrations
        # -----------------------------------------

        for page in story.get("pages", []):

            if IMAGE_GENERATION_ENABLED:

                try:

                    image_url = (
                        image_service.generate_story_image(
                            page["image_prompt"],
                            use_real_world_grounding=True
                        )
                    )

                    page["image_url"] = image_url

                except Exception as image_error:

                    print(
                        "AI image generation failed:",
                        image_error
                    )

                    page["image_url"] = (
                        create_fallback_image(
                            page,
                            request.hero_name
                        )
                    )

            else:

                # Free local fallback
                page["image_url"] = (
                    create_fallback_image(
                        page,
                        request.hero_name
                    )
                )

        # -----------------------------------------
        # 3. Store story
        # -----------------------------------------

        story_id = str(
            len(storybook_store) + 1
        )

        story["story_id"] = story_id

        storybook_store[
            story_id
        ] = story

        return {
            "success": True,
            "story": story
        }

    except Exception as error:

        print(
            "Storybook generation error:",
            error
        )

        raise HTTPException(
            status_code=500,
            detail=str(error)
        )


# ---------------------------------------------------------
# REGENERATE PAGE
# ---------------------------------------------------------

@router.post("/storybook/regenerate-page")
def regenerate_page(
    request: RegeneratePageRequest
):

    try:

        new_page = (
            llm_service.regenerate_page(
                story=request.story,
                page_number=request.page_number,
                instruction=request.instruction,
            )
        )

        if IMAGE_GENERATION_ENABLED:

            try:

                image_url = (
                    image_service.generate_story_image(
                        new_page["image_prompt"],
                        use_real_world_grounding=True
                    )
                )

            except Exception as image_error:

                print(
                    "AI image regeneration failed:",
                    image_error
                )

                image_url = (
                    create_fallback_image(
                        new_page,
                        request.story.get(
                            "character",
                            {}
                        ).get(
                            "name",
                            "Hero"
                        )
                    )
                )

        else:

            image_url = (
                create_fallback_image(
                    new_page,
                    request.story.get(
                        "character",
                        {}
                    ).get(
                        "name",
                        "Hero"
                    )
                )
            )

        new_page["image_url"] = image_url

        return {
            "success": True,
            "page": new_page
        }

    except Exception as error:

        raise HTTPException(
            status_code=500,
            detail=str(error)
        )


# ---------------------------------------------------------
# VIDEO
# ---------------------------------------------------------

@router.post("/storybook/generate-video")
def generate_story_video(
    request: VideoRequest
):

    if not os.getenv(
        "ENABLE_VIDEO_GENERATION",
        "False"
    ).lower() == "true":

        raise HTTPException(
            status_code=503,
            detail=(
                "Video generation is disabled. "
                "Enable billing/API access before "
                "using Veo."
            )
        )

    try:

        video_url = (
            video_service.generate_video(
                prompt=request.prompt,
                image_path=request.image_url,
            )
        )

        return {
            "success": True,
            "video_url": video_url
        }

    except Exception as error:

        raise HTTPException(
            status_code=500,
            detail=str(error)
        )


# ---------------------------------------------------------
# GET STORYBOOK
# ---------------------------------------------------------

@router.get("/storybook/{story_id}")
def get_storybook(
    story_id: str
):

    story = storybook_store.get(
        story_id
    )

    if not story:

        raise HTTPException(
            status_code=404,
            detail="Storybook not found"
        )

    return {
        "success": True,
        "story": story
    }


# ---------------------------------------------------------
# LEARNING EVALUATION
# ---------------------------------------------------------

@router.post("/story/evaluate")
def evaluate_story(
    response_text: str,
    correct_answer: str,
):

    try:

        result = (
            llm_service.evaluate_child_response(
                response_text,
                correct_answer
            )
        )

        return result

    except Exception as error:

        raise HTTPException(
            status_code=500,
            detail=str(error)
        )


# ---------------------------------------------------------
# REWARD MESSAGE
# ---------------------------------------------------------

@router.post("/reward-message")
def reward_message(
    hero_name: str,
    achievement: str
):

    try:

        message = (
            llm_service.generate_reward_message(
                hero_name,
                achievement
            )
        )

        return {
            "message": message
        }

    except Exception as error:

        raise HTTPException(
            status_code=500,
            detail=str(error)
        )