import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"; // Handles React components and JSX
import tailwindcss from "@tailwindcss/vite"; // Handles Tailwind styling

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
