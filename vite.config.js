
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/amrutha-passport-consultancy/',
  plugins: [react()],
  build: {
    outDir: 'docs',
  },
})
