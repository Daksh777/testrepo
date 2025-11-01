import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Maps-related dependencies (removed react-map-gl due to compatibility issues)
          maps: ["maplibre-gl", "@turf/bbox", "proj4"],

          // Charts library
          charts: ["recharts"],

          // UI component libraries
          "radix-ui": [
            "@radix-ui/react-accordion",
            "@radix-ui/react-checkbox",
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-label",
            "@radix-ui/react-popover",
            "@radix-ui/react-select",
            "@radix-ui/react-separator",
            "@radix-ui/react-slider",
            "@radix-ui/react-slot",
            "@radix-ui/react-tooltip",
          ],

          // React ecosystem
          "react-vendor": ["react", "react-dom"],
          "react-router": ["react-router"],

          // Form and validation
          forms: ["react-hook-form", "@hookform/resolvers", "zod"],

          // Data fetching and state
          data: ["@tanstack/react-query", "@tanstack/react-table", "zustand"],

          // Utilities
          utils: [
            "axios",
            "date-fns",
            "clsx",
            "tailwind-merge",
            "class-variance-authority",
          ],

          // Authentication
          auth: ["@react-oauth/google"],

          // Other UI libraries
          "ui-misc": [
            "lucide-react",
            "sonner",
            "canvas-confetti",
            "react-simple-star-rating",
          ],
        },
      },
    },
  },
});
