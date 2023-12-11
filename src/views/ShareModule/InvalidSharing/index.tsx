import React, { memo } from 'react'
import { InvalidSharingStyle } from './style'
import { CloudUploadOutlined } from '@ant-design/icons'

import err from '@/assets/images/error-icon.png'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

const index = memo(() => {

  const navigate = useNavigate()

  return (
    <InvalidSharingStyle>
        <div className="left">
            <div className="logo">
                <CloudUploadOutlined className='icon-pan'/>
                <div className="name">Easy云盘</div>
            </div>j
            <div className="info">
              <img src={err} alt="" />
              <div className='txt'>啊哦，分享连接不存在，或已失效</div>
              <Button onClick={()=>{navigate('/')}}>返回首页</Button>
            </div>
        </div>
        <div className="right"></div>
    </InvalidSharingStyle>
  )
})

export default index