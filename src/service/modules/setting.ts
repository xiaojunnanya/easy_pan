import { jlReq } from ".."

/**
 * 获取用户列表
 * @param pageNo 
 * @param pageSize 
 * @param nickNameFuzzy 昵称模糊搜索
 * @param status 状态
 */
export const getUserList = (data?:{
    pageNo?: string, pageSize?: string, nickNameFuzzy?: string, status?: string
}) => {
    return jlReq.request({
        url: '/admin/loadUserList',
        method: 'post',
        data: {
            ...data,
            pageNo: data?.pageNo || 1,
            pageSize: data?.pageSize || 100
        }
    })
}


/**
 * 修改用户状态
 * @param userId 用户ID
 * @param status 状态
 * @returns 
 */
export const updateUserStatus = (userId: string, status: string) => {
    return jlReq.request({
        url: '/admin/updateUserStatus',
        method: 'post',
        data: {
            userId,
            status
        }
    })
}