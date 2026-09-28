import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Set API_TARGET=http://127.0.0.1:8080 to use the local PHP server (npm run dev:api).
const apiTarget = process.env.API_TARGET ?? "https://carmentor.pl";
const proxyOptions = { target: apiTarget, changeOrigin: true };

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  server: {
    proxy: {
      "/api": proxyOptions,
      "/admin": proxyOptions,
      "/uploads": proxyOptions,
    },
  },
});
