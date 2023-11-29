import { jlReq } from ".."

/**
 * 获取用户列表
 * @param pageNo 
 * @param pageSize 
 * @param nickNameFuzzy 昵称模糊搜索
 * @param status 状态
 */
export const getUserList = (pageNo?: string, pageSize?: string, nickNameFuzzy?: string, status?: string) => {
    return jlReq.request({
        url: '/admin/loadUserList',
        method: 'post',
        data: {
            pageNo: pageNo || 1,
            pageSize: pageSize || 100,
            nickNameFuzzy,
            status
        }
    })
}