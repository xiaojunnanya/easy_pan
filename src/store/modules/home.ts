import { createSlice } from '@reduxjs/toolkit'

const countSlice = createSlice({
    name:"home",
    initialState:{
        filePid: '0',
        btnDisabled: true
    },
    reducers:{
        changeFilePid(state, { payload }){
            state.filePid = payload
        },
        changeBtnDisabled(state, { payload }){
            state.btnDisabled = payload
        }
    }
})

export const { changeFilePid, changeBtnDisabled } = countSlice.actions

export default countSlice.reducer