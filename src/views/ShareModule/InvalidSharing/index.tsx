import React, { memo } from 'react'
import { InvalidSharingStyle } from './style'
import { CloudUploadOutlined } from '@ant-design/icons'

import err from '@/assets/images/error-icon.png'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { changeMessageApi } from '@/store/modules/common'
import { useAppDispatch } from '@/store'

const index = memo(() => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const click = () => {
    navigate('/')
    // 添加这个：不然在点击跳转的时候会再次弹窗
    dispatch(changeMessageApi({
        type: '',
        info: ''
    }))
  }

  return (
    <InvalidSharingStyle>
        <div className="left">
            <div className="logo">
              <CloudUploadOutlined className='icon-pan'/>
              <div className="name">Easy云盘</div>
            </div>
            <div className="info">
              <img src={err} alt="" />
              <div className='txt'>啊哦，分享链接不存在，或已失效</div>
              <Button onClick={click}>返回首页</Button>
            </div>
        </div>
        <div className="right"></div>
    </InvalidSharingStyle>
  )
})

export default index