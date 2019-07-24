const path = require('path');

module.exports = {
  dev: {
    // public path
    assetsPublicPath: '/',
    // 静态文件根目录
    assetsSubDirectory: 'static',
    // 生成source map
    devtool: 'eval-source-map',
    // 主机名
    host: 'localhost',
    compress: true,
    // 端口号
    port: '3002',
    // 是否自动打开浏览器
    autoOpenBrowser: true,
    // 是否使用eslint
    useEslint: true,
    // 是否在浏览器中显示eslint错误提示遮罩层
    showEslintErrorsInOverlay: false,
    // 显示浏览器提示遮罩层（此项如果设置为false，showEslintErrorsInOverlay也设置为false）
    errorOverlay: false,
    poll: true,
    title: 'demo',
    // 代理配置
    proxyTable: {},
    // 可注入的环境变量
    NODE_ENV: {},
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  build: {
    assetsRoot: path.resolve(__dirname, './dist'),
    assetsPublicPath: '/',
    assetsSubDirectory: 'static',
    productionSourceMap: true,
    devtool: 'source-map', // source-map
    title: 'demo',
    NODE_ENV: {}
  }
};
