import { useState } from "react";
/**
 * g 리액트 훅 폼 
 * g 폼 데이터 관리
*/
import { useForm } from "react-hook-form";

interface IToDo {
  toDo : string;
}

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
  const [toDoData, setToDoData] = useState<string[]>([]);

  const toDoSubmit = (data: IToDo) => {

    console.log(data.toDo);
    setToDoData(arr => [...arr, data.toDo]);
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px"
        }}
      >
        {
          toDoData.map((el, idx) => <span key={idx}>{el}</span>)
        }
      </div>
    </div>
  );
}

export default App;