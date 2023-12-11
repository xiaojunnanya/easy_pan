/*
 * @Author: XJN
 * @Date: 2023-12-08 14:30:16
 * @LastEditors: xiaojunnanya
 * @LastEditTime: 2023-12-11 11:23:09
 * @FilePath: \easy_pan\src\views\ShareModule\ShareCheck\index.tsx
 * @Description: 外部分享验证模块
 * @前端实习生: 鲸落
 */
import { checkShareCode, getShareInfo } from '@/service/modules/shareModule'
import React, { memo, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ShareCheckStyle } from './style'
import { CloudUploadOutlined } from '@ant-design/icons'
import { getHeaderImg } from '@/service/modules/home'
import { Button, Form, FormInstance, Input } from 'antd'
import { changeMessageApi } from '@/store/modules/common'
import { useAppDispatch } from '@/store'

const index = memo(() => {
  const { id } = useParams()
  const navigate = useNavigate()
  const formRef = useRef<FormInstance | null>(null);
  const dispatch = useAppDispatch()

  const [ data, setData ] = useState({
    nickName:'',
    shareTime:"",
    userId:"",
    fileName:""
  })

  useEffect(()=>{
    !!id && getShareInfo(id).then(res =>{
      if(res.data.code === 200 && res.data.status === 'success'){
        setData(res.data.data)
      }else{
        // 分享过期
        dispatch(changeMessageApi({
            type: 'error',
            info: res?.data.info || '服务器异常，请稍后重试'
        }))
        navigate(`/invalidSharing/${id}`)
      }
    })
  }, [id])

  const getInfo = () =>{
    try {
      formRef.current?.validateFields(['code']).then(async res =>{
        id && await checkShareCode(id, res.code).then(res1 =>{
          if(res1.data.code === 200 && res1.data.status === 'success'){
            navigate(`/share/${id}`)
          }
        })
      }).catch(err=>{})
    } catch (error) {}
  }

  return (
    <ShareCheckStyle>
      {
        data.nickName && (
          <div>
            <div className="logo">
              <CloudUploadOutlined className='icon-pan'/>
              <span className='name'> Easy云盘</span>
            </div>
            <div className="share">
              <div className="file-info">
                <div className="avatar">
                  <img src={getHeaderImg(data.userId)} alt="" />
                </div>
                <div className="share-info">
                  <div className="user-info">
                    <div className="nick-name">{ data.nickName }</div>
                    <div className="share-time">分享时间：{ data.shareTime }</div>
                  </div>
                  <div className="file-name">分享文件：{ data.fileName }</div>
                </div>
              </div>
              <div className="code-body">
                <div className="tips">请输入提取码: </div>
                <div className="input-area">
                  <Form name="normal_login" className="login-form" ref={(form) => (formRef.current = form)}>
                    <div className="code">
                      <Form.Item name="code"
                          rules={[{ required: true, message: '请输入提取码' }]} >
                          <Input placeholder="请输入提取码" />
                      </Form.Item>
                      <Button type='primary' onClick={getInfo}>提取文件</Button>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </ShareCheckStyle>
  )
})

export default index
