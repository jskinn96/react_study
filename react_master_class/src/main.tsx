import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from 'styled-components';
import { darkMode, lightMode } from './typescript-study/Theme';

//g 테마를 사용해서 darkMode, lightMode 컴포넌츠를 가져옴

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <ThemeProvider theme={darkMode}>
    <App />
  </ThemeProvider>
);