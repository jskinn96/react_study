import { useRecoilValue } from "recoil";
import CreateToDo from "./component/createToDo";
import ToDo from "./component/toDo";
import { ToDoAtom } from "./Recoil";

function List() {

    const toDos = useRecoilValue(ToDoAtom);    

    return (
        <div>
            <h1>To Dos</h1>
            <hr />
            <CreateToDo />
            <hr />
            <ul
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px"
                }}
            >
                {
                    toDos.map(arr => <ToDo key={arr.date} {...arr} />)
                }
            </ul>
        </div>
    );
}

export default List;