import { createSlice } from '@reduxjs/toolkit'

const countSlice = createSlice({
    name:"home",
    initialState:{
        isLoading: false
    },
    reducers:{
        changeLoading(state, action){
            state.isLoading = action.payload
        }
    }
})

export const { changeLoading } = countSlice.actions

export default countSlice.reducer