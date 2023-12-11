/*
 * @Author: XJN
 * @Date: 2023-12-08 14:30:28
 * @LastEditors: xiaojunnanya
 * @LastEditTime: 2023-12-11 15:41:23
 * @FilePath: \easy_pan\src\views\ShareModule\Share\index.tsx
 * @Description: 外部分享模块
 * @前端实习生: 鲸落
 */
import { getShareLoginInfo, loadFileList } from '@/service/modules/shareModule'
import React, { memo, useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { ShareStyle } from './style'
import { CloudUploadOutlined, DeliveredProcedureOutlined, StopOutlined } from '@ant-design/icons'
import { getHeaderImg } from '@/service/modules/home'
import HeaderBtn from '@/components/HeaderBtn'
import { btnType } from '@/components/HeaderBtn/type'
import { useAppSelector, useAppShallowEqual } from '@/store'

const index = memo(() => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [ searchParams ] = useSearchParams()
  const query = Object.fromEntries(searchParams.entries())
  const urlPath = query.path || '0'

  const {  btnDisabled } = useAppSelector(state =>{
    return {
      btnDisabled: state.home.btnDisabled
    }
  }, useAppShallowEqual)

  const [ data, setData ] = useState({
    nickName:'',
    shareTime:"",
    userId:"",
    fileName:"",
    currentUser:false,// 判断是不是分享者查看这个链接，是分享者按钮就是取消分享，不是就是保存到我的网盘
  })

  const showBtn: btnType[] = useMemo(()=>{
    return [
      {
        name: data.currentUser ? '取消分享' : '保存到我的网盘',
        icon:data.currentUser ? <StopOutlined /> : <DeliveredProcedureOutlined />,
        disabled: btnDisabled,
        show: true,
      }
    ]
  }, [btnDisabled, data.currentUser])

  useEffect(()=>{
    // 检查是否登录
    !!id && getShareLoginInfo(id).then(res =>{
      const { data } = res
      if(!data.data ){
        navigate(`/shareCheck/${id}`)
      }

      if( data.code === 200 && data.data ){
        setData(data.data)
        loadFileList(id, '0').then(res =>{
          console.log(res.data);
          
        })
      }
    })
  }, [id])
  

  return (
    <ShareStyle>
      {
        data.nickName && (
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
                <div className='btn'>
                  <HeaderBtn showBtn={showBtn} isSearch={false}></HeaderBtn>
                </div>
              </div>
              <hr style={{color:'#DDDDDD', opacity:'.5'}}/>
              {/* <div className="table">
                <HeaderBtn showBtn={showBtn} isSearch={false}></HeaderBtn>
              </div> */}
            </div>
          </>
        )
      }
    </ShareStyle>
  )
})

export default index