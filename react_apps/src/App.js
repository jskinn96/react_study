import Btn from "./button";
import styles from "./app.module.css";
//g 리액트에서 특정 기능만 가져와서 "react."을 생략하여 작성도 가능하다
import { useState, useEffect } from "react";

const HiFn = () => {

  //g HiFn 컴포넌트가 실행될 때(마운트 및 업데이트), 한번만 실행
  useEffect(() => {

    console.log('hi');
    //g HiFn 컴포넌트가 없어지거나(언마운트) 다음 effect 전에 실행
    //g 해당 기능은 언마운트 되었을 때, 로그 등 기록을 활용하기 위해 사용하는 경우가 많다
    return () => {
      console.log('bye');
    };
  }, []);

  const byeTxt = () => {
    
    console.log('bye text');
  }
  
  const hiTxt = () => {
    
    console.log('hi text');
    
    return byeTxt;
  }
  
  //g 함수를 직접 넣어서 사용하는 방식
  useEffect(hiTxt, []);

  return (
    <h1>Hello</h1>
  )
}

function App() {
  
  const [counter, setValue] = useState(0);
  const [txt, setTxt] = useState("");
  const [show, showFunc] = useState(false);

  const setValue_func = () => (setValue((prev) => prev + 1));

  const effect_func_test = () => {
    
    console.log("한 번 동작");
  }
  //g useEffect는 이벤트를 한번만 동작 시킨다.
  //g React.StrictMode 사용 시, 두 번 동작하여 오류 개선에 도움을 준다. 배포 환경에서는 영향 없음
  useEffect(effect_func_test, []);

  const setTxtFunc = (e) => setTxt((tmpTxt) => tmpTxt = e.target.value)

  //g useEffect의 함수 뒤 의존성 배열을 통해 배열에 존재하는 useState 값이 변화할 때만 이벤트 실행
  useEffect(() => {
    if (counter > 0) console.log(counter, '카운터만 동작 감지');
  }, [counter]);
  useEffect(() => {
    if (txt !== "") console.log(txt, '텍스트만 동작 감지');
  }, [txt]);
  useEffect(() => {
    if (counter > 0 || txt !== "") console.log('카운터와 텍스트 전부 동작 감지');
  }, [counter, txt]);
  
  const showFn = () => showFunc((tmpShow) => !tmpShow)

  return (
    <div>
      <h1
      className={styles.title}
      >Welcome back!</h1>
      <Btn text="Test Button" />
      <div>{counter}</div>
      <input type="text" value={txt} onChange={setTxtFunc} />
      <button onClick={setValue_func}>count up</button>
      {show ? <HiFn /> : null}
      <button onClick={showFn}>{!show ? 'show' : 'hide'}</button>
    </div>
  );
}

export default App;