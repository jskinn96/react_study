import styled from "styled-components";
import { IToDo, ToDoCatEnum, ToDoCatEnumLabel } from "../Recoil";
import { setTimestamp } from "../../utils/common";
import { useSetRecoilState } from "recoil";
import { ToDoAtom } from "../Recoil";

const Li = styled.li`
    display: flex;
    gap: 10px;
`;

const ToDo = ({ text, date, category }: IToDo) => {

    const setToDos = useSetRecoilState(ToDoAtom);

    const setCat = (newCat: ToDoCatEnum) => {

        //g 배열 값을 새로운 상수로 민들어 전달...기존 값은 불변성을 유지해야 하기에 새로운 배열을 만들어 전달한다.
        setToDos((toDos) => {

            const targetIdx = toDos.findIndex(toDo => toDo.date === date);

            const beforeToDo    = toDos.slice(0, targetIdx);
            const afterToDo     = toDos.slice(targetIdx + 1);
            const newToDo       = {text, date, category: newCat as ToDoCatEnum};
            
            const newToDos = [...beforeToDo, newToDo, ...afterToDo];

            return newToDos;
        })
    }

    const timeSTP = setTimestamp(date);
    
    return (
        <Li>
            <span>{text}</span>
            <span>{timeSTP}</span>
            {
                Object.values(ToDoCatEnum)
                .filter(val => typeof val === "number")
                .map(val => (
                    category !== val && (
                        <button key={val} value={val} onClick={() => setCat(val)}>
                            {ToDoCatEnumLabel[val]}
                        </button>
                    )
                ))
            }
        </Li>
    );
}

export default ToDo;