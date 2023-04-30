// vite.config.ts
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    lib: {
      entry: 'src/content.ts',
      name: 'Content',
      formats: ['iife'],
      fileName: 'bundle.js',
    },
    rollupOptions: {
      external: /^chrome/,
    },
  },
});
