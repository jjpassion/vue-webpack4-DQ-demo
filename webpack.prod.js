const path = require('path')
const merge = require('webpack-merge')
// js 压缩插件 -- webpack4 默认启用js压缩
// 4.x之前可用uglifyjs-webpack-plugin用以压缩文件，4.x可用--mode更改模式为production来压缩文件
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const common = require('./webpack.base.js')
// const webpack = require('webpack');

module.exports = merge(common, {
  /*
   【chunkhash】:某个文件发生改变时，仅对应模块hash值改变
  */
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, './dist')
  },
  mode: 'production',
  devtool: 'source-map',
  /*
   【单独打包node_modules】
    test: 选项控制当前缓存组选择哪个模块。
    priority: 缓存优先级（默认优先级为负数，以便任意自定义的缓存组都优先级都会更高）
    chunks: 表示显示块的范围，有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为all;
    minSize: 表示在压缩前的最小模块大小，默认为0；
    minChunks: 表示被引用次数，默认为1；
  */
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'all',
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          priority: -20,
          minChunks: 2
        }
      }
    }
  },
  // plugins: [
  //   new UglifyJSPlugin({
  //     sourceMap: true
  //   })
  // ]
});
