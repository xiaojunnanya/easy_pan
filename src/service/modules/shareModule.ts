import { jlReq } from ".."

/**
 * 获取分享信息
 * @param shareId 
 * @returns 
 */
export const getShareInfo = (shareId: string) => {
    return jlReq.request({
        method:'post',
        url:"/showShare/getShareInfo",
        data:{
            shareId
        }
    })
}

/**
 * 获取用户登录信息：登录data有消息，没有就是null，null返回到checkshare
 * @param shareId 
 * @returns 
 */
export const getShareLoginInfo = (shareId: string) => {
    return jlReq.request({
        method:'post',
        url:"/showShare/getShareLoginInfo",
        data:{
            shareId
        }
    })
}

// 校验分享码
// http://127.0.0.1:7090/api/showShare/checkShareCode
export const checkShareCode = (shareId: string, code: string) => {
    return jlReq.request({
        method:'post',
        url:"/showShare/checkShareCode",
        data:{
            shareId,
            code
        }
    })
}