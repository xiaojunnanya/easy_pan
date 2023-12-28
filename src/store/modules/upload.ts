import { createSlice } from '@reduxjs/toolkit'

const countSlice = createSlice({
    name:"upload",
    initialState:{
        isPopoverShow: false,
        file: {
            name:"",
        }
    },
    reducers:{
        changeIsPopoverShow(state, { payload }){
            state.isPopoverShow = payload
        },
        changeFile( state, { payload }){
            state.file = payload
        }
    }
})

export const { changeIsPopoverShow, changeFile } = countSlice.actions

export default countSlice.reducer