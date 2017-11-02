var path = require('path')
var webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = {
  entry: {
    app: ['babel-polyfill', './src/main.js'],
    dashboard: ['babel-polyfill', './src/dashboard.js'],
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.worker\.js$/,
        loader: 'worker-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.glsl$/,
        loader: 'shader-loader',
        options: {
          glsl: {
            chunkPath: path.resolve('src/shaders/chunks'),
          },
        },
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader!csso-loader!sass-loader',
        }),
      },
    ]
  },
  resolve: {
    alias: {
      'config': path.resolve(__dirname, 'src/config/'),
      'store': path.resolve(__dirname, 'src/store/gameStore.js'),
      '@': path.resolve(__dirname, 'src/components'),
      'sweet-modal-vue': 'sweet-modal-vue/src',
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    port: process.env.PORT || 5000,
    proxy: {
      '/v1': {
        target: 'https://turg.urbn.odn.pw',
        changeOrigin: true,
      },
    },
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'dashboard.html',
      template: 'dashboard.html',
      inject: true
    }),
    new ExtractTextPlugin('main.css', { allChunks: true }),
    new CopyWebpackPlugin([
      { from: 'src/assets/textures', to: 'textures' },
      { from: 'src/assets/img', to: 'img' },
      { from: 'favicon.ico' }
    ]),
  ],
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
