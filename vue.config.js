const path = require('path')

function resolve(dir) {
    return path.join(__dirname, '.', dir)
}
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
                target: 'http://122.51.15.88:7000',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '',//重写,
                }
            }
        }
    },
    chainWebpack: config => {
        config.module.rules.delete("svg"); //重点:删除默认配置中处理svg,
        //const svgRule = config.module.rule('svg')
        //svgRule.uses.clear()
        config.module
            .rule('svg-sprite-loader')
            .test(/\.svg$/)
            .include
            .add(resolve('src/icons')) //处理svg目录
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
    },
    configureWebpack: () => ({
        // resolve: {
        //   alias: require('./alias.config').webpack
        // }
        // module: {
        //   rules: [{
        //     test: /\.svg$/,
        //     use: [{
        //       loader: "svg-sprite-loader",
        //       options: {
        //         symbolId: 'icon-[name]'
        //       }
        //     }]
        //   }]
        // }
    })
}





