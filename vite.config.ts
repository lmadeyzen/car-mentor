import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  // Local dev runs on "/" to avoid base-path warnings.
  base: command === "serve" ? "/" : "/car-mentor/",
}));
