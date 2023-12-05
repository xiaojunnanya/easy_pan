/*
 * @Author: XJN
 * @Date: 2023-10-06 21:40:03
 * @LastEditors: xiaojunnanya
 * @LastEditTime: 2023-12-04 15:30:21
 * @FilePath: \easy_pan\src\views\Setting\FileList\index.tsx
 * @Description: 
 * @前端实习生: 鲸落
 */
import { DataType } from '@/components/Table/type'
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/store'
import { changeLoading } from '@/store/modules/common'
import Table from '@/components/Table/Wait/SettingUserTable'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'

import type { btnType } from '@/components/HeaderBtn/type'
import { DeleteOutlined, ExclamationCircleFilled } from '@ant-design/icons'
import HeaderBtn from '@/components/HeaderBtn'
import { RecycleStyled } from '../style'
import { Modal } from 'antd'
import { adminDelFile, getFileList } from '@/service/modules/setting'
const { confirm } = Modal;


const Recycle = memo(() => {
  const dispatch = useAppDispatch()

  const { btnDisabled, selectKeys } = useAppSelector(state =>{
    return {
      btnDisabled: state.home.btnDisabled,
      selectKeys: state.common.selectKeys,
    }
  }, useAppShallowEqual)
  
  const [ data, setData ] = useState<DataType[]>([])

  const showBtn: btnType[] = useMemo(()=>{
    return [
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
              const res = await adminDelFile(selectKeys.join(","))
              if(res.data.status === 'success'){
                getData()
              }
            }
          });
        }
      }
    ]
  }, [btnDisabled, selectKeys])

  const getData = useCallback((filterValue?: string) =>{
    dispatch(changeLoading(true))
    getFileList().then(res =>{
      // 遍历为其添加上key
      let { list } = res?.data?.data

      for (const item of list) {
        item.key = item.userId + '_' +item.fileId
      }
      if( filterValue ){
        list = list.filter((item: any)=>{
          return item.fileName.includes(filterValue)
        })
      }
      setData(list)
      dispatch(changeLoading(false))
    })
  }, [])

  useEffect(() => {
    getData()
  }, [])
  
  return (
    <RecycleStyled>
      <HeaderBtn showBtn={showBtn} getData={getData}></HeaderBtn>
      <Table data={data}></Table>
    </RecycleStyled>
  )
})

export default Recycle