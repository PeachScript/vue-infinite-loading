const webpackConfig = require('./webpack.config');

delete webpackConfig.entry;

// Karma configuration
module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'sinon-chai'],
    files: [
      '../test/unit/index.js'
    ],
    preprocessors: {
      '../test/unit/index.js': 'webpack'
    },
    browsers: ['PhantomJS'],
    reporters: ['spec', 'coverage'],
    coverageReporter: {
      dir: '../test/unit/coverage',
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text-summary' }
      ]
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      stats: 'errors-only'
    },
    singleRun: true
  });
}
