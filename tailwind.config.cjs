/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('@significa/svelte-ui/tailwind.config.cjs')],
  content: [
    './src/**/*.{html,js,svelte,ts}',
    './node_modules/@significa/svelte-ui/src/**/*.{html,js,svelte,ts}'
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem'
    },
    extend: {}
  },
  plugins: []
};
