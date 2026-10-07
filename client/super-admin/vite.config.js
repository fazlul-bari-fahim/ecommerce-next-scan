import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/",
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
  server: {
    port: 3001,
    watch: {
      usePolling: true,
      interval: 100,
    },
    hmr: {
      host: "localhost",
      port: 3001,
    },
    proxy: {

      "/api": {
        target: "https://nlmcrockerys.com",
        changeOrigin: true,
        secure: false,


        //  local
        // target: "http://localhost:5000/",
        // changeOrigin: true,
        // secure: false,
      }



    }
  }
})
