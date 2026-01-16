import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter({
      runtime: 'nodejs20.x'
    }),
    alias: {
      $assets: './src/assets',
      $components: './src/components',
      $lib: './src/lib',
      $types: './src/types',
      $styles: './src/styles',
      $root: '.'
    },
    prerender: {
      handleHttpError: 'warn',
      handleMissingId: 'warn',
      origin: 'https://stachly.vercel.app'
    }
  }
};

export default config;
