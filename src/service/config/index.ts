import { disableReactDevTools } from "@/utils";

/*
 * @Author: XJN
 * @Date: 2023-10-05 21:13:02
 * @LastEditors: xiaojunnanya
 * @LastEditTime: 2024-01-05 11:55:55
 * @FilePath: \easy_pan\src\service\config\index.ts
 * @Description: 
 * @前端实习生: 鲸落
 */
export const TIMEOUT = 10000

// 设置开发环境和生产环境
export let BASE_URL = '/api' 
export let SHOW_BASE_URL = window.location.origin

// 线上环境禁用 React Components插件
if(process.env.NODE_ENV == 'production'){
    disableReactDevTools();
}