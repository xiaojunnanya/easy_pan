/*
 * @Author: XJN
 * @Date: 2023-10-06 21:40:03
 * @LastEditors: xiaojunnanya
 * @LastEditTime: 2023-10-06 21:40:30
 * @FilePath: \easy_pan\src\views\Share\index.tsx
 * @Description: 
 * @前端实习生: 鲸落
 */
import React, { memo, useEffect, useMemo, useState } from 'react'
import { ShareStyle } from './style'
import HeaderBtn from '@/components/HeaderBtn'
import { btnType } from '@/components/HeaderBtn/type'
import { StopOutlined } from '@ant-design/icons'
import { DataType } from '@/components/Table/type'
import { changeLoading } from '@/store/modules/common'
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/store'
import { loadShareList } from '@/service/modules/share'
import Table from '@/components/Table/Wait/ShareTable'

const Share = memo(() => {
  const dispatch = useAppDispatch()

  const { btnDisabled } = useAppSelector(state =>{
    return {
      btnDisabled: state.home.btnDisabled,
    }
  }, useAppShallowEqual)

  const showBtn: btnType[] = useMemo(()=>{
    return [
      {
        name: '取消分享',
        icon:<StopOutlined />,
        disabled: btnDisabled,
        show: true,
      },
    ]
  }, [btnDisabled])

  const [ data, setData ] = useState<DataType[]>([])

  const getData = () =>{
    dispatch(changeLoading(true))
    loadShareList().then(res =>{
      // 遍历为其添加上key
      const { list } = res?.data?.data

      for (const item of list) {
        item.key = item.fileId
      }
      setData(list)
      dispatch(changeLoading(false))
    })
  }

  useEffect(() => {
    getData()
  }, [])

  console.log(data);
  
  return (
    <ShareStyle>
      <HeaderBtn showBtn={showBtn}></HeaderBtn>
      <Table data={data}></Table>
    </ShareStyle>
  )
})

export default Share