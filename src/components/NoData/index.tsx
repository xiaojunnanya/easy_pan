/*
 * @Author: XJN
 * @Date: 2023-10-14 13:06:03
 * @LastEditors: xiaojunnanya
 * @LastEditTime: 2023-10-16 22:14:56
 * @FilePath: \easy_pan\src\components\NoData\index.tsx
 * @Description: 没有数据的时候显示
 * @前端实习生: 鲸落
 */
import React, { FC, memo } from 'react'
import { NoDataStyled } from './style'

import no_data from '@/assets/images/icon-image/no_data.png'

const NoData: FC = memo((props) => {
  
  return (
    <NoDataStyled>
        <div className="no-data">
          <div className="no-data-inner">
            <img src={no_data} alt="" width={120}/>
            <div className="tips">当前目录为空, 上传你的第一个文件吧</div>
          </div>
        </div>
    </NoDataStyled>
  )
})

export default NoData