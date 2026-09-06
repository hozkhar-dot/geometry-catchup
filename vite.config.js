import { defineConfig } from 'vite';

// GitHub Pages serves the site under /<repo-name>/, so the base path must match.
export default defineConfig({
  base: '/geometry-catchup/',
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
