/*
 * @Author: XJN
 * @Date: 2023-10-06 14:57:20
 * @LastEditors: xiaojunnanya
 * @LastEditTime: 2023-10-06 14:58:01
 * @FilePath: \easy_pan\src\setupProxy.js
 * @Description: 配置跨域
 * @前端实习生: 鲸落
 */
// setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function(app) {
    app.use(
        createProxyMiddleware('/api', { 
            target: 'http://localhost:7090/',
            changeOrigin: true,
            pathRewrite: {
                "^/api": "/api"
            }
        })
    )
}