/*
 * @Author: XJN
 * @Date: 2023-12-18 17:04:24
 * @LastEditors: xiaojunnanya
 * @LastEditTime: 2023-12-28 15:28:17
 * @FilePath: \easy_pan\src\store\modules\upload.ts
 * @Description: 
 * @前端实习生: 鲸落
 */
import { createSlice } from '@reduxjs/toolkit'

const countSlice = createSlice({
    name:"upload",
    initialState:{
        isPopoverShow: false,
        file: {
            name:"",
        }
    },
    reducers:{
        // 上传弹窗区域的展示
        changeIsPopoverShow(state, { payload }){
            state.isPopoverShow = payload
        },
        // 文件信息
        changeFile( state, { payload }){
            state.file = payload
        }
    },
})

export const { changeIsPopoverShow, changeFile } = countSlice.actions

export default countSlice.reducer