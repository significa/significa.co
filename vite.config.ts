import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import mkcert from 'vite-plugin-mkcert';

export default defineConfig({
  plugins: [sveltekit(), mkcert()],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}']
  },
  server: {
    https: true
  }
});
