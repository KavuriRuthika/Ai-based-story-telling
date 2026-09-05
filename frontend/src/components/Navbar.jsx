import { Link, useLocation } from "react-router-dom";
import { Sparkles, Map, UserCircle, Globe } from "lucide-react";
import { useGameContext } from "../context/GameContext";
import "./Navbar.css";

function Navbar() {
  const { hero, language, setLanguage } = useGameContext();
  const location = useLocation();

  return (
    <header className="navbar">
      <Link to="/" className="brand">
        <div className="brand-icon">
          <Sparkles size={24} />
        </div>

        <div>
          <div className="brand-title">KathaQuest</div>
          <div className="brand-subtitle">
            Learn through adventure
          </div>
        </div>
      </Link>

      {hero && (
        <div className="hero-info-navbar">
          <span className="hero-name">🧙‍♂️ {hero.name}</span>
          <span className="hero-level">Level {hero.level || 1}</span>
        </div>
      )}

      <nav className="nav-links">
        {location.pathname !== "/" && location.pathname !== "/create-hero" && (
          <>
            <Link to="/map" className="nav-link">
              <Map size={18} />
              Map
            </Link>

            <Link to="/profile" className="nav-link">
              <UserCircle size={18} />
              Profile
            </Link>
          </>
        )}

        <div className="language-selector-navbar">
          <Globe size={16} />
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)}
            className="language-select-navbar"
          >
            <option value="en">English 🇬🇧</option>
            <option value="te">Telugu 🇮🇳</option>
            <option value="hi">Hindi 🇮🇳</option>
          </select>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;