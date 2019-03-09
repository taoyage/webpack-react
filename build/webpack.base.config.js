const path = require('path');
const config = require('./config');
const HappyPack = require('happypack');
const os = require('os');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// 根据系统的内核数量指定线程池个数
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

// 环境变量
const NODE_ENV = process.env.NODE_ENV;

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

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
      'components': resolve('src/component'),
      'views': resolve('src/views')
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        include: resolve('src'),
        use: 'happypack/loader?id=babel'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      },
      {
        test: /\.(sa|sc|c|le)ss$/,
        exclude: /node_modules/,
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
      threadPool: happyThreadPool,
      verbose: true
    }),
    new CleanWebpackPlugin()
  ]
};
