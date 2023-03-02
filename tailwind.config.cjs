/** @type {import('tailwindcss').Config} */
module.exports = {
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
  plugins: [
    require('@significa/svelte-ui/tailwind')({
      fonts: {
        sans: {
          name: 'Significa Sans',
          fontFaces: [
            {
              fontWeight: '400',
              src: `url('/fonts/significa-regular.woff2') format('woff2')`
            },
            {
              fontWeight: '500',
              src: `url('/fonts/significa-medium.woff2') format('woff2')`
            },
            {
              fontWeight: '600',
              src: `url('/fonts/significa-semibold.woff2') format('woff2')`
            }
          ]
        }
      }
    })
  ]
};
