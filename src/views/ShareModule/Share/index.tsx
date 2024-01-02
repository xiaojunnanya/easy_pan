/*
 * @Author: XJN
 * @Date: 2023-12-08 14:30:28
 * @LastEditors: xiaojunnanya
 * @LastEditTime: 2024-01-02 16:38:10
 * @FilePath: \easy_pan\src\views\ShareModule\Share\index.tsx
 * @Description: 外部分享模块
 * @前端实习生: 鲸落
 */
import { getShareLoginInfo, loadFileList } from '@/service/modules/shareModule'
import React, { memo, useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { ShareStyle } from './style'
import { CloudUploadOutlined, DeliveredProcedureOutlined, ExclamationCircleOutlined, StopOutlined } from '@ant-design/icons'
import { getHeaderImg } from '@/service/modules/home'
import HeaderBtn from '@/components/HeaderBtn'
import { btnType } from '@/components/HeaderBtn/type'
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/store'
import Table from '@/components/Table/Wait/WSharedTable'
import { cancelShare } from '@/service/modules/share'
import { Modal } from 'antd'
import { changeMessageApi } from '@/store/modules/common'

const index = memo(() => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  
  const {  btnDisabled } = useAppSelector(state =>{
    return {
      btnDisabled: state.home.btnDisabled
    }
  }, useAppShallowEqual)

  const [ userInfo, setUserInfo ] = useState({
    nickName:'',
    shareTime:"",
    userId:"",
    fileName:"",
    currentUser:false,// 判断是不是分享者查看这个链接，是分享者按钮就是取消分享，不是就是保存到我的网盘
  })

  const [modal, contextHolder] = Modal.useModal();

  const [ data, setData ] = useState([])

  const showBtn: btnType[] = useMemo(()=>{
    return [
      {
        name: userInfo.currentUser ? '取消分享' : '保存到我的网盘',
        icon:userInfo.currentUser ? <StopOutlined /> : <DeliveredProcedureOutlined />,
        disabled: btnDisabled,
        show: true,
        onClick: ()=>{
          if(userInfo.currentUser){
            // 取消分享
            modal.confirm({
              title: '提示',
              icon: <ExclamationCircleOutlined />,
              content: '是否确定取消分享',
              okText: '确认',
              cancelText: '取消',
              onOk: async ()=>{
                const res = await cancelShare(id || '')
                if( res.data.code === 200){
                  navigate('/main')
                }else{
                  dispatch(changeMessageApi({
                    message: '取消分享失败，请稍后重试',
                    type: 'error'
                  }))
                }
              }
            });
          }else{
            // 保存到我的网盘
          }
        }
      }
    ]
  }, [btnDisabled, userInfo.currentUser])

  useEffect(()=>{
    // 检查是否登录
    !!id && getShareLoginInfo(id).then(res =>{
      const { data } = res
      if(!data.data ){
        navigate(`/shareCheck/${id}`)
      }

      if( data.code === 200 && data.data ){
        setUserInfo(data.data)
        loadFileList(id, '0').then(res =>{
          console.log(res.data.data.list);
          setData(res.data.data.list)
        })
      }
    })
  }, [id])

  

  return (
    <ShareStyle>

      {contextHolder}

      {
        userInfo.nickName && (
          <>
            <div className="lo">
              <div className="logo">
                <CloudUploadOutlined className='icon-pan'/>
                <div className="name">Easy云盘</div>
              </div>
            </div>
            <div className="middle">
              <div className='info'>
                <div className="file-info">
                  <div className="avatar">
                    <img src={getHeaderImg(userInfo.userId)} alt="" />
                  </div>
                  <div className="share-info">
                    <div className="user-info">
                      <div className="nick-name">{ userInfo.nickName }</div>
                      <div className="share-time">分享时间：{ userInfo.shareTime }</div>
                    </div>
                    <div className="file-name">分享文件：{ userInfo.fileName }</div>
                  </div>
                </div>
                <div className='btn'>
                  <HeaderBtn showBtn={showBtn} isSearch={false}></HeaderBtn>
                </div>
              </div>

              <Table data={data} currentUser={userInfo.currentUser}></Table>
            </div>
          </>
        )
      }
    </ShareStyle>
  )
})

export default index