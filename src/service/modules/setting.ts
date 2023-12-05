/*
 * @Author: XJN
 * @Date: 2023-11-28 10:33:35
 * @LastEditors: xiaojunnanya
 * @LastEditTime: 2023-12-05 15:23:36
 * @FilePath: \easy_pan\src\service\modules\setting.ts
 * @Description: 
 * @前端实习生: 鲸落
 */
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

/**
 * fileNameFuzzy
 * @param pageNo 
 * @param pageSize 
 * @param fileNameFuzzy 文件名模糊搜索
 * @returns 
 */
export const getFileList = (pageNo?: string, pageSize?:string, fileNameFuzzy?:string) =>{
    return jlReq.request({
        url: '/admin/loadFileList',
        method: 'post',
        data:{
            pageNo: pageNo || 1,
            pageSize: pageSize || 100,
            fileNameFuzzy: fileNameFuzzy
        }
    })
}

/**
 * admin删除
 * @param fileIdAndUserIds 文件和用户ID用_隔开，多个参数用 逗号隔开
 * @returns 
 */
export const adminDelFile = (fileIdAndUserIds: string) => {
    return jlReq.request({
        url: '/admin/delFile',
        method: 'post',
        data: {
            fileIdAndUserIds
        }
    })
}

/**
 * 获取系统设置
 * @returns 
 */
export const getSysSettings = () => {
    return jlReq.request({
        url: '/admin/getSysSettings',
        method: 'post',
    })
}

type FieldType = {
    registerEmailTitle: string;
    registerEmailContent: string;
    userInitUseSpace: string;
};
// 保存系统设置
export const saveSysSettings = (data: FieldType) => {
    return jlReq.request({
        url: '/admin/saveSysSettings',
        method: 'post',
        data
    })
}