module.exports = {
  plugins: [
    require('postcss-env-function')({
      environmentVariables: {
        'mobile': '480px',
      },
    }),
    // Add other PostCSS plugins here
  ],
};
