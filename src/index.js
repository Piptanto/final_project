import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import PageRoutes from './components/routes';
import reportWebVitals from './reportWebVitals';

import ContextProvider from './components/context';

ReactDOM.render(
<BrowserRouter>
      <ContextProvider>
          <PageRoutes />
      </ContextProvider>
</BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring per formance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
