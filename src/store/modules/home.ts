import { createSlice } from '@reduxjs/toolkit'
import { useSearchParams } from 'react-router-dom'

// const [ searchParams ] = useSearchParams()
//     // 将其转为一个普通的对象
// const query = Object.fromEntries(searchParams.entries())
// const path = query?.path || 0
// console.log(path);
  

const countSlice = createSlice({
    name:"home",
    initialState:{
        isLoading: false,
        filePid: '0'
    },
    reducers:{
        changeLoading(state, action){
            state.isLoading = action.payload
        },
        changeFilePid(state, { payload }){
            console.log('payload', payload);
            
            state.filePid = payload
        }
    }
})

export const { changeLoading, changeFilePid } = countSlice.actions

export default countSlice.reducer