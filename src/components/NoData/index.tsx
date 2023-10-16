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
import file from '@/assets/images/icon-image/file.png'
import folder from '@/assets/images/icon-image/folder.png'

// isShowFolder为ture显示文件夹
interface propsType{
  isShowFolder?: boolean
}

const NoData: FC<propsType> = memo((props) => {

 
  return (
    <NoDataStyled>
        <div className="no-data">
          <div className="no-data-inner">
            <img src={no_data} alt="" width={120}/>
            <div className="tips">当前目录为空, 上传你的第一个文件吧</div>
            <div className="op-list">
              <div className="op-item">
                <img src={file} alt="" width={60}/>
                <div>上传文件</div>
              </div>
              {
                props.isShowFolder && (
                  <div className="op-item">
                    <img src={folder} alt="" width={60}/>
                    <div>新建文件夹</div>
                  </div>
                )
              }
            </div>
          </div>
        </div>
    </NoDataStyled>
  )
})

export default NoData