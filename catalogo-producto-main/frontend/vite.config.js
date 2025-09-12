import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/products': {
        target: 'http://10.0.1.192:5001',
        changeOrigin: true,
        secure: false
      }
    }
  }
})