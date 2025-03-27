import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
export interface ICard {
    toDo: string;
    id: number;
    idx: number;
}

const CardEl = styled.li<{ is_dragging: string }>`
    border-radius: 5px;
    padding: 10px 10px;
    background-color: ${(props) =>
        props.is_dragging === "true" ? "#111" : props.theme.bgDark};
    box-shadow: ${(props) =>
        props.is_dragging === "true" ? "0px 2px 5px rgba(0, 0, 0, 0.5)" : "none"};
    transition: box-shadow 0.2s ease;
    font-weight: 700;
`;

const Card = ({ toDo, id, idx }: ICard) => {

    return (
        <Draggable draggableId={`${id}`} index={idx}>
            {(dragProps, snapshot) =>
                <CardEl
                    ref={dragProps.innerRef}
                    {...dragProps.draggableProps}
                    {...dragProps.dragHandleProps}
                    is_dragging={snapshot.isDragging.toString()}
                >
                    {toDo}
                </CardEl>
            }
        </Draggable>
    );
}

export default React.memo(Card);