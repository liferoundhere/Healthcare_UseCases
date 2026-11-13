import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

// One self-contained index.html (JS, CSS and fonts inlined) so the explainer
// opens straight from disk on a presenter laptop, with no server and no network.
export default defineConfig({
  base: "./",
  plugins: [viteSingleFile()],
  build: { target: "es2022", assetsInlineLimit: 100_000_000, chunkSizeWarningLimit: 4000, cssCodeSplit: false },
});
