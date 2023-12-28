/*
 * @Author: XJN
 * @Date: 2023-10-05 21:13:02
 * @LastEditors: xiaojunnanya
 * @LastEditTime: 2023-12-28 15:44:18
 * @FilePath: \easy_pan\src\service\config\index.ts
 * @Description: 
 * @前端实习生: 鲸落
 */
export const TIMEOUT = 10000

// 设置开发环境和生产环境
export let BASE_URL = '' 
export let SHOW_BASE_URL = 'http://netdisk.kbws.xyz'
if(process.env.NODE_ENV === 'development'){
    BASE_URL = '/api'
}else{
    BASE_URL = ''
}