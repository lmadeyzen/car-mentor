import { createGlobalStyle } from "styled-components";

const ACCENT_COLOR = "#00573F";
const ACCENT_COLOR_DARK = "#33c39b";

export const GlobalStyle = createGlobalStyle<{ $isDark: boolean }>`
  *, *::before, *::after { 
    margin: 0; 
    padding: 0; 
    box-sizing: border-box; 
  }
  
  html {
    font-size: 16px;
  }
  
  body {
    font-family: "DM Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important;
    font-size: 16px;
    color: ${({ $isDark }) => ($isDark ? "#f0f3f2" : "#161616")};
    background: ${({ $isDark }) => ($isDark ? "#0f1513" : "#f5f5f5")};
    transition: background-color 0.25s ease, color 0.25s ease;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  button, a {
    transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
  }
  
  :focus-visible {
    outline: 3px solid ${({ $isDark }) => ($isDark ? ACCENT_COLOR_DARK : ACCENT_COLOR)};
    outline-offset: 2px;
  }
  
  a { 
    text-decoration: none; 
    color: inherit; 
  }
  
  img { 
    max-width: 100%; 
    display: block; 
  }
  
  input, select, textarea {
    font: inherit;
  }
`;

export const ACCENT_COLOR_EXPORT = ACCENT_COLOR;
export const ACCENT_COLOR_DARK_EXPORT = ACCENT_COLOR_DARK;
export const THEME_STORAGE_KEY = "car-mentor-theme";
