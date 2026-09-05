import { worlds } from "../data/worlds";
import WorldCard from "./WorldCard";
import { useGameContext } from "../context/GameContext";
import { useNavigate } from "react-router-dom";

function WorldMap() {
  const { unlockedWorlds } = useGameContext();
  const navigate = useNavigate();

  return (
    <div className="world-map">
      <div className="map-path map-path-one"></div>
      <div className="map-path map-path-two"></div>
      <div className="map-path map-path-three"></div>

      {worlds.map((world, index) => (
        <div
          key={world.id}
          className={`map-location map-location-${index + 1}`}
        >
          <WorldCard
            world={world}
            unlocked={unlockedWorlds.includes(world.id)}
            onClick={() => navigate(`/mission/${world.id}`)}
          />
        </div>
      ))}
    </div>
  );
}

export default WorldMap;