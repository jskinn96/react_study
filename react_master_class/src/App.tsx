import styled from "styled-components";

//g 테마 사용
const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.bgColor}
`;

const H1 = styled.h1`
  font-size: 48px;
  color: ${props => props.theme.color}
`;

function App() {

  return (
    <Container>
      <H1>Hello World!</H1>
    </Container>
  );
}

export default App;