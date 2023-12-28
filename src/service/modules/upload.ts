/*
 * @Author: XJN
 * @Date: 2023-12-28 14:56:50
 * @LastEditors: xiaojunnanya
 * @LastEditTime: 2023-12-28 16:46:50
 * @FilePath: \easy_pan\src\service\modules\upload.ts
 * @Description: 上传有关的接口
 * @前端实习生: 鲸落
 */
import { jlReq } from "..";



interface fileType{
    fileId: string,// 文件ID
    file: string, // 文件流
    fileName: string, // 文件名
    filePid?: string, // 文件父级ID
    fileMd5: string, // 文件MD5
    chunkIndex: string, // 当前分片索引
    chunks: string, //总分片数
}

// 文件分片上传
export const uploadChunkFile = ( file: fileType ) =>{
    console.log('file', file);
    // debugger
    return jlReq.request({
        url: '/file/uploadFile',
        method: 'post',
        headers:{
            "Content-Type":'multipart/form-data'
        },
        data: {
            ...file
        }
    })
}
