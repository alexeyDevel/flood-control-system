import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  build: {
    target: "es2022",
  },
  resolve: {
    alias: {
      src: "/src",
      assets: "/src/assets",
      routes: "/src/routes",
      components: "/src/components",
      pages: "/src/pages",
      ui: "/src/components/ui",
    },
  },
  plugins: [react()],
  server: {
    port: 5000,
  },
});
