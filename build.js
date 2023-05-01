// build.js
const esbuild = require('esbuild');

esbuild
  .build({
    entryPoints: [
      './src/background.ts',
      './src/content.ts',
      './src/popup.ts',
    ],
    outdir: 'dist',
    bundle: true,
    minify: true,
    sourcemap: true,
    target: 'chrome58',
    format: 'iife',
    plugins: [],
  })
  .catch(() => process.exit(1));
