/*
 * @Author: XJN
 * @Date: 2023-10-06 11:19:23
 * @LastEditors: xiaojunnanya
 * @LastEditTime: 2023-10-08 22:17:58
 * @FilePath: \easy_pan\src\views\Login\index.tsx
 * @Description: 登录页面
 * @前端实习生: 鲸落
 */
import React, { memo } from 'react'

import { LoginStyled } from './style'

import LoginModel from './Form/Login'
import AccountModel from './Form/Account'
import ForgetModel from './Form/Forget'

import { useAppSelector, useAppShallowEqual } from '@/store'

const Login = memo(() => {

    const { loginMode } = useAppSelector(state =>{
        return { 
            loginMode: state.login.mode
        }
    }, useAppShallowEqual)

    const showModel  = () =>{
        switch (loginMode) {
            case 'login':
                return <LoginModel></LoginModel>
            case 'account':
                return <AccountModel></AccountModel>
            case 'forget':
                return <ForgetModel></ForgetModel>
            default:
                return <LoginModel></LoginModel>
        }
    }

  return (
    <LoginStyled>
        <div className="login-body">
            <div className="bg"></div>
            <div className="login-panel">
                {
                    showModel()
                }
            </div>
        </div>
    </LoginStyled>
  )
})

export default Login