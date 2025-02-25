import { useState } from "react";

function App() {
  
  const [toDo, setToDo]   = useState("");
  const [toDos, setToDos] = useState([]);

  const setToDoFn = (e) => setToDo((tmpToDo) => tmpToDo = e.target.value);

  const setToDosFn = (e) => {

    e.preventDefault();

    if (toDo === "") return;

    setToDos((tmpToDos) => [toDo, ...tmpToDos]);
    setToDo("");
  }

  return (
    <div>
      <form 
      onSubmit={setToDosFn}>
        <h1>To do list ({toDos.length})</h1>
        <input 
        type="text" 
        value={toDo} 
        onChange={setToDoFn} />
        <button>추가</button>
      </form>
      <hr />
      <ul>
        {
          //g toDos 배열을 맵 함수를 활용하여 li를 출력한다. 
          toDos.map((toDoTxt, idx) => (<li key={idx}>{toDoTxt}</li>))
        }
      </ul>
    </div>
  );
}

export default App;