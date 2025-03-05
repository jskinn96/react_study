import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from 'styled-components';

//g 타입스크립트로 테마들에 사용될 타입 정의
interface ThemeType {
  backgroundColor: string,
  textColor: string
}

const darkTheme:ThemeType = {
  textColor: "whitesmoke",
  backgroundColor: "#111",
};

const lightTheme:ThemeType = {
  textColor: "#111",
  backgroundColor: "whitesmoke",
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <div>
    <ThemeProvider theme={darkTheme}>
      <App txt='Hello World!' />
    </ThemeProvider>
  </div>
);