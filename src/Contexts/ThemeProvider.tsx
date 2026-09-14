import { type ReactNode, useState, useEffect } from "react";
import { createContext } from "react";
import type { themeContextType, ThemeMode } from "../types/themeContextType";

const getSystemIsDark = (): boolean =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

const getInitialTheme = (): ThemeMode => {
  if (typeof window !== "undefined") {
    const savedTheme = localStorage.getItem("theme");
    if (
      savedTheme === "light" ||
      savedTheme === "dark" ||
      savedTheme === "system"
    ) {
      return savedTheme;
    }
  }
  return "system";
};

// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext<themeContextType | undefined>(
  undefined,
);

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);

  useEffect(() => {
    const htmlElement = document.documentElement;

    const isDark =
      theme === "dark" ||
      (theme === "system" && getSystemIsDark());

    htmlElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", theme);

    if (theme === "system") {
      const mediaQuery = window.matchMedia(
        "(prefers-color-scheme: dark)",
      );

      const handler = () => {
        htmlElement.classList.toggle("dark", getSystemIsDark());
      };

      mediaQuery.addEventListener("change", handler);

      return () => mediaQuery.removeEventListener("change", handler);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
