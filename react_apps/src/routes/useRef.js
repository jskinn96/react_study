import {useRef, useState, useEffect} from "react";

const RefEl = () => {

    //g 돔 요소에 직접 접근하여 지정한 그 돔요소가 된다
    const inputRef                  = useRef();
    //g 렌더링 될 때, 화면 구성에 영향을 주지 않지만 변화된 값은 가지고 있다
    const numRef                    = useRef(1);
    const [numState, stateFunc]     = useState(1);

    const btnClick = () => {

        inputRef.current.focus();

        numRef.current += 1;

        console.log(numRef.current);
    }

    const stateBtnClick = () => {

        stateFunc(el => el + 1);
    }

    useEffect(() => {

        console.log('mount');

        //g unmount될 때나 다음 값으로 바뀌기 이전 실행되며 cleanup이라고 하고 함수 형태로 사용되어야 한다.
        return () => {

            console.log('unmount');
        }

    }, [numState]);

    return (
        <div>
            <input 
            type="text"
            ref={inputRef}
            />
            <button onClick={btnClick}>Ref Click</button>
            <button onClick={stateBtnClick}>State Click</button>
            <div>Hello I'm Ref Element {numRef.current}</div>
            <div>Hello I'm State Element {numState}</div>
        </div>
    );
}

export default RefEl;