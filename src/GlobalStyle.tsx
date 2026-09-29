import { createGlobalStyle } from "styled-components";
import { ACCENT_COLOR, ACCENT_COLOR_DARK } from "./theme";

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
    font-family: "Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important;
    font-size: 16px;
    color: ${({ $isDark }) => ($isDark ? "#eef3f1" : "#111a17")};
    background: ${({ $isDark }) => ($isDark ? "#0b110f" : "#f3f5f4")};
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

  ::selection {
    background: ${({ $isDark }) => ($isDark ? "rgba(51, 195, 155, 0.35)" : "rgba(0, 87, 63, 0.18)")};
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
