const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: {
    lib: ['react', 'react-dom', 'react-router-dom']
  },
  output: {
    filename: '[name].js',
    library: '[name]',
    path: path.join(__dirname, '../dist/dll')
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]',
      path: path.join(__dirname, '../dist/dll', '[name].manifest.json')
    })
  ]
};
