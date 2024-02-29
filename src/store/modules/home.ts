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
        changeFilePid(state, { payload }){
            // 因为历史问题，这里改为用字符串的方式来处理，同时再设置一个参数来改为数组形式
            state.filePid = payload
            let a: string[] = [...state.fileInfo.filePid]
            a.push(payload)
            state.fileInfo.filePid = a
        },
        changeFileName(state, { payload }){
            // 保证 filepid 和 fileName 的格式相同
            state.fileName = state.fileName + '/' + payload

            let a: string[] = [...state.fileInfo.fileName]
            a.push(payload)
            state.fileInfo.fileName = a
        },
        changeBtnDisabled(state, { payload }){
            state.btnDisabled = payload
        },
        changeGetDataMethod(state, { payload }){
            state.getDataMethod = payload
        }
    }
})

export const { changeFilePid, changeBtnDisabled, changeFileName, changeGetDataMethod } = countSlice.actions

export default countSlice.reducer