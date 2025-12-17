module.exports = {
  plugins: [
    require('postcss-preset-env')({
      stage: 3,
      browsers: ['last 2 major versions', 'IE 6-11', 'Safari 7-18', 'Chrome 4-140'],

      features: {
        'nesting-rules': true,
      },

      autoprefixer: {
        'flexbox': 'no-2009',
      }
    }),
    require('postcss-calc'),
    require('@csstools/postcss-color-mix-function'),
    require('@csstools/postcss-is-pseudo-class')
  ],
}