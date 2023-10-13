/*
 * @Author: XJN
 * @Date: 2023-10-06 21:40:03
 * @LastEditors: xiaojunnanya
 * @LastEditTime: 2023-10-09 21:30:49
 * @FilePath: \easy_pan\src\views\Main\index.jsx
 * @Description: 首页
 * @前端实习生: 鲸落
 */
import React, { memo } from 'react'

import { useParams } from 'react-router-dom'

import All from './All'
import Video from './Video'
import Music from './Music'
import Image from './Image'
import Doc from './Doc'
import Others from './Others'

const Main = memo(() => {

  const { category } = useParams()
  
  const components = {  
    all: <All></All>,
    video: <Video></Video>,  
    music: <Music></Music>,  
    image: <Image></Image>,  
    doc: <Doc></Doc>,  
    others: <Others></Others>  
  };  

  
  const ShowComponent =  components[category] || null
  
  return (
    <div>
      
      {
        ShowComponent
      }
      
    </div>
  )
})

export default Main