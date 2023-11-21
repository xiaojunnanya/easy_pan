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