/*
 * @Author: XJN
 * @Date: 2023-10-06 21:40:03
 * @LastEditors: xiaojunnanya
 * @LastEditTime: 2023-10-06 21:40:10
 * @FilePath: \easy_pan\src\views\Cycle\index.tsx
 * @Description: 
 * @前端实习生: 鲸落
 */
import { DataType } from '@/components/Table/type'
import { deleteFile, getRecycleList, restore } from '@/service/modules/recycle'
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/store'
import { changeLoading } from '@/store/modules/common'
import Table from '@/components/Table/Wait/RecycleTable'
import React, { memo, useEffect, useMemo, useState } from 'react'

import type { btnType } from '@/components/HeaderBtn/type'
import { DeleteOutlined, ExclamationCircleFilled, UndoOutlined } from '@ant-design/icons'
import HeaderBtn from '@/components/HeaderBtn'
import { RecycleStyled } from './style'
import { Modal } from 'antd'
const { confirm } = Modal;


const Recycle = memo(() => {
  const dispatch = useAppDispatch()

  const { btnDisabled, selectKeys } = useAppSelector(state =>{
    return {
      btnDisabled: state.home.btnDisabled,
      selectKeys: state.recycle.selectKeys,
    }
  }, useAppShallowEqual)
  console.log('selectKeys', selectKeys);
  
  const [ data, setData ] = useState<DataType[]>([])

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
        onClick: () => {
          confirm({
            title: '提示',
            icon: <ExclamationCircleFilled />,
            content: '你确定要还原这些文件吗？',
            async onOk() {
              const res = await restore(selectKeys.join(","))
              if(res.data.status === 'success'){
                getData()
              }
            }
          });
        }
      },
      {
        name: '批量删除',
        icon:<DeleteOutlined />,
        style:{
          backgroundColor:'#F56C6C'
        },
        disabled: btnDisabled,
        show: true,
        onClick: () => {
          confirm({
            title: '提示',
            icon: <ExclamationCircleFilled />,
            content: '你确定要删除选中的文件？删除后将无法恢复',
            async onOk() {
              const res = await deleteFile(selectKeys.join(","))
              if(res.data.status === 'success'){
                getData()
              }
            }
          });
        }
      }
    ]
  }, [btnDisabled, selectKeys])

  const getData = () =>{
    dispatch(changeLoading(true))
    getRecycleList().then(res =>{
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
  
  return (
    <RecycleStyled>
      <HeaderBtn showBtn={showBtn}></HeaderBtn>
      <Table data={data}></Table>
    </RecycleStyled>
  )
})

export default Recycle