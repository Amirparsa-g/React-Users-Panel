import { type ReactNode, useState, useEffect } from "react";
import { createContext } from "react";
import type { themeContextType, ThemeMode } from "../types/themeContextType";
import { useMediaQuery } from "../hooks/useMediaQuery";

const getInitialTheme = (): ThemeMode => {
  if (typeof window !== "undefined") {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light" || savedTheme === "dark" || savedTheme === "system") {
      return savedTheme;
    }
  }
  return "system";
};

// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext<themeContextType | undefined>(undefined);

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);
  const systemIsDark = useMediaQuery("(prefers-color-scheme: dark)");

  useEffect(() => {
    const htmlElement = document.documentElement;

    const isDark = theme === "dark" || (theme === "system" && systemIsDark);

    htmlElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", theme);
  }, [theme, systemIsDark]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
