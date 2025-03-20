/**
 * g 리액트 훅 폼 
 * g 폼 데이터 관리
*/
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { ToDoAtom } from "../Recoil/atoms/toDoAtom";


interface IForm {
    toDo: string;
}

const CreateToDo = () => {

    /**
     * g reset(); 전체 리셋
     * g reset({toDo : ""}); 특정 필드만 리셋
    */
    const {handleSubmit, setValue, register} = useForm<IForm>();
    const setToDo = useSetRecoilState(ToDoAtom);

    const toDoSubmit = ({ toDo }: IForm) => {

        setToDo(arr => [...arr, {
            text: toDo,
            date: Date.now(),
            category: "TO_DO",
        }]);

        setValue("toDo", "");
    }

    return (
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
            <button>ADD</button>
        </form>
    );
}

export default CreateToDo;