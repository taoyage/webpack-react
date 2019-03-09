const path = require('path');

module.exports = {
  dev: {
    // public path
    assetsPublicPath: '/',
    // 生成source map
    devtool: 'eval-source-map',
    // 主机名
    host: 'localhost',
    // 端口号
    port: '3001',
    // 是否自动打开浏览器
    autoOpenBrowser: true,
    // 是否在浏览器中显示eslint错误提示遮罩层
    showEslintErrorsInOverlay: true,
    // 显示浏览器提示遮罩层
    errorOverlay: true,
    poll: true,
    title: 'demo',
    // 代理配置
    proxyTable: {},
    // 可注入的环境变量
    NODE_ENV: {}
  },
  build: {
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsPublicPath: '/',
    productionSourceMap: true,
    devtool: 'source-map',
    title: 'demo',
    NODE_ENV: {}
  }
};
