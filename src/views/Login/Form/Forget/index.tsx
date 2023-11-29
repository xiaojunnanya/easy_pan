import React, { memo, useEffect, useState } from 'react'

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import SparkMD5 from 'spark-md5'

import { checkCodeServer, loginServer } from '@/service/modules/login';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/store';
import { changeMode } from '@/store/modules/login';

const index = memo(() => {

  const [ codeImg, setCodeImg ] = useState<string>('')
  const [ messageApi, contextHolder ] = message.useMessage();
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(()=>{
      setCodeImg(checkCodeServer(0, new Date().getTime()))
  }, [])
    
  const onFinish = async (values: any) => {
      const spark = new SparkMD5()
      spark.append(values.password)
      const password = spark.end()
      const result = await loginServer(values.username, password, values.checkCode)
      messageApi.destroy()
      if( result?.data.code === 200 ){
          navigate('/main/home/all')
          messageApi.info('登录成功');
          sessionStorage.setItem('userInfo', JSON.stringify(result.data.data))
      }else{
          messageApi.error(result?.data.info || '服务器异常，请稍后重试');
      }
  };

    const updateCode = () =>{
        setCodeImg(checkCodeServer(0, new Date().getTime()))
    }

  const aClick = (e: any, index: number)=>{
    e.stopPropagation()
    console.log(index);
    if(index === 1){
      dispatch(changeMode('login'))
    }
  }

  /**
   * 邮箱获取验证码
   */
  const getEmailCode = () =>{

  }

  return (
    <>

      <>
      { contextHolder }
      </>

      <Form name="normal_login" className="login-form" onFinish={onFinish} >
          <Form.Item name="username"
              rules={[{ required: true, message: '请输入邮箱' }]} >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入邮箱" />
          </Form.Item>
          <div className='emailCode'>
              <Form.Item name="emailCode"
                  rules={[{ required: true, message: '请输入邮箱验证码' }]} >
                  <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请邮箱验证码" />
              </Form.Item>
              <Button type='primary' onClick={getEmailCode}>获取验证码</Button>
          </div>
          <Form.Item name="password"
              rules={[{ required: true, message: '请输入密码' }]} >
              <Input  prefix={<LockOutlined className="site-form-item-icon" />}
              type="password" placeholder="请输入密码" />
          </Form.Item>
          <Form.Item name="passwordTwo"
              rules={[{ required: true, message: '请再次输入密码' }]} >
              <Input  prefix={<LockOutlined className="site-form-item-icon" />}
              type="password" placeholder="请再次输入密码" />
          </Form.Item>
          <div className='checkCode'>
              <Form.Item name="checkCode" initialValue={'123450'}
                  rules={[{ required: true, message: '请输入验证码' }]} >
                  <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入验证码" />
              </Form.Item>
              <div onClick={updateCode}>
                  <img src={codeImg} alt="验证码"/>
              </div>
          </div>

          <div style={{display:'flex',justifyContent:'space-between',marginBottom:'20px'}}>
              <a className="login-form-forgot" onClick={(e)=>{aClick(e, 1)}}>去登录？</a>
          </div>

          <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button"> 重置密码 </Button>
          </Form.Item>
      </Form>
    </>
  )
})

export default index