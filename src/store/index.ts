// store/index.ts

import { configureStore } from "@reduxjs/toolkit"
import homeReducer from './modules/home'
import commonReducer from './modules/common'
import loginReducer from './modules/login'
import uploadReducer from './modules/upload'

import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'

const store = configureStore({
    reducer: {
        home: homeReducer,
        common: commonReducer,
        login: loginReducer,
        upload: uploadReducer
    }
})


type StateFnType = typeof store.getState
type RootState = ReturnType<StateFnType>

// 拿useDispatch的类型
type DispatchType = typeof store.dispatch


export const useAppSelector: TypedUseSelectorHook<RootState>= useSelector
export const useAppDispatch: ()=> DispatchType = useDispatch
// 这部其实意义不大，但是为了统一一下，我们就进行一个赋值，然后都在这个文件导出
export const useAppShallowEqual = shallowEqual

export default store 