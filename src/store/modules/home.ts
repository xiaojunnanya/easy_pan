import { createSlice } from '@reduxjs/toolkit'

const countSlice = createSlice({
    name:"home",
    initialState:{
        isLoading: false,
        filePid: '0',
        btnDisabled: true
    },
    reducers:{
        changeLoading(state, action){
            state.isLoading = action.payload
        },
        changeFilePid(state, { payload }){
            state.filePid = payload
        },
        changeBtnDisabled(state, { payload }){
            state.btnDisabled = payload
        },
    }
})

export const { changeLoading, changeFilePid, changeBtnDisabled } = countSlice.actions

export default countSlice.reducer