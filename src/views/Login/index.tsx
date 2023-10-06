/*
 * @Author: XJN
 * @Date: 2023-10-06 11:19:23
 * @LastEditors: xiaojunnanya
 * @LastEditTime: 2023-10-06 16:10:25
 * @FilePath: \easy_pan\src\views\Login\index.tsx
 * @Description: 登录页面
 * @前端实习生: 鲸落
 */
import React, { memo, useEffect, useState } from 'react'

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import SparkMD5 from 'spark-md5'


import { LoginStyled } from './style'
import { checkCodeServer, loginServer } from '@/service/modules/login';
import { useNavigate } from 'react-router-dom';

const Login = memo(() => {

    const [ codeImg, setCodeImg ] = useState<string>('')
    const [ messageApi, contextHolder ] = message.useMessage();

    const navigate = useNavigate()

    useEffect(()=>{
        setCodeImg(checkCodeServer(0, new Date().getTime()))
    }, [])

    const onFinish = async (values: any) => {
        console.log('Received values of form: ', values);
        const spark = new SparkMD5()
        spark.append(values.password)
        
        const password = spark.end()
        const result = await loginServer(values.username, password, values.checkCode)
        console.log(result.data);
        messageApi.destroy()
        if( result.data.code === 200 ){
            navigate('/home')
            messageApi.info('登录成功');
        }else{
            messageApi.error(result.data.info);
            
        }
        
    };

    const updateCode = () =>{
        setCodeImg(checkCodeServer(0, new Date().getTime()))
    }


  return (
    <LoginStyled>
        <div className="login-body">

            { contextHolder }

            <div className="bg"></div>
            <div className="login-panel">
                <Form name="normal_login" className="login-form" 
                initialValues={{ remember: true }} onFinish={onFinish} >
                    <Form.Item name="username"
                        rules={[{ required: true, message: '请输入邮箱' }]} >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入邮箱" />
                    </Form.Item>
                    <Form.Item name="password"
                        rules={[{ required: true, message: '请输入密码' }]} >
                        <Input  prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password" placeholder="请输入密码" />
                    </Form.Item>
                    <div className='checkCode'>
                        <Form.Item name="checkCode"
                            rules={[{ required: true, message: '请输入验证码' }]} >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入验证码" />
                        </Form.Item>
                        <div onClick={updateCode}>
                            <img src={codeImg} alt="验证码"/>
                        </div>
                    </div>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        {/* <a className="login-form-forgot" href=""> Forgot password </a> */}
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button"> 登录 </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    </LoginStyled>
  )
})

export default Login