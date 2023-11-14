/*
 * @Author: XJN
 * @Date: 2023-10-06 02:24:25
 * @LastEditors: xiaojunnanya
 * @LastEditTime: 2023-10-17 20:12:15
 * @FilePath: \easy_pan\src\index.tsx
 * @Description: 
 * @前端实习生: 鲸落
 */
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import '@/assets/css/reset.css'
import '@/assets/css/common.css'
import AuthRouter from './utils/authRouter';
import Loading from './views/Loading';

import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter>
      <Provider store={store}>
        <AuthRouter>
          <Suspense fallback={<Loading/>}>
            <App />
          </Suspense>
        </AuthRouter>
      </Provider>
    </BrowserRouter>
);

console.log(`
          _____                                     _____                    _____                    _____  
          /\\    \\                 ______            |\\    \\                  /\\    \\                  /\\    \\ 
        /::\\    \\               |::|   |           |:\\____\\                /::\\    \\                /::\\____\\
        /::::\\    \\              |::|   |           |::|   |                \\:::\\    \\              /:::/    /
      /::::::\\    \\             |::|   |           |::|   |                 \\:::\\    \\            /:::/    / 
      /:::/\\:::\\    \\            |::|   |           |::|   |                  \\:::\\    \\          /:::/    /  
    /:::/  \\:::\\    \\           |::|   |           |::|   |                   \\:::\\    \\        /:::/    /   
    /:::/    \\:::\\    \\          |::|   |           |::|   |                   /::::\\    \\      /:::/    /    
  /:::/    / \\:::\\    \\         |::|   |           |::|___|______    _____   /::::::\\    \\    /:::/    /     
  /:::/    /   \\:::\\    \\  ______|::|___|___ ____   /::::::::\\    \\  /\\    \\ /:::/\\:::\\    \\  /:::/    /      
/:::/____/     \\:::\\____\\|:::::::::::::::::|    | /::::::::::\\____\\/::\\    /:::/  \\:::\\____\\/:::/____/       
\\:::\\    \\      \\::/    /|:::::::::::::::::|____|/:::/~~~~/~~      \\:::\\  /:::/    \\::/    /\\:::\\    \\       
  \\:::\\    \\      \\/____/  ~~~~~~|::|~~~|~~~     /:::/    /          \\:::\\/:::/    / \\/____/  \\:::\\    \\      
  \\:::\\    \\                    |::|   |       /:::/    /            \\::::::/    /            \\:::\\    \\     
    \\:::\\    \\                   |::|   |      /:::/    /              \\::::/    /              \\:::\\    \\    
    \\:::\\    \\                  |::|   |      \\::/    /                \\::/    /                \\:::\\    \\   
      \\:::\\    \\                 |::|   |       \\/____/                  \\/____/                  \\:::\\    \\  
      \\:::\\    \\                |::|   |                                                          \\:::\\    \\ 
        \\:::\\____\\               |::|   |                                                           \\:::\\____\\
        \\::/    /               |::|___|                                                            \\::/    /
          \\/____/                 ~~                                                                  \\/____/

个人博客：www.xiaojunnan.cn                                                                                                 
`);

