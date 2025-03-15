import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true, // ใช้ port 5173 เท่านั้น
    allowedHosts: [
      ".ngrok-free.app", // อนุญาตให้เข้าถึงจาก ngrok
    ],
  },
});
