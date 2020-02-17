const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.config');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, '/dist'),
    host: "0.0.0.0",
    port: 4000,
    historyApiFallback: true, // 作用所有的404都连接到index.html
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
})