/*
 * @Author: XJN
 * @Date: 2023-10-08 20:42:01
 * @LastEditors: xiaojunnanya
 * @LastEditTime: 2023-10-16 22:12:49
 * @FilePath: \easy_pan\src\views\Main\All\index.tsx
 * @Description: 
 * @前端实习生: 鲸落
 */
import React, { FC, memo, useEffect, useMemo, useState } from 'react'

import NoData from '@/components/NoData'
import { AllStyled } from './style'

import Table from '@/components/Table'

import { delFileToRecycle, getDataList } from '@/service/modules/home'

import type { DataType } from '@/components/Table/type'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/store'
import { changeFilePid, changeLoading } from '@/store/modules/home'
import HeaderBtn from '@/components/HeaderBtn'
import { btnType } from '@/components/HeaderBtn/type'
import { CloudUploadOutlined, DeleteOutlined, DragOutlined, ExclamationCircleFilled, SnippetsOutlined, SyncOutlined } from '@ant-design/icons'
import { Modal } from 'antd'
const { confirm } = Modal;


const All: FC= memo(() => {

  const dispatch = useAppDispatch()

  const { filePid, btnDisabled, selectKeys } = useAppSelector(state =>{
    return {
      filePid: state.home.filePid,
      btnDisabled: state.home.btnDisabled,
      selectKeys: state.home.selectKeys
    }
  }, useAppShallowEqual)

  const { category = 'all' } = useParams()

  const showBtn: btnType[] = useMemo(()=>{
    return [
      {
        name: '上传',
        icon:<CloudUploadOutlined />,
        disabled: false,
        show: true,
      },
      {
        name: '新建文件夹',
        icon:<SnippetsOutlined />,
        style:{
          backgroundColor:'#67C23A'
        },
        disabled: false,
        show: category === 'all'
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
            content: '你确定要删除这些文件吗？删除的文件可在10天内通过回收站还原',
            async onOk() {
              const res = await delFileToRecycle(selectKeys.join(","))
              if(res.data.status === 'success'){
                getData()
              }
            }
          });
        }
      },
      {
        name: '批量移动',
        icon:<DragOutlined />,
        style:{
          backgroundColor:'#E6A23C'
        },
        disabled: btnDisabled,
        show: true,
      }
    ]
  }, [btnDisabled, category, selectKeys])

  

  const [ data, setData ] = useState<DataType[]>([])
  // 总数
  const [ totalCount, setTotalCount ] = useState(0)
  
  const naviage = useNavigate()
  const [ searchParams ] = useSearchParams()
  const query = Object.fromEntries(searchParams.entries())
  const path = query.path || '0'
  // 在第一次进来的时候如果path有的话就使用path
  useEffect(()=>{
      // 将其转为一个普通的对象
    dispatch(changeFilePid(path))
  }, [path])
  
  /**
   * url path的思路
   * 判断query有没有path
   *    有，看path的返回值有没有
   *        有，使用
   *        有没有，使用path 0
   *    没有，使用path0
   */

  /**
   * 路由存在一定的问题：在一个有文件夹的文件夹中刷新，可能会显示所有的
   * 因为 0 和 那个fileid几乎同时请求，看谁先回来
   */

  const getData = () =>{
    getDataList({
      category: category,
      filePid
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
  }

  useEffect(()=>{
    naviage('?path='+filePid)
    
    dispatch(changeLoading(true))
    getData()
  }, [category, filePid])


  return (
    <AllStyled>
      <HeaderBtn isShowFolder={category === 'all'} showBtn={showBtn}></HeaderBtn>
      {/* <HeaderBtn isShowFolder={category === 'all'} btnDisabled={btnDisabled}></HeaderBtn> */}
      {
        totalCount ? (
          <div className='table'>
            {/* <HeaderBtn isShowFolder={isShowFolder} btnDisabled={buttonDisabled}></HeaderBtn> */}
            <Table data={data} totalCount={totalCount}></Table>
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