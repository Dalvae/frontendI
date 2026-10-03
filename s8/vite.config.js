import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// base con el nombre del repo para que funcione en github pages (/frontendI/s8/)
export default defineConfig({
  base: '/frontendI/s8/',
  plugins: [react()],
})
