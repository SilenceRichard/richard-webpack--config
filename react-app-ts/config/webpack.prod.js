const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.config');
const PurifyCSS = require('purifycss-webpack');
const glob = require('glob-all');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  optimization: {
    usedExports: true, // webpack为了方便调试，dev的tree shaking不生效
  },
  plugins: [
    // 清除无用css
    new PurifyCSS({
      paths: glob.sync([
        // 需要做 css tree shaking 的路径文件
        path.resolve(__dirname, '/src/*.html'),
        path.resolve(__dirname, '/src/*.js')
      ])
    })
  ]
});