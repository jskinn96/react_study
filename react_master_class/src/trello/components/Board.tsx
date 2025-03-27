import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import Card from "./Card";
import { useRef } from "react";
import { IBoard, ToDoAtom } from "../recoil";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { text } from "stream/consumers";

const Wrap = styled.div`
    padding-top: 20px;
    background-color: ${({ theme }) => theme.bgGray};
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 320px;
    flex-shrink: 0;
    overflow: hidden;
`;

interface IBoardEl {
    is_dragging_over: string;
    is_dragging_over_from_this: string;
}

const BoardEl = styled.ul<IBoardEl>`
    display: flex;
    flex-direction: column;
    padding: 20px;
    gap: 10px;
    flex-grow: 1;
    background-color: ${props =>
        props.is_dragging_over === "true"
            ? "#74b9ff"
            : props.is_dragging_over_from_this === "true"
                ? "#dfe6e9"
                : "#b2bec3"
    }
`;

const Title = styled.h1`
    margin-bottom: 10px;
    text-align: center;
    font-weight: 900;
    font-size: 24px;
    color: #111;
`;

interface IForm {
    [key: string]: string;
}

const Form = styled.form`
    width: 100%;
`;

const Board = ({ type, toDos }: IBoard) => {

    /**
     * g 컴포넌트가 리렌더링되어도 값이 유지되며 바뀌지 않음
     * g 돔에 직접 접근하거나 리렌더링 없이 내부 값을 기억하고 싶을 때 사용
    */
    // const inputRef = useRef<HTMLInputElement>(null);

    // const clickFn = () => {

    //     inputRef.current?.focus();
    //     setTimeout(() => {

    //         inputRef.current?.blur();
    //     }, 5000);
    // }
    const { register, setValue, handleSubmit } = useForm<IForm>();
    const setToDos = useSetRecoilState(ToDoAtom);

    const setValid = (val: IForm) => {

        setToDos(allBoards => {

            const tmp = {...allBoards};
            
            const copied = [...tmp[type]];
            const newToDo = {
                id: Date.now(),
                text: val[type]
            }
            copied.push(newToDo);

            tmp[type] = copied;

            return tmp;
        });

        setValue(type, "");
    }

    return (
        <Droppable droppableId={type}>
            {(dropProps, snapshot) => (
                <Wrap>
                    <Title>{type}</Title>
                    {/* <input
                        type="text"
                        ref={inputRef}
                    />
                    <button onClick={clickFn}>add</button> */}
                    <Form onSubmit={handleSubmit(setValid)}>
                        <input
                            {...register(type, { required: true })}
                            type="text"
                            placeholder={`Add task on ${type}`}
                        />
                    </Form>
                    <BoardEl
                        ref={dropProps.innerRef}
                        {...dropProps.droppableProps}
                        is_dragging_over={snapshot.isDraggingOver.toString()}
                        is_dragging_over_from_this={Boolean(snapshot.draggingFromThisWith).toString()}
                    >
                        {
                            toDos.map((toDo, idx) => (
                                <Card
                                    key={toDo.id}
                                    toDo={toDo.text}
                                    id={toDo.id}
                                    idx={idx}
                                />
                            ))
                        }
                        {dropProps.placeholder}
                    </BoardEl>
                </Wrap>
            )}
        </Droppable>
    );
}

export default Board;