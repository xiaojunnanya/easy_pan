/*
 * @Author: XJN
 * @Date: 2023-10-08 20:42:01
 * @LastEditors: xiaojunnanya
 * @LastEditTime: 2023-12-04 16:02:50
 * @FilePath: \easy_pan\src\views\Setting\FileList\index.tsx
 * @Description: 
 * @前端实习生: 鲸落
 */
import React, { FC, memo, useCallback, useEffect, useMemo, useState } from 'react'

import { RecycleStyled } from '../style'

import Table from '@/components/Table/Wait/SettingUserTable'

import { getDataList } from '@/service/modules/home'

import type { DataType } from '@/components/Table/type'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/store'
import { changeFilePid } from '@/store/modules/home'
import {  changeLoading } from '@/store/modules/common'
import HeaderBtn from '@/components/HeaderBtn'
import { btnType } from '@/components/HeaderBtn/type'
import { DeleteOutlined, ExclamationCircleFilled } from '@ant-design/icons'
import { Modal } from 'antd'
import { adminDelFile } from '@/service/modules/setting'
const { confirm } = Modal;


const All: FC= memo(() => {

  const dispatch = useAppDispatch()

  const { filePid, btnDisabled, selectKeys } = useAppSelector(state =>{
    return {
      filePid: state.home.filePid,
      btnDisabled: state.home.btnDisabled,
      selectKeys: state.common.selectKeys
    }
  }, useAppShallowEqual)

  const { category = 'all' } = useParams()

  const naviage = useNavigate()
  const [ searchParams ] = useSearchParams()
  const query = Object.fromEntries(searchParams.entries())
  const urlPath = query.path || '0'
 

  const [ data, setData ] = useState<DataType[]>([])
  const [ path, setPath ] = useState(query.path || '0')

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


  // 为了在path直接进入的时候设置的
  useEffect(()=>{
      // 将其转为一个普通的对象
    dispatch(changeFilePid(path))
  }, [path])
  
  

  useEffect(()=>{
    naviage('?path='+path)
    getData()
  }, [category, path])

  useEffect(()=>{
    setPath(filePid)
  }, [filePid])

  // 路由回撤的时候，会导致页面path直接监听不到
  useEffect(()=>{
    dispatch(changeFilePid(urlPath))
  }, [urlPath])

  /**
   * url path的思路
   * 判断query有没有path
   *    有，看path的返回值有没有
   *        有，使用
   *        有没有，使用path 0
   *    没有，使用path0
   */

  const getData = useCallback((filterValue?: string) =>{
      dispatch(changeLoading(true))
      getDataList({
        category: category,
        filePid : path
        // filePid : filePid,
      }).then(res =>{
        // 遍历为其添加上key
        let { list } = res.data.data
  
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
    }, [category, path])

    
  return (
    <RecycleStyled>
      <HeaderBtn showBtn={showBtn} getData={getData}></HeaderBtn>
      <Table data={data}></Table>
    </RecycleStyled>
  )
})

export default All