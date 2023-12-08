/*
 * @Author: XJN
 * @Date: 2023-10-06 02:24:25
 * @LastEditors: xiaojunnanya
 * @LastEditTime: 2023-10-06 21:50:05
 * @FilePath: \easy_pan\src\App.tsx
 * @Description: 
 * @前端实习生: 鲸落
 */
import React, { useEffect } from 'react';

import { useRoutes } from 'react-router-dom'
import routes from '@/router'
import { message } from 'antd';
import { useAppSelector, useAppShallowEqual } from './store';


function App() {
  const [ messageApi, contextHolder ] = message.useMessage()

  const { mess } = useAppSelector((state)=>{
    return {
      mess: state.common.messageApi
    }
  }, useAppShallowEqual)

  useEffect(()=>{
    messageApi.destroy()
    if(mess.info){
      switch (mess.type) {
        case 'success': messageApi.success(mess.info);break;
        case 'error': messageApi.error(mess.info);break;
        case 'info': messageApi.info(mess.info);break;
      
        default:
          break;
      }
    }
  }, [mess])


  return (
    <>
      { contextHolder }
      {
        useRoutes(routes)
      }
    </>
  );
}

export default App;
