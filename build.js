const esbuild = require("esbuild");

esbuild
  .build({
    entryPoints: ["./src/background.ts", "./src/content.ts", "./src/popup.ts"],
    bundle: true,
    outdir: 'dist',
    target: "chrome58",
    platform: "browser",
    minify: process.env.NODE_ENV === "production",
    sourcemap: process.env.NODE_ENV === "development",
    tsconfig: "./tsconfig.json",
  })
  .catch(() => process.exit(1));
