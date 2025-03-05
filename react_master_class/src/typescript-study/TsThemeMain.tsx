import ReactDOM from 'react-dom/client';
import App from './TsThemeApp';
import { ThemeProvider, DefaultTheme } from 'styled-components';

//g 타입스크립트로 테마들에 사용될 타입 정의
//g 현재 defaultTheme이 정의 되면서 theme의 type이 맞지 않아 오류가 발생
// interface ThemeType {
//   backgroundColor: string,
//   textColor: string
// }

// const darkTheme:ThemeType = {
//   textColor: "whitesmoke",
//   backgroundColor: "#111",
// };

// const lightTheme:ThemeType = {
//   textColor: "#111",
//   backgroundColor: "whitesmoke",
// };

//g DefaultTheme에 맞게 수정
const darkTheme:DefaultTheme = {
  color : "whitesmoke",
  bgColor : "#111",
  btnColor : "tomato",
};

const lightTheme:DefaultTheme = {
  color: "#111",
  bgColor: "whitesmoke",
  btnColor : "teal",
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