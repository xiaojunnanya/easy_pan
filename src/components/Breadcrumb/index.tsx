/*
 * @Author: XJN
 * @Date: 2023-12-11 16:53:31
 * @LastEditors: xiaojunnanya
 * @LastEditTime: 2023-12-28 10:11:34
 * @FilePath: \easy_pan\src\components\Breadcrumb\index.tsx
 * @Description: 
 * @前端实习生: 鲸落
 */
import React, { memo, useMemo } from 'react'
import { useAppSelector, useAppShallowEqual } from '../../store/index';
import { Breadcrumb } from 'antd';
import { setIncludesBeforeArr, setIncludesArr } from '@/utils';
import { useNavigate } from 'react-router-dom';


const index = memo(() => {
    const navigate = useNavigate()
    // 去仓库取id和名字的数据
    const { filePid, fileName } = useAppSelector(state =>{
        return {
          filePid: state.home.filePid,
          fileName: state.home.fileName
        }
      }, useAppShallowEqual)


    const breadcrumb = useMemo(()=>{
      const a = setIncludesBeforeArr(filePid)
      const b = setIncludesArr(fileName)

      let newArr = []

      for(let i = 0; i < a.length; i++){
        newArr.push({
          title: b[i],
          onClick: ()=>{
            navigate(`?path=${a[i]}`)
          }
        })
      }

      return newArr

    }, [ filePid, fileName])
        

    return (
      <Breadcrumb separator=">" items={breadcrumb} style={{cursor:'pointer', marginBottom:'10px'}}/>
    )
})

export default index