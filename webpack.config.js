/* // 引入一个包
const path = require('path');

// webpack所有的配置信息都应该协助对象中
module.exports = {
  // 指定入口文件
  entey: './src.main.js',

  // 指定打包文件所在目录
  output: {
    // 指定打包出来文件的目录
    path: path.resolve(__dirname, 'dist')
  },

  // 指定webpack打包时要使用的模块
  module: {
    // 指定加载的规则
    reles: [
      // 设置less文件的处理
      {
        // test指定的是规则生效的文件
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          "less-loader"
        ]
      }
    ]
  }
} */