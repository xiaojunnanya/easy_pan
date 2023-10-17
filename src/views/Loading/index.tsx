/*
 * @Author: XJN
 * @Date: 2023-10-17 20:06:59
 * @LastEditors: xiaojunnanya
 * @LastEditTime: 2023-10-17 20:11:43
 * @FilePath: \easy_pan\src\views\Loading\index.tsx
 * @Description: 
 * @前端实习生: 鲸落
 */
import React, { memo } from 'react'
import { Spin } from 'antd';
import { LoadingStyled } from './style';

const Loading = memo(() => {
  return (
    <LoadingStyled>
      <Spin size="large"/>
    </LoadingStyled>
  )
})

export default Loading