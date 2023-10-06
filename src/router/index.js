/*
 * @Author: XJN
 * @Date: 2023-10-03 19:29:14
 * @LastEditors: xiaojunnanya
 * @LastEditTime: 2023-10-06 16:54:05
 * @FilePath: \easy_pan\src\router\index.js
 * @Description: 
 * @前端实习生: 鲸落
 */
import React from "react"
import { Navigate } from 'react-router-dom'

const Login = React.lazy(()=> import("@/views/Login"))
const Home = React.lazy(()=> import("@/views/Home"))

const routes = [
    {
        path:'/',
        element: <Navigate to="/login"></Navigate>
    },
    {
        path:'/login',
        element: <Login></Login>
    },
    {
        path:'/home',
        element: <Home></Home>
    },
]

export default routes
