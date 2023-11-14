/*
 * @Author: XJN
 * @Date: 2023-10-08 20:42:01
 * @LastEditors: xiaojunnanya
 * @LastEditTime: 2023-10-16 22:12:49
 * @FilePath: \easy_pan\src\views\Main\All\index.tsx
 * @Description: 
 * @前端实习生: 鲸落
 */
import React, { FC, memo, useEffect, useState } from 'react'

import NoData from '@/components/NoData'
import MainHeader from '@/components/MainHeader'
import { AllStyled } from './style'

import Table from '@/components/Table'

import { getDataList } from '@/service/modules/home'

import type { DataType } from '@/components/Table/index'
import { useParams } from 'react-router-dom'
import { useAppDispatch } from '@/store'
import { changeLoading } from '@/store/modules/home'


const All: FC= memo(() => {

  const dispatch = useAppDispatch()

  const [ data, setData ] = useState<DataType[]>()
  const [ totalCount, setTotalCount ] = useState(0)
  const { category = 'all' } = useParams()

  useEffect(()=>{
    getDataList({
      category: category,
      filePid: '0'
    }).then(res =>{
      // 遍历为其添加上key
      const { list } = res.data.data

      for (const item of list) {
        item.key = item.fileId
      }
      setTotalCount(res.data.data.totalCount)
      setData(list)
      dispatch(changeLoading(false))
    })
  }, [category])

  return (
    <AllStyled>
      {
        totalCount ? (
          <div className='table'>
            <Table data={data} isShowFolder={category === 'all'}></Table>
          </div>
        ) : (
          <>
            <NoData isShowFolder></NoData>
          </>
        )
      }
      
    </AllStyled>
  )
})

export default All