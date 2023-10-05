/*
 * @Author: XJN
 * @Date: 2023-10-06 02:30:44
 * @LastEditors: xiaojunnanya
 * @LastEditTime: 2023-10-06 02:31:22
 * @FilePath: \easy_pan\src\service\modules\fileUpload.ts
 * @Description: 
 * @前端实习生: 鲸落
 */

import { jlReq } from ".."

// 大文件上传
export const largeFileUpload = (fileId: string, file: any, fileName: string, 
    fileMd5: any, chunkIndex: number, chunks: number) =>{
    return jlReq.post({
        url:"/file/uploadFile",
        headers:{
            'Content-Type':'application/form-data',
            'Cookies': 'JSESSIONID=240639CCE0A46CAF523B75F3AEFF6657; userInfo=%7B%22nickName%22%3A%22%E9%B2%B8%E8%90%BD%22%2C%22userId%22%3A%224368633931%22%2C%22avatar%22%3Anull%2C%22admin%22%3Afalse%7D',
        },
        data:{
            fileId, file, fileName, fileMd5, chunkIndex, chunks
        }
    })
}
