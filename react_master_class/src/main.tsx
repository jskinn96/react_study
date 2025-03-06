import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from "react-router-dom";
import { router } from './CryptoTracker/Router';
import Reset from './common/resetCSS';
import { ThemeProvider } from 'styled-components';
import DarkMode from "./common/theme"; 

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  // <React.StrictMode>
  //   <ThemeProvider theme={DarkMode}>
  //     <Reset />
  //     <RouterProvider router={router} />
  //   </ThemeProvider>
  // </React.StrictMode>
  <div>
    <ThemeProvider theme={DarkMode}>
      <Reset />
      <RouterProvider router={router} />
    </ThemeProvider>
  </div>
);