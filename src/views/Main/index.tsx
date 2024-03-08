/*
 * @Author: XJN
 * @Date: 2023-10-08 20:42:01
 * @LastEditors: xiaojunnanya
 * @LastEditTime: 2023-12-28 10:24:53
 * @FilePath: \easy_pan\src\views\Main\index.tsx
 * @Description: 
 * @前端实习生: 鲸落
 */
import React, { FC, memo, useCallback, useEffect, useMemo, useState } from 'react'

import NoData from '@/components/NoData'
import { AllStyled } from './style'

import Table from '@/components/Table'

import { createFolder, delFileToRecycle, getDataList } from '@/service/modules/home'

import type { DataType } from '@/components/Table/type'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/store'
import { changeBtnDisabled, changeFilePid, changeGetDataMethod } from '@/store/modules/home'
import {  changeLoading } from '@/store/modules/common'
import HeaderBtn from '@/components/HeaderBtn'
import { btnType } from '@/components/HeaderBtn/type'
import { CloudUploadOutlined, DeleteOutlined, DragOutlined, ExclamationCircleFilled, SnippetsOutlined } from '@ant-design/icons'
import { Modal } from 'antd'

import { changeFile, changeIsPopoverShow } from '@/store/modules/upload'
import Breadcrumb from '@/components/Breadcrumb'
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
  // 总数
  const [ totalCount, setTotalCount ] = useState(0)
  const [ path, setPath ] = useState(query.path || '0')

  const showBtn: btnType[] = useMemo(()=>{
    return [
      {
        name: '上传',
        icon:<CloudUploadOutlined />,
        disabled: false,
        show: true,
        onClick: ()=>{
          dispatch(changeIsPopoverShow(false))
          // 切片，web work，记得要中断或关闭webworker 线程
          // 先在主线程中进行切片上传相关操作，其他的在说
          
          // 这边我们将完整的信息传递到upload中，相关的操作在upload中操作
          const inp = document.createElement('input');
          inp.type = 'file';
          inp.addEventListener("change", (event) => {
            const inputElement = event.target as HTMLInputElement;
            const { files } = inputElement
            if( files && files[0] ){
              const file = files[0]
              // 对于调用其展开的方式，无法展开这样应该是display:none的原因
              // 决定采用store来操作
              dispatch(changeIsPopoverShow(true))
              dispatch(changeFile(file))
            }
          });
          inp.click();
        }
      },
      {
        name: '新建文件夹',
        icon:<SnippetsOutlined />,
        style:{
          backgroundColor:'#67C23A'
        },
        disabled: false,
        show: category === 'all',
        onClick: async ()=>{
          const fileName = '新建文件夹' + new Date().getTime()
          const res = await createFolder(fileName, path.split('/').pop() || '0')
          const d = res.data.data
          d.key = res.data.data.fileId
          const a = [...data]
          a.unshift(res.data.data)
          setTotalCount(totalCount + 1)
          setData(a)
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
            content: '你确定要删除这些文件吗？删除的文件可在10天内通过回收站还原',
            async onOk() {
              dispatch(changeBtnDisabled(true))
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
  }, [btnDisabled, category, selectKeys, data])


  // 为了在path直接进入的时候设置的
  useEffect(()=>{
      // 将其转为一个普通的对象
    dispatch(changeFilePid(path))
    // 刚进来的时候同时修改仓库fileName
    
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
        filePid : path.split('/').pop() || '0'
      }).then(res =>{
        // 遍历为其添加上key
        let { list } = res.data.data
  
        for (const item of list) {
          item.key = item.fileId
        }
        setTotalCount(res.data.data.totalCount)
        if( filterValue ){
          list = list.filter((item: any)=>{
            return item.fileName.includes(filterValue)
          })
        }
        
        setData(list)
        dispatch(changeLoading(false))
      })
    }, [category, path])


    // 这边我目前没有思考到有什么好方法可以在我上传完文件后调用getData方法，先将这个方法放到仓库调用，后续有好方法再优化
    dispatch(changeGetDataMethod(getData))

    
  return (
    <AllStyled>
      <HeaderBtn showBtn={showBtn} getData={getData}></HeaderBtn>

      {/* <Breadcrumb /> */}

      {
        totalCount ? (
          <div className='table'>
            <Table data={data}></Table>
          </div>
        ) : (
          <>
            <NoData isShowFolder={category === 'all'}></NoData>
          </>
        )
      }
      
    </AllStyled>
  )
})

export default All