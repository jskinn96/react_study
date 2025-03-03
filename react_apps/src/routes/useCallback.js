import {useCallback, useState, useEffect, memo} from "react";

const Counter = memo(({clickEvent}) => {

    console.log('hi');
    return (
        <div>
            <button data-type="+" onClick={clickEvent}>+</button>
            <button data-type="-" onClick={clickEvent}>-</button>
        </div>
    );
});

/**
 * g 콜백 함수를 저장하여 불필요한 재생성을 막음
 * g 자식 컴포넌트에 props로 전달할 때 유용함
 * g React.memo와 함께 사용하면 성능 최적화 가능
 * g 하지만 무조건 사용하지 말고, 최적화가 필요한 경우에만 사용하기!
*/
const CallbackEl = () => {

    const [count, countFn] = useState(1);

    const countFunc = useCallback((e) => {

        const btnTarget = e.target;
        const btnType   = btnTarget.dataset.type; 
        
        if (btnType === '+') countFn((num) => Number(num) + 1);
        else countFn((num) => Number(num) - 1);

    }, []);

    const changeFunc = (e) => {

        const input = e.target;
        const val   = input.value;
        
        countFn(val);
    }

    return (
        <div>
            <input type="number" value={count} onChange={changeFunc} />
            <Counter clickEvent={countFunc} />
        </div>
    );
}

export default CallbackEl;