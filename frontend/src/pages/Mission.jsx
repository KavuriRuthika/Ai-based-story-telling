import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Sparkles } from "lucide-react";

function Mission() {
  const { worldId } = useParams();
  const navigate = useNavigate();

  if (worldId !== "forest") {
    return (
      <main className="complete-page">
        <div className="complete-card">
          <div className="complete-icon">
            🔒
          </div>

          <h1>World Locked</h1>

          <p>
            Complete the previous mission to unlock this magical world.
          </p>

          <button
            className="primary-button"
            onClick={() => navigate("/map")}
          >
            Back to Lumora
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="mission-page">

      <div className="mission-container">

        <div className="mission-top">

          <button
            className="secondary-button"
            onClick={() => navigate("/map")}
          >
            <ArrowLeft size={15} />
            Back to Map
          </button>

          <div className="mission-badge">
            Mission 01 • Whispering Forest
          </div>

        </div>

        <div className="story-card">

          <div className="story-image">
            🌳 🦊 ✨
          </div>

          <div className="story-content">

            <h1>
              The Whispering Forest
            </h1>

            <p>
              Anu stepped into the magical forest.
              Giant trees stretched toward the sky,
              glowing flowers lit the path and tiny
              butterflies danced between the branches.
            </p>

            <div className="story-controls">

              <button
                className="primary-button"
                onClick={() => {
                  alert(
                    "Story engine will generate the next scene here."
                  );
                }}
              >
                <Sparkles size={15} />
                Begin Adventure
              </button>

              <button className="secondary-button">
                🔊 Listen
              </button>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}

export default Mission;