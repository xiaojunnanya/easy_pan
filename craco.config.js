/*
 * @Author: XJN
 * @Date: 2023-10-06 02:28:35
 * @LastEditors: xiaojunnanya
 * @LastEditTime: 2023-10-06 02:28:42
 * @FilePath: \easy_pan\craco.config.js
 * @Description: 
 * @前端实习生: 鲸落
 */
const path = require("path")
module.exports = {
  webpack:{
    alias:{
      "@":path.resolve(__dirname,"src")
    }
  },
}