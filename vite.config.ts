import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',       // Permite acesso externo
    port: 5173,            // Porta padrão do Vite
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // Backend (Spring Boot)
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
