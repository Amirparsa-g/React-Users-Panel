export type ThemeMode = "light" | "dark" | "system";

export interface themeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
}
