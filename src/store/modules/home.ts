import { createSlice } from '@reduxjs/toolkit'

const countSlice = createSlice({
    name:"home",
    initialState:{
        filePid: '0',
        btnDisabled: true,
        selectKeys: []
    },
    reducers:{
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

export const { changeFilePid, changeBtnDisabled, changeSelectKeys } = countSlice.actions

export default countSlice.reducer