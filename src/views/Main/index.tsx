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
import { AllStyled } from './style'

import Table from '@/components/Table'

import { getDataList } from '@/service/modules/home'

import type { DataType } from '@/components/Table/type'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/store'
import { changeLoading } from '@/store/modules/home'


const All: FC= memo(() => {

  const { filePid } = useAppSelector(state =>{
    return {
      filePid: state.home.filePid
    }
  }, useAppShallowEqual)

  const dispatch = useAppDispatch()

  const [ data, setData ] = useState<DataType[]>([])
  // 总数
  const [ totalCount, setTotalCount ] = useState(0)
  const { category = 'all' } = useParams()
  const naviage = useNavigate()
  
  // const [ searchParams ] = useSearchParams()
  //     // 将其转为一个普通的对象
  // const query = Object.fromEntries(searchParams.entries())
  // const path = query.path || 0
  
  

  useEffect(()=>{
    // naviage('?path='+filePid)
    

    dispatch(changeLoading(true))
    getDataList({
      category: category,
      filePid
    }).then(res =>{
      console.log(res);
      
      // 遍历为其添加上key
      const { list } = res.data.data
      
      for (const item of list) {
        item.key = item.fileId
      }
      setTotalCount(res.data.data.totalCount)
      setData(list)
      dispatch(changeLoading(false))
    })
  }, [category, filePid])

  return (
    <AllStyled>
      {
        totalCount ? (
          <div className='table'>
            <Table data={data} isShowFolder={category === 'all'} totalCount={totalCount}></Table>
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