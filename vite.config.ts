import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [react(), visualizer({
    open: true,        // auto-opens the report in your browser
    gzipSize: true,
    brotliSize: true,
  }),],
  server: {
    port: 5173,
  },
});

