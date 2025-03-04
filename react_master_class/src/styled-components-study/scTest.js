import styled from "styled-components";

const Father = styled.div`
  display: flex;
`;
//g props를 통해 값을 받아서 사용 가능하다
const Box = styled.div`
  background-color: ${(props) => props.bgColor};
  width: 100px;
  height: 100px;
`;
//g Box 컴포넌츠를 가져와서 Circle이라는 새로운 스타일 컴포넌츠 생성가능
const Circle = styled(Box)`
  border-radius: 50px;
`;

function App() {

  return (
    <Father>
      <Box bgColor="teal" />
      <Circle bgColor="tomato" />
    </Father>
  );
}

export default App;