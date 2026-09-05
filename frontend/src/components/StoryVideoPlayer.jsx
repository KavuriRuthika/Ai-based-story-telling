import React, { useState, useRef } from "react";
import { Play, Pause, Maximize2, Sparkles, Image as ImageIcon, ZoomIn, Eye } from "lucide-react";

// Curated live story picture gallery for worlds & scenes
const WORLD_LIVE_PICS = {
  forest: [
    "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1474511320723-9a56873867b5?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1400&q=80",
  ],
  ocean: [
    "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=80",
  ],
  cloud: [
    "https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=1400&q=80",
  ],
  castle: [
    "https://images.unsplash.com/photo-1520699697851-3dc68aa3a474?auto=format&fit=crop&w=1400&q=80",
  ],
  dragon: [
    "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=80",
  ],
  rainbow: [
    "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?auto=format&fit=crop&w=1400&q=80",
  ],
};

export default function StoryVideoPlayer({
  worldId = "forest",
  title = "Magical Story Scene",
  emoji = "🌌",
  currentScene = 0,
  sceneImage = null,
}) {
  const [isMotionActive, setIsMotionActive] = useState(true);
  const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const containerRef = useRef(null);

  // Get active live story pic based on current scene or direct image prop
  const getLivePicUrl = () => {
    if (sceneImage) return sceneImage;
    const gallery = WORLD_LIVE_PICS[worldId] || WORLD_LIVE_PICS.forest;
    const index = Math.abs(currentScene) % gallery.length;
    return gallery[index];
  };

  const currentImageSrc = getLivePicUrl();

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      containerRef.current.requestFullscreen().catch(() => {});
    }
  };

  return (
    <>
      <div className="story-video-container" ref={containerRef}>
        {!imgError ? (
          <div className={`live-pic-wrapper ${isMotionActive ? "kenburns-motion" : ""}`}>
            <img
              src={currentImageSrc}
              alt={title}
              className="live-story-pic"
              onError={() => setImgError(true)}
            />
            {/* Animated Magic Particles overlay */}
            <div className="live-pic-particles-overlay">
              <span className="particle p-star1">✦</span>
              <span className="particle p-star2">✧</span>
              <span className="particle p-star3">✦</span>
              <span className="particle p-glow"></span>
            </div>
          </div>
        ) : (
          <div className="story-video-fallback">
            <div className="fallback-emoji">{emoji}</div>
            <div className="fallback-particles">
              <span className="p1">✦</span>
              <span className="p2">✧</span>
              <span className="p3">✦</span>
            </div>
          </div>
        )}

        {/* Live Story Media Overlay Info */}
        <div className="story-video-overlay">
          <div className="story-video-badge">
            <Sparkles size={14} />
            <span>LIVE STORY ART · CINEMATIC VIEW</span>
          </div>

          {/* Media Action Controls */}
          <div className="story-video-controls">
            <button
              type="button"
              className={`video-ctrl-btn ${isMotionActive ? "active" : ""}`}
              onClick={() => setIsMotionActive(!isMotionActive)}
              title={isMotionActive ? "Pause Camera Motion" : "Play Camera Motion"}
            >
              {isMotionActive ? <Pause size={16} /> : <Play size={16} />}
            </button>

            <button
              type="button"
              className="video-ctrl-btn"
              onClick={() => setIsZoomModalOpen(true)}
              title="View High-Def Live Story Pic"
            >
              <ZoomIn size={16} />
            </button>

            <button
              type="button"
              className="video-ctrl-btn"
              onClick={toggleFullscreen}
              title="Fullscreen Mode"
            >
              <Maximize2 size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Fullscreen Live Story Pic Modal */}
      {isZoomModalOpen && (
        <div className="live-pic-modal-backdrop" onClick={() => setIsZoomModalOpen(false)}>
          <div className="live-pic-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="live-pic-modal-header">
              <span className="modal-title">✨ {title}</span>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setIsZoomModalOpen(false)}
              >
                ✕ Close
              </button>
            </div>
            <img src={currentImageSrc} alt={title} className="modal-full-img" />
          </div>
        </div>
      )}
    </>
  );
}
