const { defineConfig } = require('@vue/cli-service')
module.exports = {
  devServer: {
    port: 3000, // 前端开发服务器运行的端口
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // Spring Boot应用程序的地址
        changeOrigin: true
      }
    }
  }
}