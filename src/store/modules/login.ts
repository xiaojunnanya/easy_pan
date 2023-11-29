import { createSlice } from '@reduxjs/toolkit'

const countSlice = createSlice({
    name:"login",
    initialState:{
        mode: 'login'
    },
    reducers:{
        changeMode(state, { payload }){
            state.mode = payload
        }
    }
})

export const { changeMode } = countSlice.actions

export default countSlice.reducer