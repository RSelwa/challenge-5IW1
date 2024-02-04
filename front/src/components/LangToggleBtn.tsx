import React from "react";

interface LangToggleBtnProps {
  currentLanguage: string;
  onToggle: () => void;
}

const LangToggleBtn: React.FC<LangToggleBtnProps> = ({ currentLanguage, onToggle }) => {
  return (
    <button onClick={onToggle} className="text-white">
      Changer de langue ({currentLanguage === "fr" ? "en" : "fr"})
    </button>
  );
};

export default LangToggleBtn;