import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  plugins: [react()],
  root: path.resolve(__dirname, 'client'),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'client/src'),
      '@shared': path.resolve(__dirname, 'shared'),
    },
    preserveSymlinks: true
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss(path.resolve(__dirname, './tailwind.config.ts')),
        autoprefixer,
      ],
    },
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://localhost:8321',
        changeOrigin: true,
      }
    }
  }
}); 