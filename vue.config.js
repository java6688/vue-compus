// vue.config.js
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  // 解决打包编译问题 start
  css: {
    extract: false
  },
  // 解决打包编译问题 end
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080/mock',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    // 关闭eslint语法检查 start
    overlay: {
      warnings: false,
      errors: false
    },
  },
  lintOnSave: false,
  // 关闭eslint语法检查 end
  // 配置指导路径别名 start
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@assets', resolve('src/assets'))
      .set('@components', resolve('src/components'))
      .set('@views', resolve('src/views'))
    // 这里只写了两个，你可以自己再加，按这种格式.set('', resolve(''))
  },
  // 配置指导路径别名 end
}