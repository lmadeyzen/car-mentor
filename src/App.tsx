import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import CarModelPage from "./CarModelPage";
import HowItWorksPage from "./HowItWorksPage";
import ContactPage from "./ContactPage";
import { GlobalStyle, THEME_STORAGE_KEY } from "./GlobalStyle";

function resolveBasename() {
  const configuredBase = import.meta.env.BASE_URL;
  if (configuredBase && configuredBase !== "/") {
    return configuredBase.replace(/\/$/, "");
  }

  if (typeof window !== "undefined" && window.location.pathname.startsWith("/car-mentor/")) {
    return "/car-mentor";
  }

  return "/";
}

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }
    return window.localStorage.getItem(THEME_STORAGE_KEY) === "dark";
  });

  useEffect(() => {
    window.localStorage.setItem(THEME_STORAGE_KEY, isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  return (
    <>
      <GlobalStyle $isDark={isDarkMode} />
      <BrowserRouter basename={resolveBasename()}>
        <Routes>
          <Route path="/" element={<HomePage isDarkMode={isDarkMode} onToggleTheme={toggleTheme} />} />
          <Route path="/samochod/:carSlug" element={<CarModelPage isDarkMode={isDarkMode} onToggleTheme={toggleTheme} />} />
          <Route path="/jak-dzialamy" element={<HowItWorksPage isDarkMode={isDarkMode} onToggleTheme={toggleTheme} />} />
          <Route path="/kontakt" element={<ContactPage isDarkMode={isDarkMode} onToggleTheme={toggleTheme} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
