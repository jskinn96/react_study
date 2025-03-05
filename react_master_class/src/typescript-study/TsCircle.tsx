import styled from "styled-components"

//g CircleEl 컴포넌츠의 props 타입을 정의
interface CircleElType {
    bgColorEl : string,
    bdColorEl : string,
}

const CircleEl = styled.div<CircleElType>`
    width: 300px;
    height: 300px;
    border-radius: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 50px;
    background-color: ${(props) => props.bgColorEl};
    border:1px solid ${(props) => props.bdColorEl};
`;

//g Circle 컴포넌츠의 props 타입을 정의...?는 값이 없어도 된다는 뜻
interface circleType {
    bgColor  : string,
    bdColor? : string,
    txt?     : string
}

//g txt값이 없으면 빈 값이 들어가게 됨
const Circle = ({bgColor, bdColor, txt = ""} : circleType) => {
    
    //g bdColor값이 없으면 bgColor값이 들어가게됨
    //g bdColor === bgColor && bdColor의 경우, bdColor와 bgColor의 값이 같으면 bdColor를 사용하고 틀리면 false 반환
    return (
        <CircleEl 
        bgColorEl={bgColor} 
        bdColorEl={bdColor ?? bgColor}>
            {txt}
        </CircleEl>
    );
}

export default Circle;