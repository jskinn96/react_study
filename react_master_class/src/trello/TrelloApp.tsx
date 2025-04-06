import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { IToDoAtom, ToDoAtom } from "./recoil";
import Board from "./components/Board";

const Wrap = styled.main`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: fit-content;
  padding: 20px;
  justify-content: center;
  gap: 20px;
`;

function TrelloApp() {

  const [toDos, setToDos] = useRecoilState<IToDoAtom>(ToDoAtom);

  const dragFunc = ({ destination, source }: DropResult) => {

    if (!destination) return;

    if (destination?.droppableId === source.droppableId) {

      setToDos(allBoards => {

        const tmp = { ...allBoards };

        const copied = [...allBoards[source.droppableId]];
        const [moved] = copied.splice(source.index, 1);

        copied.splice(destination.index, 0, moved);

        tmp[source.droppableId] = copied;

        return tmp;
      });
      
    } else {

      setToDos(allBoards => {

        const tmp = { ...allBoards };

        const current = [...allBoards[source.droppableId]];
        const target = [...allBoards[destination.droppableId]];

        const [moved] = current.splice(source.index, 1);
        target.splice(destination.index, 0, moved);

        tmp[source.droppableId] = current;
        tmp[destination.droppableId] = target;

        return tmp;
      });
    }
  };

  return (
    <DragDropContext onDragEnd={dragFunc}>
      <Wrap>
        {
          Object.keys(toDos).map(type => (
            <Board
              type={type}
              toDos={toDos[type]}
              key={type}
            />
          ))
        }
      </Wrap>
    </DragDropContext>
  );
}

export default TrelloApp;