import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { ToDoAtom } from "./trello/recoil";
import Card from "./trello/components/Card";

const Wrap = styled.main`
  display: grid;
  grid-template-columns: repeat(1, 3fr);
  padding: 20px;
  justify-content: center;
  gap: 20px;
`;

const Board = styled.ul`
  padding: 20px 10px;
  background-color: ${({ theme }) => theme.bgGray};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 280px;
  max-width: 320px;
  flex-shrink: 0;
`;

function App() {

  const [toDos, setToDos] = useRecoilState<string[]>(ToDoAtom);

  const dragFunc = ({ destination, source }: DropResult) => {

    if (!destination) return;

    setToDos(tmpToDos => {

      const currentIdx = Number(source.index);
      const targetIdx = Number(destination?.index);

      const copied = [...tmpToDos]; 
      const [moved] = copied.splice(currentIdx, 1);
      copied.splice(targetIdx, 0, moved); 

      return copied;
    });
  };

  return (
    <DragDropContext onDragEnd={dragFunc}>
      <Wrap>
        <Droppable droppableId="oneDrop">
          {(dropProps) => (
            <Board ref={dropProps.innerRef} {...dropProps.droppableProps}>
              {toDos.map((toDo, idx) => (
                <Card
                  key={toDo} 
                  toDo={toDo}
                  idx={idx}
                />
              ))}
              {dropProps.placeholder}
            </Board>
          )}
        </Droppable>
      </Wrap>
    </DragDropContext>
  );
}

export default App;