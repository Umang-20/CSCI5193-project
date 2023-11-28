import { createTheme } from "@mui/material/styles";

// Light mode color palette
const lightPalette = {
  primary: "#79B4B7",
  secondary: "#FEFBF3",
  background: "#F8F0DF",
  accent: "#B8DFD8",
};

// Dark mode color palette
const darkPalette = {
  primary: "#0F0F0F",
  secondary: "#232D3F",
  background: "#005B41",
  accent: "#008170",
};

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: lightPalette.primary,
    },
    secondary: {
      main: lightPalette.secondary,
    },
    background: {
      default: lightPalette.background,
    },
    text: {
      primary: "#333",
      secondary: "#666",
    },
    card: {
      primary: lightPalette.accent,
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: darkPalette.primary,
    },
    secondary: {
      main: darkPalette.secondary,
    },
    background: {
      default: darkPalette.background,
    },
    text: {
      primary: "#fff",
      secondary: "#ccc",
    },
    card: {
      primary: darkPalette.accent,
    },
  },
});

const getCurrentTheme = (isDark) => {
  return isDark ? darkTheme : lightTheme;
};

export { lightTheme, darkTheme, getCurrentTheme };
