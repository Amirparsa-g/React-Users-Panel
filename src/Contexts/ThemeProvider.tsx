import React, { type ReactNode } from "react";
import { createContext, useState, useEffect } from "react";

interface ThemeContextType {
  isDark: boolean;
  setIsDark: (value: boolean) => void;
}
// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);
const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState<boolean>(false);
  useEffect(() => {
    const htmlElement = document.documentElement;
    if (isDark) {
      htmlElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      htmlElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);
  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
