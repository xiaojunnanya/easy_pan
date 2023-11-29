/*
 * @Author: XJN
 * @Date: 2023-10-06 21:40:03
 * @LastEditors: xiaojunnanya
 * @LastEditTime: 2023-10-08 21:34:38
 * @FilePath: \easy_pan\src\views\Setting\index.jsx
 * @Description: 设置
 * @前端实习生: 鲸落
 */
import React, { memo } from 'react'

import { useParams } from 'react-router-dom'

import FileList from './FileList'
import UserList from './UserList'
import SysSetting from './SysSetting'

const Setting = memo(() => {

  const { category = 'fileList' } = useParams()

  const ShowComponent = () =>{
    switch (category) {
      case 'fileList': 
        return <FileList></FileList>
      case 'userList':
        return <UserList></UserList>
      case 'sysSetting':
        return <SysSetting></SysSetting>
      default:<FileList></FileList>
    }
  }
  
  return (
    <div>
      
      {
        ShowComponent()
      }
      
    </div>
  )
})

export default Setting