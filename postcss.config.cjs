module.exports = {
  plugins: [
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
