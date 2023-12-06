// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://inspiroverse.onrender.com',
        changeOrigin: true, // This line is added
        secure: false, // Change this to false
      },
    },
  },
  plugins: [react()],
});
