/*
 * @Author: XJN
 * @Date: 2023-10-06 14:50:52
 * @LastEditors: xiaojunnanya
 * @LastEditTime: 2023-11-30 20:11:35
 * @FilePath: \easy_pan\src\service\modules\login.ts
 * @Description: 
 * @前端实习生: 鲸落
 */
import { jlReq } from "..";

// 获取验证码图片
export const checkCodeServer = ( type: number = 0,time: number ) =>{
    return `/api/checkCode?type=${type}&time=${time}`
}

// 登录
export const loginServer = ( email: string,password: string, checkCode: string ) =>{
    return jlReq.request({
        method:'POST',
        url:'/login',
        data:{
            email, password, checkCode
        }
    })
}