/*
 * @Author: XJN
 * @Date: 2023-10-03 19:29:14
 * @LastEditors: xiaojunnanya
 * @LastEditTime: 2023-10-06 02:34:59
 * @FilePath: \easy_pan\src\router\index.js
 * @Description: 
 * @前端实习生: 鲸落
 */
import React from "react"

const A = React.lazy(()=> import("@/views/A"))

const routes = [
    {
        path:'/',
        element: <A></A>
    },
]

export default routes
