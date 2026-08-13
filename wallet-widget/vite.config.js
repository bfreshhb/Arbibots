import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

const entry = fileURLToPath(new URL('./src/main.jsx', import.meta.url))

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  build: {
    lib: {
      entry,
      formats: ['es'],
      fileName: () => 'wallet-widget.js',
    },
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        codeSplitting: false,
      },
    },
  },
})
