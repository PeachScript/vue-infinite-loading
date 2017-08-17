const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
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
    extensions: ['.js', '.vue']
  },
  module: {
    rules: [
      {
        test: /\.(vue|js)$/,
        enforce: 'pre',
        include: [path.join(__dirname, './src'), path.join(__dirname, './test')],
        loader: 'eslint-loader',
        options: {
          formatter: require('eslint-friendly-formatter')
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

if (process.env.NODE_ENV !== 'production') {
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
