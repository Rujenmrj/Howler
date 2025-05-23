import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  server: {
    port: 5001,
    allowedHosts: ["howlers.rujenm.com.np"],
  },
  plugins: [vue()],
})
