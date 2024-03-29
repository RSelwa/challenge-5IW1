import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@radix-ui/": "/node_modules/@radix-ui"
    }
  },
  server: {
    port: 3000,
    watch: {
      usePolling: true,
    }
  },
})
