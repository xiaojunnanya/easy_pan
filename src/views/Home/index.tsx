/*
 * @Author: XJN
 * @Date: 2023-10-06 15:44:38
 * @LastEditors: xiaojunnanya
 * @LastEditTime: 2023-10-06 16:56:02
 * @FilePath: \easy_pan\src\views\Home\index.tsx
 * @Description: 首页
 * @前端实习生: 鲸落
 */
import React, { memo } from 'react'
import { HomeStyled } from './style'

const Home = memo(() => {
  return (
    <HomeStyled>
      <div className="framework">
        <div className="header">1</div>
        <div className="body">2</div>
      </div>
    </HomeStyled>
  )
})

export default Home