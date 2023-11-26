import { jlReq } from "..";
import { SHOW_BASE_URL } from "../config";

// 获取验证码图片
export const checkCodeServer = ( type: number = 0,time: number ) =>{
    return SHOW_BASE_URL + `/api/checkCode?type=${type}&time=${time}`
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