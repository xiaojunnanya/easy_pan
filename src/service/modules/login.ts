/*
 * @Author: XJN
 * @Date: 2023-10-06 14:50:52
 * @LastEditors: xiaojunnanya
 * @LastEditTime: 2024-01-13 15:28:48
 * @FilePath: \easy_pan\src\service\modules\login.ts
 * @Description: 
 * @前端实习生: 鲸落
 */
import { jlReq } from "..";

/**
 * 获取验证码图片
 * @param type 
 * @param time 
 * @returns 
 */
export const checkCodeServer = ( type: number = 0,time: number ) =>{
    return `/api/checkCode?type=${type}&time=${time}`
}

/**
 * 登录
 * @param email 邮箱
 * @param password 密码
 * @param checkCode 验证码
 * @returns 
 */
export const loginServer = ( email: string,password: string, checkCode: string ) =>{
    return jlReq.request({
        method:'POST',
        url:'/login',
        data:{
            email, password, checkCode
        }
    })
}

/**
 * 忘记密码获取邮箱验证码
 * @param email 邮箱
 * @param type 0：注册 1：找回密码
 * @returns 
 */
export const sendEmailCodeServer = ( email: string, type: string ) =>{
    return jlReq.request({
        method:'POST',
        url:'/sendEmailCode',
        data:{
            email,
            checkCode: 'checkCode',
            type
        }
    })
}

/**
 * 重置密码
 * @param email 邮箱
 * @param password 重置的密码
 * @param checkCode 验证码
 * @param emailCode 邮箱的验证码
 * @returns 
 */
export const resetPwdServer = ( email: string, emailCode: string, password: string, checkCode: string ) =>{
    return jlReq.request({
        method:'POST',
        url:'/resetPwd',
        data:{
            email, password, checkCode,emailCode
        }
    })
}

// http://127.0.0.1:7090/api/register
// 注册
export const registerServer = ( email: string, nickName: string, password: string, checkCode: string, emailCode: string ) =>{
    return jlReq.request({
        method:'POST',
        url:'/register',
        data:{
            email, password, checkCode, nickName, emailCode
        }
    })
}