// vite.config.ts
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        content: 'src/content.ts',
        popup: 'src/popup.ts',
      },
      output: {
        format: 'system', // Change the output format to SystemJS
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
      },
      external: /^chrome/,
    },
  },
});
