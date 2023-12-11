/*
 * @Author: XJN
 * @Date: 2023-10-03 19:29:14
 * @LastEditors: xiaojunnanya
 * @LastEditTime: 2023-12-11 10:58:59
 * @FilePath: \easy_pan\src\router\index.tsx
 * @Description: 路由模块
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
const NotFound = React.lazy(()=> import("@/views/NotFound"))
const Shares = React.lazy(()=> import("@/views/ShareModule/Share"))
const ShareModule = React.lazy(()=> import("@/views/ShareModule/ShareCheck"))
const InvalidSharing = React.lazy(()=> import("@/views/ShareModule/InvalidSharing"))
const Test = React.lazy(()=> import("@/views/Test"))

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
        path:'/test',
        element: <Test></Test>
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
    {
        path:'/share/:id',
        element: <Shares></Shares>
    },
    {
        path:'/shareCheck/:id',
        element: <ShareModule></ShareModule>
    },
    {
        path:'/invalidSharing/:id',
        element: <InvalidSharing></InvalidSharing>
    },
    {
        path:'*',
        element: <NotFound></NotFound>
    },
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
