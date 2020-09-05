// vue.config.js
const path = require('path');
const CompressionPlugin = require("compression-webpack-plugin")

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
  // outputDir: 'dist',
  // assetsDir: 'static',
  // 配置指导路径别名 start
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@assets', resolve('src/assets'))
      .set('@components', resolve('src/components'))
      .set('@views', resolve('src/views'))
    // 这里只写了两个，你可以自己再加，按这种格式.set('', resolve(''))
    // config
    //   .plugin('webpack-bundle-analyzer')
    //   .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
  },
  // 配置指导路径别名 end
  configureWebpack: {
    plugins: [
        new CompressionPlugin({
            test: /\.(js|css)(\?.*)?$/i,//需要压缩的文件正则
            threshold: 10240,//文件大小大于这个值时启用压缩
            deleteOriginalAssets: true//压缩后保留原文件
        })
    ]
  }
}