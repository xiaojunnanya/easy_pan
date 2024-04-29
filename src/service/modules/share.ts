// http://127.0.0.1:7090/api/share/shareFile

import { jlReq } from ".."
import { SHOW_BASE_URL } from "../config"

// 分享文件
export const shareFile = (fileId: string, validType: string, codeType: string, code?: string) => {
    return jlReq.request({
        method:'POST',
        url:'/share/shareFile',
        data:{
            fileId,
            validType,
            codeType,
            code
        }
    })
}

// 生成分享文件url
export const shareFileUrl = (shareId: string) => {
    // return `/api/share/${shareId}`
    return SHOW_BASE_URL + `/share/${shareId}`
}

// 获取分享文件列表
export const loadShareList = (pageNo?: number, pageSize?: number) => {
    return jlReq.request({
        method:'POST',
        url:'/share/loadShareList',
        params:{
            pageNo: pageNo || 1,
            pageSize: pageSize || 100
        }
    })
}

// 取消分享
export const cancelShare = (shareIds: string) => {
    return jlReq.request({
        method:'POST',
        url:'/share/cancelShare',
        data:{
            shareIds
        }
    })
}


/**
 * 保存到我的网盘
 * @param shareId 分享id
 * @param shareFileIds 分享的文件ID
 * @param myFolderId 我的网盘目录ID
 * @returns 
 */
export const saveToMyDisk = (shareId: string, shareFileIds: string, myFolderId?: string) => {
    return jlReq.request({
        method:'POST',
        url:'/showShare/saveShare',
        data:{
            shareId, shareFileIds,
            myFolderId: '0'
        }
    })
}