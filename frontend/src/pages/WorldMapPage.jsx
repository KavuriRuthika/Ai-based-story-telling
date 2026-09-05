import { Link } from "react-router-dom";
import { ArrowLeft, Compass, Sparkles } from "lucide-react";

import Navbar from "../components/Navbar";
import WorldMap from "../components/WorldMap";
import { useGameContext } from "../context/GameContext";

function WorldMapPage() {
  const { hero } = useGameContext();

  return (
    <div className="app-shell">
      <Navbar />

      <main className="map-page">
        <div className="map-header">
          <Link to="/" className="back-link">
            <ArrowLeft size={17} />
            Back
          </Link>

          <div className="eyebrow">
            <Compass size={16} />
            The Living World of Lumora
          </div>

          <h1>
            Choose your
            <span> next adventure.</span>
          </h1>

          <p>
            {hero?.name
              ? `${hero.name}, the world is waiting for you.`
              : "Your adventure begins here."}
          </p>

          <div className="crystal-progress">
            <span>💎</span>
            <div>
              <strong>Story Crystal</strong>
              <small>1 / 5 pieces collected</small>
            </div>

            <div className="crystal-bar">
              <div></div>
            </div>
          </div>
        </div>

        <WorldMap />

        <div className="map-tip">
          <Sparkles size={17} />
          Complete missions to unlock new magical worlds.
        </div>
      </main>
    </div>
  );
}

export default WorldMapPage;