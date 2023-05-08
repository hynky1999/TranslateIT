import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRefresh(),

    viteStaticCopy({
      targets: [
        { src: 'manifest.json', dest: '.' },
        { src: 'assets', dest: '.' },
      ]
    })
  ],
  build: {
    outDir: 'dist',
    rollupOptions : {
      input: {
        index: './index.html',
        background: './src/background.ts',
        content: './src/content.ts',
      },
      output: {
        entryFileNames: 'src/[name].js',
        chunkFileNames: '[name].js',
      }
    },
  }
});