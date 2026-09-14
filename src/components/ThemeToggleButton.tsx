import { useContext } from "react";
import { ThemeContext } from "../Contexts/ThemeProvider";
import type { themeContextType, ThemeMode } from "../types/themeContextType";

const iconPaths = {
  light: "M480-28 346-160H160v-186L28-480l132-134v-186h186l134-132 134 132h186v186l132 134-132 134v186H614L480-28Zm141.5-310.5Q680-397 680-480t-58.5-141.5Q563-680 480-680t-141.5 58.5Q280-563 280-480t58.5 141.5Q397-280 480-280t141.5-58.5ZM480-480Zm0 340 100-100h140v-140l100-100-100-100v-140H580L480-820 380-720H240v140L140-480l100 100v140h140l100 100Zm0-340Z",
  dark: "M600-640 480-760l120-120 120 120-120 120Zm200 120-80-80 80-80 80 80-80 80ZM483-80q-84 0-157.5-32t-128-86.5Q143-253 111-326.5T79-484q0-146 93-257.5T409-880q-18 99 11 193.5T520-521q71 71 165.5 100T879-410q-26 144-138 237T483-80Zm0-80q88 0 163-44t118-121q-86-8-163-43.5T463-465q-61-61-97-138t-43-163q-77 43-120.5 118.5T159-484q0 135 94.5 229.5T483-160Zm-20-305Z",
  system: "M360-320h260q42 0 71-29t29-71q0-42-29-71t-71-29h-2q-8-51-44.5-85.5T486-640q-42 0-78 21t-54 59h-5q-47 0-78 36t-31 84q0 50 35 85t85 35Zm0-80q-17 0-28.5-11.5T320-440q0-17 11.5-28.5T360-480h50v-10q0-29 20.5-49.5T480-560q29 0 49.5 20.5T550-490v50h70q8 0 14 6t6 14q0 8-6 14t-14 6H360ZM160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm0-80h640v-480H160v480Zm0 0v-480 480Z",
} as const;

const ThemeToggleButton = () => {
  const { theme, setTheme } = useContext(
    ThemeContext,
  ) as themeContextType;

  return (
    <div className="theme-toggle">
      {(["light", "dark", "system"] as ThemeMode[]).map((mode) => (
        <button
          key={mode}
          type="button"
          onClick={() => setTheme(mode)}
          className={`theme-toggle-btn ${theme === mode ? "active" : ""}`}
          aria-label={mode}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 -960 960 960"
            fill="currentColor"
          >
            <path d={iconPaths[mode]} />
          </svg>
        </button>
      ))}
    </div>
  );
};

export default ThemeToggleButton;
