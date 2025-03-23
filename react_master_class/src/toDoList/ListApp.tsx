import { useRecoilValue } from "recoil";
import CreateToDo from "./component/createToDo";
import ToDo from "./component/toDo";
import { ToDoSelector, ToDoCatAtom, ToDoCatEnumLabel } from "./Recoil";

function List() {

    const toDos     = useRecoilValue(ToDoSelector);
    const catIdx    = useRecoilValue(ToDoCatAtom);
    const cat       = ToDoCatEnumLabel[catIdx];        

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px"
            }}
        >
            <h1>To Dos</h1>
            <hr style={{width: "100%"}} />
            <CreateToDo />
            <hr style={{width: "100%"}} />
            <h1>{cat}</h1>
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
            <hr style={{width: "100%"}} />
        </div>
    );
}

export default List;