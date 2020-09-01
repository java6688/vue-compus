// vue.config.js
module.exports = {
  // 解决打包编译问题
  css: {
    extract: false
  },
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
    // 关闭eslint语法检查
    overlay: {
      warnings: false,
      errors: false
    },
  },
  lintOnSave: false
}