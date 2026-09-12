import { useContext } from "react";

import Buttons from "./Buttons";
import { ThemeContext } from "../Contexts/ThemeProvider";
import type { themeContextType } from "../types/themeContextType";

const ThemeToggleButton = () => {
  const { isDark, setIsDark } = useContext(ThemeContext) as themeContextType;
  return (
    <Buttons
      comp="button"
      buttonType="primary"
      onClick={() => setIsDark(!isDark)}
    >
      Toggle Theme
    </Buttons>
  );
};

export default ThemeToggleButton;
