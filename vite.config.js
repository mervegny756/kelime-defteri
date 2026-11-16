import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    // Lightning CSS yerine PostCSS motorunu kullanarak bu hatanın önüne geçiyoruz
    transformer: 'postcss',
  },
})
