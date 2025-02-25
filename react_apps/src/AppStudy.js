import Btn from "./buttonStudy";
import styles from "./appStudy.module.css";
//g 리액트에서 특정 기능만 가져와서 "react."을 생략하여 작성도 가능하다
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HiFn = () => {

  //g HiFn 컴포넌트가 실행될 때(마운트 및 업데이트), 한번만 실행
  useEffect(() => {

    console.log('hi');
    //g useEffect cleanup 기능
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

//g useEffect cleanup 기능 조건 설명

/**
 * 1. 컴포넌트가 사라질 때	부모 컴포넌트에서 해당 컴포넌트를 렌더링하지 않을 때
 * 2. 의존성 배열 값이 변경될 때	기존 useEffect가 cleanup되고, 새로운 effect가 실행될 때
 * 3. 컴포넌트가 리렌더링될 때 ([] 없이 사용)	모든 리렌더링마다 기존 effect가 cleanup되고 새로운 effect 실행
 * 4. 페이지 이동 / 앱 종료	SPA 라우팅 변경 시 기존 페이지의 컴포넌트가 언마운트됨
*/

//g 1. 컴포넌트가 화면에서 제거될 때 (UnMount)
const ChildComponent = () => {
  useEffect(() => {
    console.log("컴포넌트가 마운트됨");

    return () => {
      console.log("컴포넌트가 언마운트됨");
    };
  }, []);

  return <div>자식 컴포넌트</div>;
};

const ParentComponent = () => {
  const [show, setShow] = useState(true);

  return (
    <div>
      <button onClick={() => setShow(!show)}>토글</button>
      {show && <ChildComponent />}
    </div>
  );
};

//g 2. 의존성 배열이 변경될 때 (Deps 변경)
const Example = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(`count 값이 변경됨: ${count}`);

    return () => {
      console.log(`이전 count 값(${count}) cleanup`);
    };
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>증가</button>
    </div>
  );
};

//g 3. 컴포넌트가 리렌더링될 때, 의존성 없는 useEffect에서 발생
const Example2 = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("useEffect 실행됨");

    return () => {
      console.log("cleanup 실행됨");
    };
  });

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>증가</button>
    </div>
  );
};

//g 4. 페이지가 이동하거나, 앱이 종료될 때
const PageA = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("PageA 마운트됨");

    return () => {
      console.log("PageA 언마운트됨");
    };
  }, []);

  return (
    <div>
      <h1>PageA</h1>
      <button onClick={() => navigate("/pageB")}>PageB로 이동</button>
    </div>
  );
};