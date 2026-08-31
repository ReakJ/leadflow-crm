import { useEffect, useState } from "react";
import { ThemeContext } from "./ThemeContext";

const STORAGE_KEY = "leadflow-theme";

const THEMES = {
  LIGHT: "leadflow-light",
  DARK: "leadflow-dark"
};

const THEME_COLORS = {
  [THEMES.LIGHT]: "#ffffff",
  [THEMES.DARK]: "#0f1318",
};

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) || THEMES.DARK;
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEY, theme);

    const themeColor = document.querySelector(
      'meta[name="theme-color"]'
    );

    if (themeColor) {
      themeColor.setAttribute(
        "content",
        THEME_COLORS[theme]
      );
    }
  }, [theme]);

  const setTheme = (newTheme) => {
    if (!Object.values(THEMES).includes(newTheme)) {
      return;
    }

    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        themes: THEMES,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}