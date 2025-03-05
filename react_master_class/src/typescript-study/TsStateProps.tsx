import React, { useState, useEffect } from "react";

function App() {

  //g stateTest의 타입을 <string | number>(문자 또는 숫자)로 정의
  const [stateTest, setStateTest] = useState<string | number>(0);

  useEffect(() => {

    if (stateTest === 1) setStateTest('hi');
    else if (stateTest === 0) setStateTest(1);
        
  }, [stateTest]);

  //g 이벤트 타입을 리액트 폼 이벤트인데 HTMLInputElement라고 정의 
  const onChangeFn = (e : React.FormEvent<HTMLInputElement>) => {

    const {
      currentTarget : {value}
    } = e;

    //g 인풋에서 타입이 텍스트 이므로 기본 value값의 타입은 string이기에 Number를 앞에 붙여야 숫자로 인식 가능
    //g Number를 안 붙일 시, 코드에 오류가 있다고 vsCode에서 알려줌 
    setStateTest(isNaN(Number(value)) ? value : Number(value));
  }

  //g 이벤트 타입을 리액트 폼 이벤트인데 HTMLFormElement라고 정의
  const onSubmitFn = (e : React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    console.log('Hello Im', stateTest);
  }

  console.log('Hello Im', stateTest , '???');

  return (
    <div>
      <form onSubmit={onSubmitFn}>
        <input type="text" onChange={onChangeFn} />
        <button>Log In</button>
      </form>
    </div>
  );
}

export default App;