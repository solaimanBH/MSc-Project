import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as sass from 'sass'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        implementation: sass,

      },
    }
  },
  resolve: {
    alias: {
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
      $src: path.resolve(__dirname, 'src'), // Alias for 'src' directory
    }
  },
  server: {
    watch: {
      usePolling: true
    },
    port: 5173,
    host: '0.0.0.0'
  },
})
