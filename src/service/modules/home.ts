
import { jlReq } from "..";

/**
 * 获取头像
 * @param userId 
 * @returns 链接
 */
export const getHeaderImg = ( id: string ) =>{
    return `/api/getAvatar/${id}`
}

/**
 * 获取图片地址
 * @param img 
 * @returns 
 */
export const getImage = ( img: string | null ) =>{
    return `/api/file/getImage/${img}`
}

/**
 * 获取音频
 * @param id 
 * @returns 
 */
export const getVoice = ( id: string) =>{
    return `/api/file/getFile/${id}`
}

/**
 * 获取视频地址
 * @param video 
 * @returns 
 */
export const getVideo = ( video: string | null ) =>{
    return `/api/file/ts/getVideoInfo/${video}`
}

// 下载文件
export const downloadFile = (code: string) =>{
    return `/api/file/download/${code}`
}

/**
 * 获取用户空间
 * @returns 
 */
export const space = () =>{
    return jlReq.request({
        method:'get',
        url:"/getUseSpace",
    })
}


/**
 * 退出登录
 * @returns 
 */
export const logout = () =>{
    return jlReq.request({
        method:'get',
        url:"/logout",
    })
}

interface dataListType{
    category: string, // 分类
    filePid: string,  // 父文件ID
    fileNameFuzzy?: string, // 文件名
    pageNo?: string, // 页码
    pageSize?: string // 分页大小
}
/**
 * 获取所有的文件
 * @param data 
 * @returns 
 */
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
export const getFileInfo = (fileId: string) =>{
    return jlReq.request({
        method:'get',
        url:`/file/getFile/${fileId}`
    })
}

// 文件重命名
export const changeFileName = (data: {fileId: string, fileName: string}) =>{
    return jlReq.request({
        method:'post',
        url:'/file/rename',
        data
    })
}

// 获取下载文件的code
export const getDownCode = (id: string) =>{
    return jlReq.request({
        method:'post',
        url:`/file/createDownloadUrl/${id}`
    })
}

// 删除到回收站
export const delFileToRecycle = (fileIds: string) =>{
    return jlReq.request({
        method:'post',
        url:'/file/delFile',
        data:{
            fileIds
        }
    })
}

// 新建文件夹
export const createFolder = (fileName: string, filePid: string) =>{
    return jlReq.request({
        method:'post',
        url:'/file/newFoloder',
        data:{
            filePid : filePid,
            fileName: fileName
        }
    })
}