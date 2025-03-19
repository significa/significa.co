import { loadEnv } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import mkcert from 'vite-plugin-mkcert';
import { sentrySvelteKit } from '@sentry/sveltekit';

const env = loadEnv('development', process.cwd());
const HTTPS_ENABLED = env.VITE_HTTPS_ENABLED === 'true';
const extraPlugins = HTTPS_ENABLED ? [mkcert()] : [];

export default defineConfig({
  plugins: [
    sveltekit(),
    sentrySvelteKit({
      sourceMapsUploadOptions: {
        org: 'significa',
        project: 'significa-website'
      }
    }),
    ...extraPlugins
  ],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}']
  },
  server: {
    https: HTTPS_ENABLED,
    fs: {
      // allow root path to allow including fonts.
      // useful when developing locally with linked UI library.
      allow: process.env.NODE_ENV === 'development' ? ['/'] : undefined
    }
  },
  optimizeDeps: {
    exclude: process.env.NODE_ENV === 'development' ? ['@significa/svelte-ui'] : []
  }
});
