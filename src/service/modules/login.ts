import { jlReq } from "..";

// 获取验证码图片
export const checkCodeServer = ( type: number = 0,time: number ) =>{
    return `http://netdisk.kbws.xyz/api/checkCode?type=${type}&time=${time}`
}

// 登录
export const loginServer = ( email: string,password: string, checkCode: string ) =>{
    return jlReq.request({
        method:'POST',
        url:'/login',
        headers:{
            'Content-Type':'application/x-www-form-urlencoded'
        },
        data:{
            email, password, checkCode
        }
    })
}