import styled from "styled-components";
import { IToDo } from "../Recoil";

const Li = styled.li`
    display: flex;
    gap: 10px;
`;

const ToDo = ({ text, date, category }: IToDo) => {

    const setCat = (newCat: IToDo["category"]) => {

        console.log(newCat);
    }

    return (
        <Li>
            <span>{text}</span>
            <span>{date}</span>
            {
                category !== "DOING" && (
                    <button onClick={() => setCat("DOING")}>Doing</button>
                )
            }
            {
                category !== "TO_DO" && (
                    <button onClick={() => setCat("TO_DO")}>To Do</button>
                )
            }
            {
                category !== "DONE" && (
                    <button onClick={() => setCat("DONE")}>Done</button>
                )
            }
        </Li>
    );
}

export default ToDo;