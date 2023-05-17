import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRefresh(),
  ],
  build: {
    outDir: 'dist',
    minify: false,
    rollupOptions: {
      input: {
        content: './src/content.ts',
        background: './src/background.ts',
        index: './index.html',
      },
      output: {
        entryFileNames: 'src/[name].js',
        chunkFileNames: '[name].js',

      }
    },
  }
});