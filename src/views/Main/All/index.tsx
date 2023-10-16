/*
 * @Author: XJN
 * @Date: 2023-10-08 20:42:01
 * @LastEditors: xiaojunnanya
 * @LastEditTime: 2023-10-16 22:12:49
 * @FilePath: \easy_pan\src\views\Main\All\index.tsx
 * @Description: 
 * @前端实习生: 鲸落
 */
import React, { memo } from 'react'

import NoData from '@/components/NoData'
import MainHeader from '@/components/MainHeader'

const All = memo(() => {
  return (
    <div>
      <MainHeader isShowFolder></MainHeader>
      <div>全部文件</div>
      <NoData isShowFolder></NoData>
    </div>
  )
})

export default All