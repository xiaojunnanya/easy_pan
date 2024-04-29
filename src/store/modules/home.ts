/*
 * @Author: XJN
 * @Date: 2023-11-14 18:02:20
 * @LastEditors: xiaojunnanya
 * @LastEditTime: 2023-12-28 10:12:56
 * @FilePath: \easy_pan\src\store\modules\home.ts
 * @Description: 
 * @前端实习生: 鲸落
 */
import { createSlice } from '@reduxjs/toolkit'

/**
 * filePid: 文件夹的pid
 * fileName: 文件夹的名称，目前没有用到，先与filepid格式保持一致
 * fileInfo: 关于面包屑的数组
 */

interface IState{
    filePid: string,
    fileName: string
    btnDisabled: boolean,
    fileInfo:{
        filePid: string[],
        fileName: string[]
    },
    getDataMethod: () => void,
}

const initialState: IState = {
    filePid: '0',
    fileName:'全部文件',
    btnDisabled: true,
    fileInfo:{
        filePid: ['0'],
        fileName: ['全部文件']
    },
    getDataMethod: () => {},
}

const countSlice = createSlice({
    name:"home",
    initialState,
    reducers:{
        // 关于面包屑的设置
        changeFilePid(state, { payload }){
            state.filePid = payload
            // state.fileInfo.filePid.push(payload)
        },
        changeFileName(state, { payload }){
            // 保证 filepid 和 fileName 的格式相同
            const a = state.fileName + '/' + payload
            state.fileName = a
            // state.fileInfo.fileName.push(a)
        },
        // 按钮是否禁用
        changeBtnDisabled(state, { payload }){
            state.btnDisabled = payload
        },
        // src\views\Main\index.tsx：200
        changeGetDataMethod(state, { payload }){
            state.getDataMethod = payload
        }
    }
})

export const { changeFilePid, changeBtnDisabled, changeFileName, changeGetDataMethod } = countSlice.actions

export default countSlice.reducer