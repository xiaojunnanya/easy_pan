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
import { ExclamationCircleFilled, StopOutlined } from '@ant-design/icons'
import { DataType } from '@/components/Table/type'
import { changeLoading } from '@/store/modules/common'
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/store'
import { cancelShare, loadShareList } from '@/service/modules/share'
import Table from '@/components/Table/Wait/ShareTable'
import { Modal } from 'antd'
const { confirm } = Modal;

const Share = memo(() => {
  const dispatch = useAppDispatch()

  const { btnDisabled,selectKeys } = useAppSelector(state =>{
    return {
      btnDisabled: state.home.btnDisabled,
      selectKeys: state.common.selectKeys
    }
  }, useAppShallowEqual)

  const showBtn: btnType[] = useMemo(()=>{
    return [
      {
        name: '取消分享',
        icon:<StopOutlined />,
        disabled: btnDisabled,
        show: true,
        onClick: () => {
          confirm({
            title: '提示',
            icon: <ExclamationCircleFilled />,
            content: '你确定要取消分享这些文件吗？',
            async onOk() {
              const res = await cancelShare(selectKeys.join(","))
              if(res.data.status === 'success'){
                getData()
              }
            }
          });
        }
      },
    ]
  }, [btnDisabled])

  const [ data, setData ] = useState<DataType[]>([])

  const getData = () =>{
    dispatch(changeLoading(true))
    loadShareList().then(res =>{
      // 遍历为其添加上key
      const { list } = res?.data?.data

      // 对分享的key 单独处理一下
      for (const item of list) {
        item.key = item.fileId + item.code
      }
      setData(list)
      dispatch(changeLoading(false))
    })
  }

  useEffect(() => {
    getData()
  }, [])

  
  return (
    <ShareStyle>
      <HeaderBtn showBtn={showBtn}></HeaderBtn>
      <Table data={data}></Table>
    </ShareStyle>
  )
})

export default Share