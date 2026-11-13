import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

// Default build: a normal static site in dist/ (serve it with `npm run preview` or any static host).
// `npm run build:single` inlines everything into one HTML file for offline hand-off.
export default defineConfig(({ mode }) => ({
  base: "./",
  plugins: mode === "single" ? [viteSingleFile()] : [],
  build: mode === "single" ? { target: "es2022", assetsInlineLimit: 100_000_000, chunkSizeWarningLimit: 4000, cssCodeSplit: false } : { target: "es2022", chunkSizeWarningLimit: 1200 },
}));
