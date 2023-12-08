/*
 * @Author: XJN
 * @Date: 2023-10-10 20:52:07
 * @LastEditors: xiaojunnanya
 * @LastEditTime: 2023-10-10 20:52:26
 * @FilePath: \easy_pan\src\utils\authRouter.tsx
 * @Description: 
 * @前端实习生: 鲸落
 */
import React from 'react'
import { useLocation, Navigate } from 'react-router-dom'

const AuthRouter = (props: { children: JSX.Element }) =>{
    const { pathname } = useLocation()
    if( ( pathname === '/login' ) || ( pathname.includes('/share') ) || ( pathname.includes('/shareCheck') ) ){
        return props.children
    }
    if(!sessionStorage.getItem('userInfo')){
        return <Navigate to='/login'></Navigate>
    }else{
        return props.children
    }
}

export default AuthRouter