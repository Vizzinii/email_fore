const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  devServer: {
    host: '0.0.0.0', // 确保监听所有网络接口
    port: 3000, // 前端开发服务器运行的端口
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // Spring Boot应用程序的地址
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
        logLevel: 'debug' // 添加日志级别以便调试
      }
    }
  }
})