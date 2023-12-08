import { getShareLoginInfo } from '@/service/modules/shareModule'
import React, { memo, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const index = memo(() => {
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(()=>{
    // 检查是否登录
    !!id && getShareLoginInfo(id).then(res =>{
      const { data } = res
      if( data.code === 200 && !data.data ){
        navigate(`/shareCheck/${id}`)
      }
    })
  }, [id])
  

  return (
    <div>index</div>
  )
})

export default index