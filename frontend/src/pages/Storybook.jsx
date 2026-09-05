import {
  useEffect,
  useState
} from "react";

import {
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Volume2,
  VolumeX,
  Video,
  Download,
  Sparkles,
  Loader2
} from "lucide-react";

import {
  storybookAPI
} from "../services/api";

import "./Storybook.css";


export default function Storybook() {

  const [story, setStory] =
    useState(null);

  const [currentPage, setCurrentPage] =
    useState(0);

  const [loading, setLoading] =
    useState(true);

  const [regenerating, setRegenerating] =
    useState(false);

  const [generatingVideo, setGeneratingVideo] =
    useState(false);

  const [videoUrl, setVideoUrl] =
    useState(null);

  const [speaking, setSpeaking] =
    useState(false);


  useEffect(() => {

    const saved =
      sessionStorage.getItem(
        "kathaquest_story_request"
      );

    if (!saved) {

      setLoading(false);

      return;
    }

    const request =
      JSON.parse(saved);

    generateStory(request);

  }, []);


  async function generateStory(
    request
  ) {

    try {

      setLoading(true);

      const response =
        await storybookAPI.generate(
          request
        );

      setStory(
        response.data.story
      );

      setCurrentPage(0);

    } catch (error) {

      console.error(
        "Story generation error:",
        error
      );

      alert(
        error?.response?.data?.detail ||
        "Unable to generate story."
      );

    } finally {

      setLoading(false);
    }
  }


  const page =
    story?.pages?.[currentPage];


  function readAloud() {

    if (!page) return;

    window.speechSynthesis.cancel();

    const utterance =
      new SpeechSynthesisUtterance(
        page.text
      );

    utterance.lang =
      story.language === "Telugu"
        ? "te-IN"
        : story.language === "Hindi"
          ? "hi-IN"
          : "en-US";

    utterance.rate = 0.85;

    utterance.onstart = () =>
      setSpeaking(true);

    utterance.onend = () =>
      setSpeaking(false);

    utterance.onerror = () =>
      setSpeaking(false);

    window.speechSynthesis.speak(
      utterance
    );
  }


  function stopReading() {

    window.speechSynthesis.cancel();

    setSpeaking(false);
  }


  async function regeneratePage() {

    if (!story || !page) return;

    try {

      setRegenerating(true);

      const response =
        await storybookAPI.regeneratePage(
          story,
          page.page_number,
          "Create a fresh version of this scene while keeping the same hero appearance and story continuity."
        );

      const newPage =
        response.data.page;

      const updatedPages =
        [...story.pages];

      updatedPages[
        currentPage
      ] = newPage;

      setStory({
        ...story,
        pages: updatedPages
      });

      setVideoUrl(null);

    } catch (error) {

      console.error(error);

      alert(
        error?.response?.data?.detail ||
        "Page regeneration failed."
      );

    } finally {

      setRegenerating(false);
    }
  }


  async function generateVideo() {

    if (!page) return;

    try {

      setGeneratingVideo(true);

      setVideoUrl(null);

      const prompt = `
Create an 8-second cinematic children's
storybook scene.

Hero:
${story.character.description}

Scene:
${page.scene_description}

Animate the scene naturally.

Camera:
slow cinematic movement.

Style:
${story.art_style}.

Safe, cheerful and magical.
No text overlays.
No subtitles.
`;

      const response =
        await storybookAPI.generateVideo(
          prompt,
          page.image_url
        );

      setVideoUrl(
        response.data.video_url
      );

    } catch (error) {

      console.error(error);

      alert(
        error?.response?.data?.detail ||
        "Video generation failed."
      );

    } finally {

      setGeneratingVideo(false);
    }
  }


  function downloadBook() {

    window.print();
  }


  if (loading) {

    return (
      <div className="storybook-loading">

        <div className="magic-loader">
          <Sparkles size={38} />
        </div>

        <h2>
          Creating your magical story...
        </h2>

        <p>
          Gemini is writing your adventure
          and creating the illustrations.
        </p>

      </div>
    );
  }


  if (!story || !page) {

    return (
      <div className="storybook-empty">

        <h2>
          No story found
        </h2>

        <p>
          Please create a story first.
        </p>

      </div>
    );
  }


  return (

    <div className="storybook-page">

      <header className="storybook-header">

        <div>

          <span className="storybook-brand">
            ✨ KathaQuest
          </span>

          <h1>
            {story.title}
          </h1>

          <p>
            {story.subtitle}
          </p>

        </div>

        <button
          className="download-button"
          onClick={downloadBook}
        >
          <Download size={18} />
          Save Story
        </button>

      </header>


      <main className="storybook-container">

        <div className="page-counter">

          Page {currentPage + 1}
          {" "}
          of
          {" "}
          {story.pages.length}

        </div>


        <section className="storybook-card">


          <div className="story-image-container">

            {videoUrl ? (

              <video
                className="story-video"
                src={
                  `http://localhost:8000${videoUrl}`
                }
                controls
                autoPlay
                loop
              />

            ) : (

              page.image_url ? (

                <img
                  src={
                    `http://localhost:8000${page.image_url}`
                  }
                  alt={page.title}
                  className="story-image"
                />

              ) : (

                <div className="image-placeholder">

                  <Sparkles size={40} />

                  <span>
                    Generating illustration...
                  </span>

                </div>

              )

            )}

          </div>


          <div className="story-content">

            <span className="page-label">
              CHAPTER {page.page_number}
            </span>

            <h2>
              {page.title}
            </h2>

            <p className="story-text">
              {page.text}
            </p>


            <div className="story-actions">

              <button
                onClick={
                  speaking
                    ? stopReading
                    : readAloud
                }
                className="action-button"
              >

                {speaking ? (
                  <VolumeX size={18} />
                ) : (
                  <Volume2 size={18} />
                )}

                {speaking
                  ? "Stop"
                  : "Read Aloud"}

              </button>


              <button
                onClick={regeneratePage}
                disabled={regenerating}
                className="action-button"
              >

                {regenerating ? (
                  <Loader2
                    size={18}
                    className="spin"
                  />
                ) : (
                  <RefreshCw size={18} />
                )}

                Regenerate Page

              </button>


              <button
                onClick={generateVideo}
                disabled={generatingVideo}
                className="video-button"
              >

                {generatingVideo ? (
                  <Loader2
                    size={18}
                    className="spin"
                  />
                ) : (
                  <Video size={18} />
                )}

                {generatingVideo
                  ? "Creating Video..."
                  : "Bring Scene to Life"}

              </button>

            </div>


            {page.learning && (

              <div className="learning-card">

                <div className="learning-icon">
                  🧠
                </div>

                <div>

                  <span>
                    LEARN
                  </span>

                  <strong>
                    {page.learning.topic}
                  </strong>

                  <p>
                    {page.learning.question}
                  </p>

                </div>

              </div>

            )}


            {page.choices?.length > 0 && (

              <div className="choices">

                <h3>
                  What should {story.character.name} do?
                </h3>

                {page.choices.map(
                  (choice) => (

                    <button
                      key={choice.id}
                      onClick={() => {

                        if (
                          currentPage <
                          story.pages.length - 1
                        ) {

                          setCurrentPage(
                            currentPage + 1
                          );

                          setVideoUrl(null);
                        }

                      }}
                      className="choice-button"
                    >
                      {choice.text}
                    </button>

                  )
                )}

              </div>

            )}

          </div>

        </section>


        <div className="page-navigation">

          <button
            disabled={currentPage === 0}
            onClick={() => {

              setCurrentPage(
                currentPage - 1
              );

              setVideoUrl(null);

            }}
          >
            <ChevronLeft size={22} />
            Previous
          </button>


          <div className="page-dots">

            {story.pages.map(
              (_, index) => (

                <button
                  key={index}
                  className={
                    index === currentPage
                      ? "active"
                      : ""
                  }
                  onClick={() => {

                    setCurrentPage(index);

                    setVideoUrl(null);

                  }}
                />

              )
            )}

          </div>


          <button
            disabled={
              currentPage ===
              story.pages.length - 1
            }
            onClick={() => {

              setCurrentPage(
                currentPage + 1
              );

              setVideoUrl(null);

            }}
          >
            Next
            <ChevronRight size={22} />
          </button>

        </div>

      </main>

    </div>
  );
}