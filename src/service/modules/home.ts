import axios from "axios";
import { jlReq } from "..";

// 获取头像
export const getHeaderImg = ( userId: string ) =>{
    return `/api/getAvatar/${userId}`
}

// 获取图片地址
export const getImage = ( img: string | null ) =>{
    // http://netdisk.kbws.xyz/api/file/getImage/
    return `/api/file/getImage/${img}`
}

// http://netdisk.kbws.xyz/api/file/ts/getVideoInfo/4xGwxqPPV7
// 获取视频地址
export const getVideo = ( video: string | null ) =>{
    return `/api/file/ts/getVideoInfo/${video}`
}

// 获取用户空间
export const space = () =>{
    return jlReq.request({
        method:'get',
        url:"/getUseSpace",
    })
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
// http://netdisk.kbws.xyz/api/file/download/{code}
// 下载文件
export const downloadFile = (code: string) =>{
    return `/api/file/download/${code}`
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
export const createFolder = (fileName?: string, filePid?: string) =>{
    return jlReq.request({
        method:'post',
        url:'/file/newFoloder',
        data:{
            filePid : filePid || '0',
            fileName: fileName || '新建文件夹'
        }
    })
}