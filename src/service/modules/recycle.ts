import { jlReq } from ".."

// 获取回收站的列表
export const getRecycleList = (pageNo?: number, pageSize?: number) => {
    return jlReq.request({
        method:'post',
        url:"/recycle/loadRecycleList",
        data:{
            pageNo: pageNo || 1,
            pageSize: pageSize || 100
        }
    })
}

// 恢复文件
export const restore = (fileIds: string) => {
    return jlReq.request({
        method:'post',
        url:"/recycle/recoverFile",
        data:{
            fileIds
        }
    })
}

// 彻底删除文件
export const deleteFile = (fileIds: string) => {
    return jlReq.request({
        method:'post',
        url:"/recycle/delFile",
        data:{
            fileIds
        }
    })
}