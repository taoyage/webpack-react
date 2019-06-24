const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const config = require('../.webpackrc');
const utils = require('./utils');

const baseWebpackConfig = require('./webpack.base.config');

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[name].[chunkhash].js')
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  module: {
    rules: [
      {
        test: /\.(sa|sc|c|le)ss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('styles/[name].[hash].css'),
      chunkFilename: '[id].[hash].css'
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join('public', 'index.ejs'),
      templateParameters: {
        env: process.env.NODE_ENV,
        title: config.build.title
      },
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true
      },
      hash: true
    }),
    new CleanWebpackPlugin(),
    new MomentLocalesPlugin({
      localesToKeep: ['zh-cn']
    }),
    new webpack.DefinePlugin({
      'process.env': config.build.NODE_ENV
    })
  ],
  optimization: {
    minimizer: [
      new UglifyjsWebpackPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCssAssetsWebpackPlugin()
    ],
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2,
          maxInitialRequests: 5
        },
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor'
        },
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  }
});
