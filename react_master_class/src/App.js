import styled, { keyframes } from "styled-components";

const Wrapper = styled.div`
  display: flex;
  gap: 100px;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: ${(props) => props.theme.backgroundColor}
`;

//g 애니메이션 키프레임 추가 가능
const rotateAni = keyframes`
  0% {
    transform: rotate(0deg);
    border-radius: 0px;
  }
  50% {
    border-radius: 250px;
  }
  100% {
    transform: rotate(360deg);
    border-radius: 0px;
  }
`;

//g span:hover가 아닌 span 안에 &:hover를 통해 관련성을 증가 시킬 수 있다.
const Emoji = styled.span`
  font-size: 100px;
  cursor: pointer;
  transition: .3s;
  &:active {
    font-size: 50px !important;
  }
`;

/**
 * g animation 키프레임을 사용하여 돌아가는 객체를 만들었다.
 * g 객체 안에 객체를 선택하는 선택자(pseudo selector)를 사용할 수 있다.
 * g 박스 컴포넌트 안에 Emoji 컴포넌트가 존재할 경우 스타일 변화도 사용 가능하다.
*/
const Box = styled.div`
  width: 500px;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: tomato;
  animation: ${rotateAni} 1s linear infinite;
  ${Emoji}:hover {
    font-size: 200px;
  }
`;

const Box2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentTxt = styled.span`
  font-size: 30px;
  font-weight: bold;
  color: ${(props) => props.theme.textColor}
`;

function App() {

  return (
    <Wrapper>
      <Box>
        <Emoji>😉</Emoji>
      </Box>
      <Box2>
        <Emoji>😘</Emoji>
        <ContentTxt>Hello World!</ContentTxt>
      </Box2>
    </Wrapper>
  );
}

export default App;
