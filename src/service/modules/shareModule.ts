/*
 * @Author: XJN
 * @Date: 2023-12-08 14:37:10
 * @LastEditors: xiaojunnanya
 * @LastEditTime: 2023-12-11 15:29:34
 * @FilePath: \easy_pan\src\service\modules\shareModule.ts
 * @Description: 
 * @前端实习生: 鲸落
 */
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

/**
 * 校验分享码
 * @param shareId 
 * @param code 
 * @returns 
 */
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

/**
 * 获取文件分享列表
 * @param shareId 分享id
 * @param filePid 父级ID
 * @returns 
 */
export const loadFileList = (shareId: string, filePid: string) => {
    return jlReq.request({
        method:'post',
        url:"/showShare/loadFileList",
        data:{
            shareId,
            filePid
        }
    })
}