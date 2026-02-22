import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import CarModelPage from "./CarModelPage";
import HowItWorksPage from "./HowItWorksPage";
import ContactPage from "./ContactPage";

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
  return (
    <BrowserRouter basename={resolveBasename()}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/samochod/:carSlug" element={<CarModelPage />} />
        <Route path="/jak-dzialamy" element={<HowItWorksPage />} />
        <Route path="/kontakt" element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
