/*
 * @Author: XJN
 * @Date: 2023-10-06 02:24:25
 * @LastEditors: xiaojunnanya
 * @LastEditTime: 2023-10-06 21:50:05
 * @FilePath: \easy_pan\src\App.tsx
 * @Description: 
 * @前端实习生: 鲸落
 */
import React from 'react';

import { useRoutes } from 'react-router-dom'
import routes from '@/router'

function App() {
  return (
    <div>
      {
        useRoutes(routes)
      }
    </div>
  );
}

export default App;
