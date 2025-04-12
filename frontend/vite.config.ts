import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      // Proxy API requests to the backend server
      "/retrieval": "http://localhost:8000",
      "/petition": "http://localhost:8000",
      "/process": "http://localhost:8000",
      "/auth": "http://localhost:8000",
      // Add any other backend paths you use
    },
  },
});
