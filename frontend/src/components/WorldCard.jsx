import { Lock, CheckCircle, ArrowRight } from "lucide-react";

function WorldCard({ world, unlocked, onClick }) {
  return (
    <div
      className={`world-card ${unlocked ? "available" : "locked"}`}
      onClick={() => unlocked && onClick(world)}
    >
      <div className="world-icon">
        {world.emoji}
      </div>

      <div className="world-status">
        {unlocked ? (
          <>
            <CheckCircle size={13} />
            MISSION AVAILABLE
          </>
        ) : (
          <>
            <Lock size={13} />
            LOCKED
          </>
        )}
      </div>

      <h2>{world.title}</h2>

      <p>
        {world.description}
      </p>

      <div className="world-learning">
        {world.learning}
      </div>

      {unlocked && (
        <div className="world-arrow">
          <ArrowRight size={16} />
        </div>
      )}
    </div>
  );
}

export default WorldCard;