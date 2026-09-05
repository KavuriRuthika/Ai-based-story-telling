import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  BookOpen,
  Wand2,
  Volume2,
  Image,
  Video,
  Heart,
  ArrowRight,
} from "lucide-react";

import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="kq-home">

      {/* =========================
          NAVBAR
      ========================== */}

      <nav className="kq-navbar">

        <div
          className="kq-logo"
          onClick={() => navigate("/")}
        >
          <div className="kq-logo-icon">
            ✨
          </div>

          <div>
            <div className="kq-logo-name">
              KathaQuest
            </div>

            <div className="kq-logo-tagline">
              Living Stories
            </div>
          </div>
        </div>


        <div className="kq-nav-actions">

          <button
            className="kq-nav-button"
            onClick={() => navigate("/create-story")}
          >
            Create Story
          </button>

          <button
            className="kq-nav-button primary"
            onClick={() => navigate("/create-story")}
          >
            <Sparkles size={17} />
            Start Adventure
          </button>

        </div>

      </nav>


      {/* =========================
          HERO SECTION
      ========================== */}

      <main className="kq-hero">

        <div className="kq-hero-content">

          <div className="kq-badge">
            <Sparkles size={16} />
            AI-POWERED STORYTELLING
          </div>


          <h1>
            Every Child
            <br />

            <span>
              Becomes the Hero.
            </span>
          </h1>


          <p className="kq-hero-description">
            Create personalized children's stories with
            AI-generated illustrations, interactive choices,
            narration, and magical adventures.
          </p>


          {/* MAIN CREATE STORY BUTTON */}

          <button
            className="kq-main-create-button"
            onClick={() => navigate("/create-story")}
          >

            <div className="kq-button-icon">
              <Wand2 size={24} />
            </div>

            <div className="kq-button-text">

              <strong>
                Create My Story
              </strong>

              <span>
                Turn an idea into a magical adventure
              </span>

            </div>

            <ArrowRight size={22} />

          </button>


          <div className="kq-small-note">
            No writing skills required • AI creates everything
          </div>

        </div>


        {/* =========================
            HERO VISUAL
        ========================== */}

        <div className="kq-hero-visual">

          <div className="kq-orbit orbit-one"></div>
          <div className="kq-orbit orbit-two"></div>
          <div className="kq-orbit orbit-three"></div>


          <div className="kq-magic-book">

            <div className="kq-book-glow"></div>

            <div className="kq-book-cover">

              <div className="kq-book-stars">
                ✦
              </div>

              <div className="kq-book-title">
                KathaQuest
              </div>

              <div className="kq-book-subtitle">
                Your Story
              </div>

              <div className="kq-book-character">
                🧒
              </div>

            </div>

          </div>


          <div className="floating-card card-one">

            <BookOpen size={19} />

            <div>
              <strong>
                AI Story
              </strong>

              <span>
                Personalized
              </span>
            </div>

          </div>


          <div className="floating-card card-two">

            <Image size={19} />

            <div>
              <strong>
                AI Images
              </strong>

              <span>
                Every page
              </span>
            </div>

          </div>


          <div className="floating-card card-three">

            <Video size={19} />

            <div>
              <strong>
                Living Scenes
              </strong>

              <span>
                Bring stories alive
              </span>
            </div>

          </div>


          <div className="floating-card card-four">

            <Volume2 size={19} />

            <div>
              <strong>
                Read Aloud
              </strong>

              <span>
                Listen & learn
              </span>
            </div>

          </div>

        </div>

      </main>


      {/* =========================
          FEATURES
      ========================== */}

      <section className="kq-features">

        <div className="kq-section-heading">

          <span>
            ✨ EVERYTHING IN ONE STORY
          </span>

          <h2>
            More than a storybook.
          </h2>

          <p>
            A personalized world where stories,
            learning and imagination come together.
          </p>

        </div>


        <div className="kq-feature-grid">

          <Feature
            icon={<Sparkles />}
            title="AI Story Generation"
            text="Gemini creates a unique story based on the child's name, age, theme and moral lesson."
          />

          <Feature
            icon={<Image />}
            title="AI Illustrations"
            text="Every page gets a beautiful visual designed around the story and character."
          />

          <Feature
            icon={<Video />}
            title="Living Scenes"
            text="Bring selected story scenes to life with AI-generated video."
          />

          <Feature
            icon={<Volume2 />}
            title="Read Aloud"
            text="Children can listen to their story using built-in narration."
          />

          <Feature
            icon={<Heart />}
            title="Personalized"
            text="The child becomes the main character and the adventure reflects their choices."
          />

          <Feature
            icon={<BookOpen />}
            title="Learn Through Stories"
            text="Learning concepts and moral lessons are naturally included inside the adventure."
          />

        </div>

      </section>


      {/* =========================
          CTA
      ========================== */}

      <section className="kq-bottom-cta">

        <div>

          <span>
            READY FOR AN ADVENTURE?
          </span>

          <h2>
            Your story starts here.
          </h2>

          <p>
            Create a magical personalized story in minutes.
          </p>

        </div>


        <button
          onClick={() => navigate("/create-story")}
          className="kq-bottom-button"
        >

          <Sparkles size={20} />

          Create My Story

          <ArrowRight size={20} />

        </button>

      </section>


      {/* =========================
          FOOTER
      ========================== */}

      <footer className="kq-footer">

        <div className="kq-logo">

          <div className="kq-logo-icon">
            ✨
          </div>

          <div>
            <div className="kq-logo-name">
              KathaQuest
            </div>

            <div className="kq-logo-tagline">
              Where every child becomes the hero.
            </div>
          </div>

        </div>

        <div className="kq-footer-text">
          AI-powered interactive storytelling
        </div>

      </footer>

    </div>
  );
}


/* =========================
   FEATURE COMPONENT
========================= */

function Feature({
  icon,
  title,
  text,
}) {

  return (

    <div className="kq-feature-card">

      <div className="kq-feature-icon">
        {icon}
      </div>

      <h3>
        {title}
      </h3>

      <p>
        {text}
      </p>

    </div>

  );
}