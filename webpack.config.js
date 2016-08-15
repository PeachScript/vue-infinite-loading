var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWepackPlugin = require('html-webpack-plugin');

// basic configurations
module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: './',
    publicPath: '/'
  },
  resolve: {
    extensions: ['', '.js', '.vue']
  },
  module: {
    preLoaders: [
      {
        test: /\.(vue|js)$/,
        loader: 'eslint',
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js/,
        exclude: /node_modules|dist/,
        loader: 'babel'
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.html$/,
        loader: 'vue-html'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: 'static/img/[name]_[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: 'static/fonts/[name]_[hash:7].[ext]'
        }
      }
    ]
  }
};

// production configurations
if (process.env.NODE_ENV === 'production') {
  module.exports.output.filename = 'static/js/[name]_[chunkhash].js';
  module.exports.output.chunkFilename = "static/js/[id]_[chunkhash].js";

  module.exports.module.loaders = module.exports.module.loaders.concat([
    {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style','css')
    },
    {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract('style', 'css!less')
    }
  ]);

  module.exports.plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new HtmlWepackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    }),
    new ExtractTextPlugin('static/css/[name]_[contenthash].css')
  ];

  module.exports.vue = {
    autoprefixer: {
      browsers: ['last 2 versions']
    },
    loaders: {
      css: ExtractTextPlugin.extract('css'),
      less: ExtractTextPlugin.extract('css!less')
    }
  };
} else {
  // development configurations
  module.exports.output.filename = 'static/js/[name].js';

  module.exports.module.loaders = module.exports.module.loaders.concat([
    {
      test: /\.css$/,
      loader: 'style!css'
    },
    {
      test: /\.less$/,
      loader: 'style!css!less'
    }
  ]);

  module.exports.plugins = [
    new HtmlWepackPlugin({
      filename: 'index.html',
      template: './src/index.html'
    })
  ];

  module.exports.devServer = {
    contentBase: '/'
  };

  module.exports.devtool = '#source-map';
}
