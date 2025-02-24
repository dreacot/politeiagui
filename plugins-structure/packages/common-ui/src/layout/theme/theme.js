import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  DEFAULT_DARK_THEME_NAME,
  DEFAULT_LIGHT_THEME_NAME,
  ThemeProvider,
  defaultDarkTheme,
  defaultLightTheme,
  useTheme,
} from "pi-ui";
import { selectCurrentTheme } from "./themeSlice";
import "./theme.css";

const themes = {
  [DEFAULT_DARK_THEME_NAME]: defaultDarkTheme,
  [DEFAULT_LIGHT_THEME_NAME]: defaultLightTheme,
};

function ThemeConsumer({ children }) {
  const { setThemeName, themeName } = useTheme();
  const currentTheme = useSelector(selectCurrentTheme);
  useEffect(() => {
    if (themeName !== currentTheme) {
      setThemeName(currentTheme);
    }
  }, [currentTheme, setThemeName, themeName]);

  return children;
}

export function UiTheme({ children }) {
  return (
    <ThemeProvider themes={themes} defaultThemeName={DEFAULT_LIGHT_THEME_NAME}>
      <ThemeConsumer>{children}</ThemeConsumer>
    </ThemeProvider>
  );
}
