// webpack.config.js
const webpack = require("webpack")
// vue 解析-webpack4 兼容插件
const VueLoaderPlugin = require('vue-loader/lib/plugin')
// 自动生成html文件
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 单独打包css
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const path = require('path')
const ip = require('ip')

module.exports = {
  entry: './src/index.js', // 入口文件
  output: {
    filename: "bundle.js", // 打包后的文件名称
    path: path.resolve(__dirname, 'dist') // 打包后的目录， 必须是绝对路径
  }, // 出口文件
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000, // 判断图片大小，是否采用base64
          name: '[name].[hash:7].[ext]'
        }
      },
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
      // {
      //   test: /\.css$/,
      //   use: ['style-loader', 'css-loader'] // 从右向左解析
      //   /*
      //   也可以这样写，这种方式方便写一些配置参数
      //   use: [
      //     {loader: 'style-loader'},
      //     {loader: 'css-loader'}
      //   ]
      //   */
      // },
      {
        test: /\.css$/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      }
    ]
  }, // 处理对应模块
  plugins: [
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextWebpackPlugin('[name].css', {allChunks: false}),
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ], // 对应插件
  // 开发服务器配置
  devServer: {
    port: 3232,
    host: ip.address(),  // (默认为localhost，可以配成0.0.0.0或者本机的ip地址, 这里配置的就是本机ip
    overlay: { // 实时显示报错信息
      errors: true
    },
    hot: true, // 启用热更新，局部模块刷新
    open: true // 启动服务，打开浏览器
  }
  // mode: "production" // 模式配置 production development
}
