from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

import os

from dotenv import load_dotenv

load_dotenv()

from app.routes import story


app = FastAPI(
    title="KathaQuest AI Engine",
    description="AI-powered children's storybook creator",
    version="2.0.0"
)


origins = os.getenv(
    "CORS_ORIGINS",
    "http://localhost:5173,http://localhost:5174"
).split(",")


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Generated media folders
os.makedirs(
    "generated_images",
    exist_ok=True
)

os.makedirs(
    "generated_videos",
    exist_ok=True
)


app.mount(
    "/generated-images",
    StaticFiles(directory="generated_images"),
    name="generated-images"
)

app.mount(
    "/generated-videos",
    StaticFiles(directory="generated_videos"),
    name="generated-videos"
)


app.include_router(
    story.router
)


@app.get("/")
def root():

    return {
        "status": "KathaQuest AI Engine Online",
        "version": "2.0.0",
        "features": [
            "Gemini Story Generation",
            "AI Image Generation",
            "Veo Video Generation",
            "Adaptive Learning",
            "Text To Speech"
        ]
    }


@app.get("/health")
def health():

    return {
        "status": "healthy"
    }