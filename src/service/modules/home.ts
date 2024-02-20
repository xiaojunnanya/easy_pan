
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

/**
 * 预览
 * @param fileId 
 * @returns 
 */
export const previewFile = (fileId: string) =>{
    return `/api/file/getFile/${fileId}`
}

/**
 * 获取文件流
 * @param fileId 
 * @returns 
 */
export const getFileDetailInfo = (fileId: string, isDoc: boolean) =>{
    return jlReq.request({
        method:'post',
        url:`/file/getFile/${fileId}`,
        responseType:isDoc ? 'blob' : 'arraybuffer'
    })
}

/**
 * 下载文件
 * @param code 
 * @returns 
 */
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
    fileNameFuzzy?: string, // 模糊搜索文件名
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


/**
 * 获取文件内容信息
 * @param fileId 
 * @returns 
 */
export const getFileInfo = (fileId: string) =>{
    return jlReq.request({
        method:'get',
        url:`/file/getFile/${fileId}`
    })
}

/**
 * 文件重命名
 * @param data 
 * @returns 
 */
export const changeFileName = (data: {fileId: string, fileName: string}) =>{
    return jlReq.request({
        method:'post',
        url:'/file/rename',
        data
    })
}

/**
 * 获取下载文件的code
 * @param id 
 * @returns 
 */
export const getDownCode = (id: string) =>{
    return jlReq.request({
        method:'post',
        url:`/file/createDownloadUrl/${id}`
    })
}

/**
 * 删除到回收站
 * @param fileIds 
 * @returns 
 */
export const delFileToRecycle = (fileIds: string) =>{
    return jlReq.request({
        method:'post',
        url:'/file/delFile',
        data:{
            fileIds
        }
    })
}

/**
 * 新建文件夹
 * @param fileName 
 * @param filePid 
 * @returns 
 */
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

/**
 * 获取所有目录
 * @param filePid 文件id
 * @param currentFileIds 
 * @returns 
 */
export const getLoadAllFolder = (filePid: string, currentFileIds?: string) =>{
    return jlReq.request({
        method:'post',
        url:'/file/loadAllFolder',
        data:{
            filePid, 
            currentFileIds: currentFileIds || 0
        }
    })
}

/**
 * 移动文件
 * @param fileIds 所选文件ID
 * @param filePid 文件父ID
 * @returns 
 */
export const removeFileFolder = (fileIds: string, filePid: string) =>{
    return jlReq.request({
        method:'post',
        url:'/file/changeFileFolder',
        data:{
            fileIds,
            filePid
        }
    })
}

// 修改密码
export const updatePassword = (password: string) =>{
    return jlReq.request({
        method:'post',
        url:'/updatePassword',
        data:{password}
    })
}