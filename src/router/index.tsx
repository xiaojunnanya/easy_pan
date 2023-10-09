/*
 * @Author: XJN
 * @Date: 2023-10-03 19:29:14
 * @LastEditors: xiaojunnanya
 * @LastEditTime: 2023-10-09 21:11:46
 * @FilePath: \easy_pan\src\router\index.tsx
 * @Description: 
 * @前端实习生: 鲸落
 */
import React from "react"
import { Navigate } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'

const Login = React.lazy(()=> import("@/views/Login"))
const Home = React.lazy(()=> import("@/views/Home"))
const Main = React.lazy(()=> import("@/views/Main"))
const Share = React.lazy(()=> import("@/views/Share"))
const Recycle = React.lazy(()=> import("@/views/Recycle"))
const Setting = React.lazy(()=> import("@/views/Setting"))

const routes : RouteObject[] = [
    {
        path:'/',
        element: <Navigate to="/login"></Navigate>
    },
    {
        path:'/login',
        element: <Login></Login>
    },
    {
        path:'/main',
        element: <Home></Home>,
        children:[
            {
                path:'/main',
                element: <Navigate to='/main/home/all'></Navigate>
            },
            {
                path:'/main/home',
                element: <Navigate to='/main/home/all'></Navigate>
            },
            {
                path:'/main/settings',
                element: <Navigate to='/main/settings/fileList'></Navigate>
            },
            {
                path:'/main/home/:category',
                element: <Main></Main>
            },
            {
                path:'/main/share',
                element: <Share></Share>
            },
            {
                path:'/main/recycle',
                element: <Recycle></Recycle>
            },
            {
                path:'/main/settings/:category',
                element: <Setting></Setting>
            },
        ]
    },
    // {
    //     path:'/share',
    //     element: <Share></Share>
    // },
    // {
    //     path:'/recycle',
    //     element: <Recycle></Recycle>
    // },
    // {
    //     path:'/setting',
    //     element: <Setting></Setting>
    // },
]

export default routes
