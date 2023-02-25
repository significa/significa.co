module.exports = {
  plugins: [
    require('@csstools/postcss-global-data')({
      files: ['./src/styles/media.css']
    }),
    require('postcss-preset-env')({
      features: {
        'nesting-rules': true
      }
    }),
    require('postcss-mixins')({
      mixinsFiles: [require.resolve('@significa/svelte-ui/mixins.css')]
    })
  ]
};
