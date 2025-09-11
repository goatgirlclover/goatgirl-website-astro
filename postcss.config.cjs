module.exports = {
  plugins: [
    require('postcss-preset-env')({
      stage: 3,
      browsers: ['last 2 versions', 'IE 6-11', 'Safari 7-18'],

      features: {
        'nesting-rules': true,
      },

      autoprefixer: {
        'flexbox': 'no-2009',
      }
    }),
    require('postcss-calc')
  ],
}