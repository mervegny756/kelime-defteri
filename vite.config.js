import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    cssMinify: false, // CSS sıkıştırmasını tamamen devre dışı bırakıyoruz, böylece bu hata bir daha asla tetiklenmeyecek
  },
})
