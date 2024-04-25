import { createSlice } from '@reduxjs/toolkit'

const countSlice = createSlice({
    name:"common",
    initialState:{
        isLoading: false,
        selectKeys: [],
        messageApi:{
            type:'',
            info:'',
        },
    },
    reducers:{
        // 内容区域的加载
        changeLoading(state, action){
            state.isLoading = action.payload
        },
        // 表格选择数据
        changeSelectKeys(state, action){
            state.selectKeys = action.payload
        },
        // 全局消息提示
        changeMessageApi(state, action){
            state.messageApi = action.payload
        }
    }
})

export const { changeLoading, changeSelectKeys, changeMessageApi } = countSlice.actions

export default countSlice.reducer