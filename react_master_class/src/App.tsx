/**
 * g 리액트 훅 폼 
 * g 폼 데이터 관리
*/
import { useForm } from "react-hook-form";
import { atom, useRecoilState } from "recoil";

interface IToDo {
  toDo : string;
}

interface IToDoData {
  text : string;
  date : number;
  category : "ToDo" | "DOING" | "DONE"
}

const ToDoAtom =atom<IToDoData[]>({
  key: "toDoAtom",
  default: []
});

function App() {

  /**
   * g reset(); 전체 리셋
   * g reset({toDo : ""}); 특정 필드만 리셋
  */

  const { 
    register, 
    handleSubmit, 
    setValue, 
    formState : {
      errors
    } 
  } = useForm<IToDo>();
  const [toDoData, setToDoData] = useRecoilState<IToDoData[]>(ToDoAtom);

  const toDoSubmit = ({toDo}: IToDo) => {

    setToDoData(arr => 
      [
        ...arr, 
        {
          text: toDo,
          date: Date.now(),
          category: "ToDo",
        }
      ]
    );
    //g 특정 필드 값 설정
    setValue("toDo", "");
  }

  return (
    <div>
      <form onSubmit={handleSubmit(toDoSubmit)}>
        <input 
          type="text" 
          {
              ...register("toDo", {
                required: "u must write this",
                validate: {
                  noSW: (val) => val.includes("fck") ? "dont do that" : true
                }
              }
            )
          }  
        />
        <button>submit</button>
        <span>{errors.toDo?.message}</span>
      </form>
      <ul
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px"
        }}
      >
        {
          toDoData.map(el => 
            <li key={el.date}>{el.date} : {el.text}</li>
          )
        }
      </ul>
    </div>
  );
}

export default App;