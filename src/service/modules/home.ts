import { jlReq } from "..";

// 获取头像
export const headerImg = ( userId: string ) =>{
    return `http://netdisk.kbws.xyz/api//getAvatar/${userId}`
}

// 获取用户空间
export const space = () =>{
    return jlReq.request({
        method:'get',
        url:"/getUseSpace",
    })
}