'use strict'
// const path = require('path')
module.exports = {

    devServer: {
        open: false, // 自动启动项目
        host: "localhost", // 主机
        port: 8080, // 端口号
        https: false, // 是否开启https
        hotOnly: false, // 是否热更新
        proxy: {
            // 跨域配置
            '/api': {
                target: 'http://122.51.15.88:8001',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '',//重写,
                }
            }
        }
    }

}