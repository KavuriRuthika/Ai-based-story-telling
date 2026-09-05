import { useNavigate } from "react-router-dom";
import WorldCard from "../components/WorldCard";
import { worlds } from "../data/worlds";

function Map() {
  const navigate = useNavigate();

  const handleWorldClick = (world) => {
    if (world.id === "forest") {
      navigate("/mission/forest");
    }
  };

  return (
    <main className="map-page">
      <div className="map-header">

        <div>
          <h1 className="map-title">
            Choose your
            <br />
            next adventure,
            <br />
            <span>Lucky.</span>
          </h1>

          <p className="map-subtitle">
            Explore magical worlds, complete missions and restore the Story Crystal.
          </p>
        </div>

        <div className="crystal-counter">
          <strong>💎 0 / 5</strong>
          <span>Crystal Pieces</span>
        </div>

      </div>

      <div className="world-grid">

        {worlds.map((world) => (
          <WorldCard
            key={world.id}
            world={world}
            unlocked={world.unlocked}
            onClick={handleWorldClick}
          />
        ))}

      </div>
    </main>
  );
}

export default Map;