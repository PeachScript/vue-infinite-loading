const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    'vue-infinite-loading': './src/index.js'
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].js',
    publicPath: '/',
    library: 'VueInfiniteLoading',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.min.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.(vue|js)$/,
        enforce: 'pre',
        include: [path.join(__dirname, './src'), path.join(__dirname, './test')],
        loader: 'eslint-loader',
        options: {
          formatter: require('eslint-formatter-friendly')
        }
      },
      {
        test: /\.js$/,
        include: [path.join(__dirname, './src'), path.join(__dirname, './test')],
        loader: 'babel-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          postcss: [require('autoprefixer')]
        }
      }
    ]
  }
};

if (process.env.NODE_ENV === 'production') {
  // production configurations
  const pkg = require('./package');
  const banner = [
    `${pkg.name} v${process.env.VERSION || pkg.version}`,
    `(c) 2016-${new Date().getFullYear()} ${pkg.author.name}`,
    `${pkg.license} License`
  ].join('\n');

  module.exports.plugins = [
    new webpack.BannerPlugin(banner)
  ];
} else {
  // development configurations
  module.exports.plugins = [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './example/index.html',
      inject: false
    })
  ];

  module.exports.devtool = '#cheap-module-eval-source-map';
}
