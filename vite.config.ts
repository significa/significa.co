import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import mkcert from 'vite-plugin-mkcert';

const HTTPS_ENABLED = process.env.HTTPS_ENABLED === 'true';

const extraPlugins = HTTPS_ENABLED ? [mkcert()] : [];

export default defineConfig({
  plugins: [sveltekit(), ...extraPlugins],
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
  }
});
