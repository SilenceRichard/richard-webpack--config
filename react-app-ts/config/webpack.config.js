const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HappyPack = require('happypack');

module.exports = {
  mode: 'development',
  entry: {
    app: './src/index.tsx',
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      "@": path.join(__dirname, "../src"),
      pages: path.join(__dirname, "../src/pages"),
      router: path.join(__dirname, "../src/router"),
    }
  },
  optimization: {
    splitChunks: {
      chunks: "all", // 所有的chunks 代码公共的部分分离出来为一个单独的文件
    }
  },
  output: {
    // output catalog
    path: path.join(__dirname, '../dist'),
    filename: 'bundle.js',
    // publicPath: 'xxx' // CDN静态资源路径
  },
  module: {
    rules: [
      // {
      //   test: /\.ts(x?)$/,
      //   use: 'ts-loader',
      //   exclude: /node_modules/,
      // },
      {
        test: /\.(js(x?)|ts(x?))$/,
        exclude: /node_modules/,
        use: [
          {
            // 使用happypack 优化，并发打包
            loader: "happypack/loader?id=tsxfiles"
          }
        ]
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          // 分离css 不再需要style-loader
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [require('autoprefixer')]
            }
          },
          "sass-loader"
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            outputPath: 'images/', // 图片输出路径
            limit: 10 * 1024
          }
        }
      },
      {
        test: /\.(eot|woff2?|ttf|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name]-[hash:5].min.[ext]',
              limit: 5000,
              publicPath: '/public/fonts',
              outputPath: 'fonts/'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html', // final html name
      template: path.join(__dirname, '../public/template.html') // 指定模板路径
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new HappyPack({
      // 用唯一的标识符id，表示当前的happypack用来处理一类特定的文件
      id: 'tsxfiles',
      // 如何处理.js文件
      loaders: ['babel-loader'],
    })
  ],
}