import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { fileURLToPath } from 'url'
import { visualizer } from 'rollup-plugin-visualizer'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // Generates dist/stats.html after every build — open it to see chunk weights
    visualizer({
      filename: 'dist/stats.html',
      open: false,       // set true to auto-open browser after build
      gzipSize: true,    // shows gzip size alongside raw size
      brotliSize: true,  // shows brotli size (what modern CDNs serve)
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // rolldown-vite requires manualChunks as a function, not an object
        manualChunks(id) {
          if (id.includes('node_modules/three'))          return 'vendor-three';
          if (id.includes('node_modules/framer-motion'))  return 'vendor-framer';
          if (id.includes('node_modules/react-dom'))      return 'vendor-react';
          if (id.includes('node_modules/react'))          return 'vendor-react';
        },
      },
    },
    chunkSizeWarningLimit: 500,
  },
})
