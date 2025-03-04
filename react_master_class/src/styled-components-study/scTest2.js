import styled from "styled-components";

const Father = styled.div`
  display: flex;
  gap: 20px;
`;
//g attrs를 통해 어트리뷰트를 설정 가능하다.
const Input = styled.input.attrs({required: true, maxLength: 10})`
  background-color: tomato;
`;

function App() {

  //g as로 객체 태그를 변화시킬 수 있다.
  return (
    <Father as="header">
      <Input />
      <Input />
      <Input />
      <Input />
      <Input />
    </Father>
  );
}

export default App;