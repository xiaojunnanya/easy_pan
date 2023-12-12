/*
 * @Author: XJN
 * @Date: 2023-11-14 18:02:20
 * @LastEditors: xiaojunnanya
 * @LastEditTime: 2023-12-11 17:04:58
 * @FilePath: \easy_pan\src\store\modules\home.ts
 * @Description: 
 * @前端实习生: 鲸落
 */
import { createSlice } from '@reduxjs/toolkit'

const countSlice = createSlice({
    name:"home",
    initialState:{
        filePid: '0',
        fileName:['全部文件'],
        btnDisabled: true
    },
    reducers:{
        changeFilePid(state, { payload }){
            state.filePid = payload
        },
        changeFileName(state, { payload }){
            const a = [...state.fileName]
            console.log('payload', payload);
            a.push(payload)
            state.fileName = a
        },
        changeBtnDisabled(state, { payload }){
            state.btnDisabled = payload
        }
    }
})

export const { changeFilePid, changeBtnDisabled, changeFileName } = countSlice.actions

export default countSlice.reducer