import React, { memo, useEffect, useRef, useState } from 'react'

import { LockOutlined, MailOutlined, SafetyCertificateOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, FormInstance, Input } from 'antd';

import { checkCodeServer, registerServer, sendEmailCodeServer } from '@/service/modules/login';

import { useAppDispatch } from '@/store';
import { changeMode } from '@/store/modules/login';
import { changeMessageApi } from '@/store/modules/common';

const index = memo(() => {
  const formRef = useRef<FormInstance | null>(null);
  const [ codeImg, setCodeImg ] = useState<string>('')
  const [ btnName, setBtnName ] = useState<string>('获取验证码')
  const dispatch = useAppDispatch()

  useEffect(()=>{
        setCodeImg(checkCodeServer(0, new Date().getTime()))
  }, [])
    
  const onFinish = async (values: any) => {
      const result = await registerServer(values.username,  values.name, values.password, values.checkCode, values.emailCode)
      if( result?.data.code === 200 && result?.data.info === '请求成功'){
          dispatch(changeMode('login'))
          dispatch(changeMessageApi({
              type: 'success',
              info: '注册成功,请返回登录'
          }))
      }else{
          dispatch(changeMessageApi({
              type: 'error',
              info: result?.data.info || '服务器异常，请稍后重试'
          }))
          updateCode()
          formRef.current?.resetFields(['checkCode']);
      }
  };

  const updateCode = () => setCodeImg(checkCodeServer(0, new Date().getTime()))

  const aClick = (e: any, index: number)=>{
    e.stopPropagation()
    if(index === 1){
      dispatch(changeMode('login'))
    }
  }

  /**
   * 邮箱获取验证码
   */
  const getEmailCode = async () =>{
      try {
          formRef.current?.validateFields(['username']).then(async res =>{
              sendEmailCodeServer(res.username, '0').then(res =>{
                  if(res?.data.code === 200 && res?.data.info === '请求成功'){

                    let time = 60
                    let a = setInterval(()=>{
                      time--;
                      setBtnName(time + '秒后重新获取')
                      if(time === 0) {
                        setBtnName('获取验证码')
                        clearInterval(a)
                      }
                    }, 1000)

                      dispatch(changeMessageApi({
                        type: 'success',
                        info: '验证码已发送，请注意查收'
                    }))

                  }else{
                      dispatch(changeMessageApi({
                          type: 'error',
                          info: res?.data.info || '服务器异常，请稍后重试'
                      }))
                  }
              })
          }).catch(err=>{})
      } catch (error) {}
    }

  return (
    <>
      <Form name="normal_login" className="login-form" onFinish={onFinish} ref={(form) => (formRef.current = form)}>
          <Form.Item name="username"
              rules={[{ required: true, message: '请输入邮箱' }]} >
              <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="请输入邮箱" />
          </Form.Item>
          <div className='emailCode'>
              <Form.Item name="emailCode"
                  rules={[{ required: true, message: '请输入邮箱验证码' }]} >
                  <Input prefix={<SafetyCertificateOutlined className="site-form-item-icon" />} placeholder="请邮箱验证码" />
              </Form.Item>
              <Button type='primary' onClick={getEmailCode} disabled={btnName !== '获取验证码'}>{btnName}</Button>
          </div>
          <Form.Item name="name"
              rules={[{ required: true, message: '请输入昵称' }]} >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入昵称" />
          </Form.Item>
          <Form.Item name="password"
              rules={[
                { required: true, message: '请输入密码' },
                { min: 8, max: 18, message: '密码长度不能小于8位且不能超过18位'},
                {
                  validator(rule, value, callback) {
                    // 正则：必须既有数字也有字母
                    if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,18}$/.test(value)) {
                      callback('密码必须要由数字和字母组成');
                    }else{
                      return Promise.resolve()
                    }
                  },
                }
                ]} >
              <Input  prefix={<LockOutlined className="site-form-item-icon" />}
              type="password" placeholder="请输入密码" />
          </Form.Item>
          <Form.Item name="passwordTwo"
              rules={[
                { required: true, message: '请输入密码' },
                ({getFieldValue})=>({
                    validator(rule,value){
                        if(!value || getFieldValue('password') === value){
                            return Promise.resolve()
                        }
                        return Promise.reject("两次密码输入不一致")
                    }
                })
                ]} >
              <Input  prefix={<LockOutlined className="site-form-item-icon" />}
              type="password" placeholder="请再次输入密码" />
          </Form.Item>
          <div className='checkCode'>
              <Form.Item name="checkCode"
                  rules={[{ required: true, message: '请输入验证码' }]} >
                  <Input prefix={<SafetyCertificateOutlined className="site-form-item-icon" />} placeholder="请输入验证码" />
              </Form.Item>
              <div onClick={updateCode}>
                  <img src={codeImg} alt="验证码"/>
              </div>
          </div>

          <div style={{display:'flex',justifyContent:'space-between',marginBottom:'20px'}}>
              <a className="login-form-forgot" onClick={(e)=>{aClick(e, 1)}}>去登录？</a>
          </div>

          <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button"> 注册 </Button>
          </Form.Item>
      </Form>
    </>
  )
})

export default index