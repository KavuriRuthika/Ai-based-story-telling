import React from "react";

function LanguageSelector({ language, setLanguage }) {
  const languages = [
    { id: "en", label: "English", flag: "🇬🇧" },
    { id: "te", label: "Telugu", flag: "🇮🇳" },
    { id: "hi", label: "Hindi", flag: "🇮🇳" }
  ];

  return (
    <div className="language-selector">
      {languages.map((item) => (
        <button
          key={item.id}
          type="button"
          className={language === item.id || language === item.label ? "active" : ""}
          onClick={() => setLanguage(item.id)}
        >
          {item.flag} {item.label}
        </button>
      ))}
    </div>
  );
}

export default LanguageSelector;