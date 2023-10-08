import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import '@/assets/css/reset.css'
import '@/assets/css/common.css'

import { BrowserRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter>
      <Suspense fallback=''>
        <App />
      </Suspense>
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

