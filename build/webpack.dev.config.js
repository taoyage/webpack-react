const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const config = require('../.webpackrc');

const baseWebpackConfig = require('./webpack.base.config');

module.exports = merge(baseWebpackConfig, {
  entry: ['react-hot-loader/patch', './src/index'],
  mode: 'development',
  devtool: config.dev.devtool,
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    historyApiFallback: true,
    host: config.dev.host,
    port: config.dev.port,
    publicPath: config.dev.assetsPublicPath,
    open: config.dev.autoOpenBrowser,
    proxy: config.dev.proxyTable,
    overlay: config.dev.errorOverlay ? { warnings: false, errors: true } : false,
    hot: true,
    compress: true,
    quiet: true,
    clientLogLevel: 'none', // 不在浏览器控制台打印打包信息
    watchOptions: {
      poll: config.dev.poll,
      ignored: /node_modules/
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.NODE_ENV
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DllReferencePlugin({
      manifest: require('../dist/dll/lib.manifest.json')
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join('public', 'index.ejs'),
      templateParameters: {
        env: process.env.NODE_ENV,
        title: config.dev.title
      }
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: []
    })
  ]
});
