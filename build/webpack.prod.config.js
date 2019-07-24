const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const config = require('../.webpackrc');
const utils = require('./utils');

const baseWebpackConfig = require('./webpack.base.config');

const getVersion = packageName => {
  const content = fs.readFileSync(
    `${path.join(__dirname, '../node_modules', packageName, 'package.json')}`,
    'utf8'
  );
  return JSON.parse(content).version;
};

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[name].[chunkhash].js')
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
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
        title: config.build.title,
        version: {
          react: getVersion('react'),
          reactDom: getVersion('react-dom')
        }
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
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled',
      generateStatsFile: true,
      statsOptions: { source: false }
    }),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, '../node_modules/react/umd/react.production.min.js'),
        to: utils.assetsPath('js')
      },
      {
        from: path.join(
          __dirname,
          '../node_modules/react-dom/umd/react-dom.production.min.js'
        ),
        to: utils.assetsPath('js')
      }
    ])
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
