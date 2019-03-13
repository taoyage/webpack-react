const path = require('path');
const config = require('../.webpackrc');
const HappyPack = require('happypack');
const os = require('os');
const utils = require('./utils');

// 根据系统的内核数量指定线程池个数
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

// 环境变量
const NODE_ENV = process.env.NODE_ENV;

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

const createLintingRule = () => ({
  test: /\.jsx?$/,
  exclude: /node_modules/,
  enforce: 'pre',
  include: resolve('src'),
  use: 'happypack/loader?id=eslint'
});

module.exports = {
  context: resolve('/'),
  entry: {
    app: './src/index'
  },
  output: {
    filename: '[name].[hash:8].js',
    path: config.build.assetsRoot,
    publicPath: NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath
  },
  resolve: {
    // 优化模块查找路径
    modules: ['node_modules'],
    alias: {
      '@': resolve('src'),
      components: resolve('src/component'),
      views: resolve('src/views'),
      router: resolve('src/router')
    }
  },
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        include: resolve('src'),
        use: 'happypack/loader?id=babel'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        exclude: /node_modules/,
        include: resolve('src'),
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(sa|sc|c|le)ss$/,
        exclude: /node_modules/,
        include: resolve('src'),
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HappyPack({
      id: 'babel',
      loaders: ['babel-loader?cacheDirectory'],
      threadPool: happyThreadPool
    }),
    new HappyPack({
      id: 'eslint',
      loaders: [
        {
          loader: 'eslint-loader',
          options: {
            formatter: require('eslint-friendly-formatter'),
            emitWarning: !config.dev.showEslintErrorsInOverlay
          }
        }
      ],
      threadPool: happyThreadPool,
      verbose: true
    })
  ]
};
