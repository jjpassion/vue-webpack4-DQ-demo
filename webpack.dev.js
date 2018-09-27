// const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.base.js')
const webpack = require('webpack')
const path = require('path')
const ip = require('ip')

module.exports = merge(common, {
  /*【文件出口】*/
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './dist')
  },

  /*
  【webpack新增-——开发模式】
  【配置】mode:'development'
  【特点】自动开启代码压缩,自动注入环境变量process.env.NODE_ENV
  */
  mode: 'development',
  devtool: 'inline-source-map',

  /*
  【webpack-dev-server-——仅用于开发模式】
  【port】    端口
  【host】    主机地址
  【overlay】 实时显示错误
  【open】    启动时自动打开页面
  【hot】     开启热加载模式，局部刷新——搭配热加载插件
  */
  // 开发服务器配置
  devServer: {
    port: 3232,
    host: ip.address(),  // (默认为localhost，可以配成0.0.0.0或者本机的ip地址, 这里配置的就是本机ip
    overlay: { // 实时显示报错信息
      errors: true
    },
    hot: true, // 启用热更新，局部模块刷新
    open: true // 启动服务，打开浏览器
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
});
