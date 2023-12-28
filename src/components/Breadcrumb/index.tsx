/*
 * @Author: XJN
 * @Date: 2023-12-11 16:53:31
 * @LastEditors: xiaojunnanya
 * @LastEditTime: 2023-12-28 10:11:34
 * @FilePath: \easy_pan\src\components\Breadcrumb\index.tsx
 * @Description: 
 * @前端实习生: 鲸落
 */
import React, { memo, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '../../store/index';
import { BreadcrumbItemType } from 'antd/es/breadcrumb/Breadcrumb';
import { Breadcrumb } from 'antd';
import { setArr } from '@/utils';


const index = memo(() => {

    // 去仓库取id和名字的数据
    const { filePid, fileName, fileInfo } = useAppSelector(state =>{
        return {
          filePid: state.home.filePid,
          fileName: state.home.fileName,
          fileInfo: state.home.fileInfo,
        }
      }, useAppShallowEqual)

    // 面包屑
  const [ breadcrumb, setBreadcrumb ] = useState<BreadcrumbItemType[]>([
    {
      title: '全部文件',
      href: '?path=0',
    },
    {
      title:"1",
      href: '?path=0/kBjuiyYNFf',
    }
  ]);

  useEffect(()=>{
    console.log('11', filePid);
    console.log('222', fileName);
    console.log('fileInfo', fileInfo);
    
    
  }, [filePid, fileName, fileInfo])

  return (
    <Breadcrumb separator=">" items={breadcrumb} />
  )
})

export default index