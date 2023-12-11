/*
 * @Author: XJN
 * @Date: 2023-12-08 14:30:28
 * @LastEditors: xiaojunnanya
 * @LastEditTime: 2023-12-08 17:40:05
 * @FilePath: \easy_pan\src\views\ShareModule\Share\index.tsx
 * @Description: 外部分享模块
 * @前端实习生: 鲸落
 */
import { getShareLoginInfo } from '@/service/modules/shareModule'
import React, { memo, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ShareStyle } from './style'

const index = memo(() => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [ data, setData ] = useState({
    nickName:'',
    shareTime:"",
    userId:"",
    fileName:""
  })

  useEffect(()=>{
    // 检查是否登录
    !!id && getShareLoginInfo(id).then(res =>{
      const { data } = res
      if( data.code === 200 && !data.data ){
        navigate(`/shareCheck/${id}`)
      }

      if( data.code === 200 && data.data ){
        console.log(data.data);
        setData(data.data)
      }
    })
  }, [id])
  

  return (
    <ShareStyle>
      {
        data.nickName && <div>index</div>
      }
    </ShareStyle>
  )
})

export default index