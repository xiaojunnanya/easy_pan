import { jlReq } from "..";

// 获取头像
export const getHeaderImg = ( userId: string ) =>{
    return `http://netdisk.kbws.xyz/api/getAvatar/${userId}`
}

// 获取用户空间
export const space = () =>{
    return jlReq.request({
        method:'get',
        url:"/getUseSpace",
    })
}

// 修改头像
export const changeHeadImg = () =>{
    return 'http://netdisk.kbws.xyz/api/updateUserAvatar'
}

// 退出登录
export const logout = () =>{
    return jlReq.request({
        method:'get',
        url:"/logout",
    })
}

// 获取所有的文件
interface dataListType{
    category: string, // 分类
    filePid: string,  // 父文件ID
    fileNameFuzzy?: string, // 文件名
    pageNo?: string, // 页码
    pageSize?: string // 分页大小

}
export const getDataList = (data: dataListType) =>{
    return jlReq.request({
        method:'post',
        url:"/file/loadDataList",
        data:{
            ...data,
            // pageNo : data.pageNo || 1,
            pageSize : 100
        }
    })
}

// 获取文件信息
// http://127.0.0.1:7090/api/file/getFile/{fileId}
export const getFileInfo = (fileId: string) =>{
    return jlReq.request({
        method:'get',
        url:`/file/getFile/${fileId}`
    })
}

// 获取pdf
export const getPdf = (fileId: string) =>{
    return jlReq.getUrl({
        method:'get',
        url:`/file/getFile/${fileId}`
    })
}