import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
//g React.StrictMode 리액트 디버깅 도구...useEffect 사용 시, 예외적으로 처음 두 번 동작하게 하여 오류 개선에 도움을 준다. 개발 환경에서만 그렇고 배포 시에는 아무런 영향을 주지 않는다.
root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <div>
    <App />
  </div>
);

reportWebVitals();
