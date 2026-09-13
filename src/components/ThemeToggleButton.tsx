import { useContext } from "react";

import Buttons from "./Buttons";
import { ThemeContext } from "../Contexts/ThemeProvider";
import type { themeContextType } from "../types/themeContextType";

const ThemeToggleButton = () => {
  const { isDark, setIsDark } = useContext(ThemeContext) as themeContextType;
  return (
    <Buttons
      comp="button"
      buttonType="neutral"
      more="border-none w-fit p-0 mr-10"
      onClick={() => setIsDark(!isDark)}
    >
      {!isDark && (
        <div className="relative group ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            className="fill-primary cursor-pointer"
          >
            <path d="M600-640 480-760l120-120 120 120-120 120Zm200 120-80-80 80-80 80 80-80 80ZM483-80q-84 0-157.5-32t-128-86.5Q143-253 111-326.5T79-484q0-146 93-257.5T409-880q-18 99 11 193.5T520-521q71 71 165.5 100T879-410q-26 144-138 237T483-80Zm0-80q88 0 163-44t118-121q-86-8-163-43.5T463-465q-61-61-97-138t-43-163q-77 43-120.5 118.5T159-484q0 135 94.5 229.5T483-160Zm-20-305Z" />
          </svg>

          <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 hidden group-hover:block bg-surface-elevated-darkMode text-text-primary-darkMode text-xs px-2.5 py-1.5 rounded shadow-lg whitespace-nowrap z-50">
            set darkmode
          </div>
        </div>
      )}
      {isDark && (
        <div className="relative group ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            className="fill-yellow-600"
          >
            <path d="M480-28 346-160H160v-186L28-480l132-134v-186h186l134-132 134 132h186v186l132 134-132 134v186H614L480-28Zm141.5-310.5Q680-397 680-480t-58.5-141.5Q563-680 480-680t-141.5 58.5Q280-563 280-480t58.5 141.5Q397-280 480-280t141.5-58.5ZM480-480Zm0 340 100-100h140v-140l100-100-100-100v-140H580L480-820 380-720H240v140L140-480l100 100v140h140l100 100Zm0-340Z" />
          </svg>
          <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 hidden group-hover:block bg-surface-elevated-darkMode text-text-primary-darkMode text-xs px-2.5 py-1.5 rounded shadow-lg whitespace-nowrap z-50">
            set lightmode
          </div>
        </div>
      )}
    </Buttons>
  );
};

export default ThemeToggleButton;
