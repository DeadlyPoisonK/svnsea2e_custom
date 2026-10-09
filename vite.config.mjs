import { defineConfig } from 'vite';

// Builds src/ into the single ES module that system.json loads (svnsea2e.mjs).
// The output is left unminified so stack traces in the Foundry console stay readable.
export default defineConfig({
  publicDir: false,
  build: {
    outDir: '.',
    emptyOutDir: false,
    minify: false,
    sourcemap: true,
    target: 'es2022',
    lib: {
      entry: 'src/svnsea2e.mjs',
      formats: ['es'],
      fileName: () => 'svnsea2e.mjs',
    },
    rollupOptions: {
      output: { inlineDynamicImports: true },
    },
  },
});
