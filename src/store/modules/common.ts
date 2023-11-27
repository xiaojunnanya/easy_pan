import { createSlice } from '@reduxjs/toolkit'

const countSlice = createSlice({
    name:"common",
    initialState:{
        isLoading: false,
        selectKeys: [],
    },
    reducers:{
        changeLoading(state, action){
            state.isLoading = action.payload
        },
        changeSelectKeys(state, action){
            state.selectKeys = action.payload
        }
    }
})

export const { changeLoading, changeSelectKeys } = countSlice.actions

export default countSlice.reducer