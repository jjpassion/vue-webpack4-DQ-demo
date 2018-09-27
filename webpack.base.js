const webpack = require("webpack")
// vue 解析-webpack4 兼容插件
const VueLoaderPlugin = require('vue-loader/lib/plugin')
// 自动生成html文件
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 单独打包css 可以被 mini-css-extract-pugin 替换
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')

const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: './src/index.js', // 入口文件
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ['latest', 'stage-3']
        },
        exclude: /node_modules/
        // include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.css$/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000, // 判断图片大小，是否采用base64
          name: '[name].[hash:7].[ext]'
        }
      }
    ]
  }, // 处理对应模块
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(['dist']),
    //  每次清除dist 文件夹
    new ExtractTextWebpackPlugin('[name].css', {allChunks: false}),
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ]
}
