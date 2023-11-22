import { createSlice } from '@reduxjs/toolkit'

const recycleSlice = createSlice({
    name:"home",
    initialState:{
        selectKeys: []
    },
    reducers:{
        changeSelectKeys(state, action){
            console.log('action.payload', action.payload);
            
            state.selectKeys = action.payload
        }
    }
})

export const { changeSelectKeys } = recycleSlice.actions

export default recycleSlice.reducer