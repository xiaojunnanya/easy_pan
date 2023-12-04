/*
 * @Author: XJN
 * @Date: 2023-11-27 14:53:06
 * @LastEditors: xiaojunnanya
 * @LastEditTime: 2023-12-03 17:20:00
 * @FilePath: \easy_pan\src\views\Login\Form\Login\index.tsx
 * @Description: 登录页面
 * @前端实习生: 鲸落
 */
import React, { memo, useEffect, useRef, useState } from 'react'

import { LockOutlined, MailOutlined, SafetyCertificateOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, FormInstance, Input, message } from 'antd';
import SparkMD5 from 'spark-md5'
import QqImg from '@/assets/images/qq.png'

import { checkCodeServer, loginServer } from '@/service/modules/login';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/store';
import { changeMode } from '@/store/modules/login';

const index = memo(() => {
  const formRef = useRef<FormInstance | null>(null);
  const [ codeImg, setCodeImg ] = useState<string>('')
  const [ messageApi, contextHolder ] = message.useMessage();
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(()=>{
    updateCode()
  }, [])
    
  const onFinish = async (values: any) => {
      const spark = new SparkMD5()
      spark.append(values.password)
      const password = spark.end()
      const result = await loginServer(values.username, password, values.checkCode)
      messageApi.destroy()
      if( result?.data.code === 200 ){
          navigate('/main/home/all')
          messageApi.info('登录成功')
          sessionStorage.setItem('userInfo', JSON.stringify(result.data.data))
      }else{
          messageApi.error(result?.data.info || '服务器异常，请稍后重试')
          updateCode()
          formRef.current?.resetFields(['checkCode'])
      }
  };

    const updateCode = () =>{
        setCodeImg(checkCodeServer(0, new Date().getTime()))
    }

  const aClick = (e: any, index: number)=>{
    e.stopPropagation()
    console.log(index);
    if(index === 1){
      dispatch(changeMode('forget'))
    }
    if(index === 2){
      dispatch(changeMode('account'))
    }
  }

  return (
    <>

      <>
      { contextHolder }
      </>

      <Form name="normal_login" className="login-form" onFinish={onFinish} ref={(form) => (formRef.current = form)}>
          <Form.Item name="username"
              rules={[{ required: true, message: '请输入邮箱' }]} >
              <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="请输入邮箱" />
          </Form.Item>
          <Form.Item name="password"
              rules={[{ required: true, message: '请输入密码' }]} >
              <Input  prefix={<LockOutlined className="site-form-item-icon" />}
              type="password" placeholder="请输入密码" />
          </Form.Item>
          <div className='checkCode'>
              <Form.Item name="checkCode"
                  rules={[{ required: true, message: '请输入验证码' }]}>
                  <Input prefix={<SafetyCertificateOutlined className="site-form-item-icon" />} 
                  placeholder="请输入验证码"/>
              </Form.Item>
              <div onClick={updateCode}>
                  <img src={codeImg} alt="验证码"/>
              </div>
          </div>

          <div style={{display:'flex',justifyContent:'space-between',marginBottom:'20px'}}>
              <a className="login-form-forgot" onClick={(e)=>{aClick(e, 1)}}>忘记密码？</a>
              <a className="login-form-forgot" onClick={(e)=>{aClick(e, 2)}}>没有账户？</a>
          </div>

          <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button"> 登录 </Button>
          </Form.Item>
          
          {/* <div className='qqimg'>
              <span>QQ快捷登录</span>
              <img src={QqImg}/>
          </div> */}
      </Form>
    </>
  )
})

export default index