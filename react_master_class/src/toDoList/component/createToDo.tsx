/**
 * g 리액트 훅 폼 
 * g 폼 데이터 관리
*/
import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import { ToDoAtom, ToDoCatAtom, ToDoCatEnum } from "../Recoil/atoms/toDoAtom";
import React from "react";


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
    const [toDoCat, setToDoCat] = useRecoilState(ToDoCatAtom);

    const toDoSubmit = ({ toDo }: IForm) => {

        setToDo(arr => [...arr, {
            text: toDo,
            date: Date.now(),
            category: toDoCat,
        }]);

        setValue("toDo", "");
    }

    const selectToDoCat = (e: React.FormEvent<HTMLSelectElement>) => {

        const {
            currentTarget: {
                value: cat
            }
        } = e

        setToDoCat(Number(cat) as ToDoCatEnum);
    }

    return (
        <form onSubmit={handleSubmit(toDoSubmit)}>
            <select 
                value={toDoCat}
                onInput={selectToDoCat}
            >
                <option value={ToDoCatEnum.TO_DO}>To Do</option>
                <option value={ToDoCatEnum.DOING}>Doing</option>
                <option value={ToDoCatEnum.DONE}>Done</option>
            </select>
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