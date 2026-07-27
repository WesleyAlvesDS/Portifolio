// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://portwesley.netlify.app',
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    css: {
      transformer: 'lightningcss',
    },
  },
});
