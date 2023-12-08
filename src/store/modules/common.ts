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
        changeLoading(state, action){
            state.isLoading = action.payload
        },
        changeSelectKeys(state, action){
            state.selectKeys = action.payload
        },
        changeMessageApi(state, action){
            state.messageApi = action.payload
        }
    }
})

export const { changeLoading, changeSelectKeys, changeMessageApi } = countSlice.actions

export default countSlice.reducer