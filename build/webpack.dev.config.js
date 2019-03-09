const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./config');

const baseWebpackConfig = require('./webpack.base.config');

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: config.dev.devtool,
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    historyApiFallback: {
      rewrites: [{ from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') }]
    },
    host: config.dev.host,
    port: config.dev.port,
    publicPath: config.dev.assetsPublicPath,
    open: config.dev.autoOpenBrowser,
    proxy: config.dev.proxyTable,
    overlay: config.dev.errorOverlay ? { warnings: false, errors: true } : false,
    hot: true,
    compress: true,
    quiet: true,
    watchOptions: {
      poll: config.dev.poll
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.NODE_ENV
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join('public', 'index.ejs'),
      // templateParameters: {
      //   env: process.env.NODE_ENV,
      //   title: config.dev.title
      // }
    })
  ]
});
