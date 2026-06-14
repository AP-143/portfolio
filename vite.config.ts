import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Relative base so the static build works whether it's served from the domain
// root (user site) or a /repo/ subpath (project site) on GitHub Pages.
// https://vite.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react()],
});
