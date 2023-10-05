import React from 'react';

import { useRoutes } from 'react-router-dom'
import routes from '@/router/index.js'

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
