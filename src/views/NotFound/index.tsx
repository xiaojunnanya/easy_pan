import { Button } from 'antd'
import React, { memo } from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = memo(() => {

    const navigate = useNavigate()

    const back = () =>{
        navigate(sessionStorage.getItem('userInfo') ? '/main':'/login')
    }

  return (
    <div style={{textAlign:'center',marginTop:'100px'}}>
        <h1>404</h1>
        <br />
        <Button onClick={back}>返回首页</Button>
    </div>
  )
})

export default NotFound