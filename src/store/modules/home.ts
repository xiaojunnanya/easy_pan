import { createSlice } from '@reduxjs/toolkit'

const countSlice = createSlice({
    name:"home",
    initialState:{
        isLoading: false,
        filePid: '0',
        btnDisabled: true,
        selectKeys: []
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
        changeSelectKeys(state, action){
            state.selectKeys = action.payload
        }
    }
})

export const { changeLoading, changeFilePid, changeBtnDisabled, changeSelectKeys } = countSlice.actions

export default countSlice.reducer