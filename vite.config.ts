import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import mkcert from 'vite-plugin-mkcert';

export default defineConfig({
  plugins: [sveltekit(), mkcert()],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}']
  },
  server: {
    https: true,
    fs: {
      // allow root path to allow including fonts.
      // useful when developing locally with linked UI library.
      allow: process.env.NODE_ENV === 'development' ? ['/'] : undefined
    }
  }
});
