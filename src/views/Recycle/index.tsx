/*
 * @Author: XJN
 * @Date: 2023-10-06 21:40:03
 * @LastEditors: xiaojunnanya
 * @LastEditTime: 2023-10-06 21:40:10
 * @FilePath: \easy_pan\src\views\Cycle\index.tsx
 * @Description: 
 * @前端实习生: 鲸落
 */
import NoData from '@/components/NoData'
import { DataType } from '@/components/Table/type'
import { getRecycleList } from '@/service/modules/recycle'
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/store'
import { changeLoading } from '@/store/modules/home'
import Table from '@/components/Table'
import React, { memo, useEffect, useMemo, useState } from 'react'

import type { btnType } from '@/components/HeaderBtn/type'
import { DeleteOutlined, UndoOutlined } from '@ant-design/icons'
import HeaderBtn from '@/components/HeaderBtn'
import { RecycleStyled } from './style'


const Recycle = memo(() => {
  const dispatch = useAppDispatch()

  const { btnDisabled } = useAppSelector(state =>{
    return {
      btnDisabled: state.home.btnDisabled,
    }
  }, useAppShallowEqual)

  const [ data, setData ] = useState<DataType[]>([])
  // 总数
  const [ totalCount, setTotalCount ] = useState(0)


  const showBtn: btnType[] = useMemo(()=>{
    return [
      {
        name: '还原',
        icon:<UndoOutlined />,
        style:{
          backgroundColor:'#67C23A'
        },
        disabled: btnDisabled,
        show: true,
      },
      {
        name: '批量删除',
        icon:<DeleteOutlined />,
        style:{
          backgroundColor:'#F56C6C'
        },
        disabled: btnDisabled,
        show: true,
      }
    ]
  }, [btnDisabled])

  useEffect(() => {
    getRecycleList().then(res =>{
      // 遍历为其添加上key
      const { list } = res.data.data

      for (const item of list) {
        item.key = item.fileId
      }
      setTotalCount(res.data.data.totalCount)
      setData(list)
      dispatch(changeLoading(false))
    })
  }, [])

  return (
    <RecycleStyled>
      <HeaderBtn showBtn={showBtn}></HeaderBtn>
      {
        totalCount ? (
          <div className='table'>
            <Table data={data} totalCount={totalCount}></Table>
          </div>
        ) : (
          <div className='nodata'>暂无数据</div>
        )
      }
    </RecycleStyled>
  )
})

export default Recycle