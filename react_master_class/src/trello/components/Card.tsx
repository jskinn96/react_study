import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

interface ICard {
    toDo: string;
    idx: number;
}

const CardEl = styled.li`
    border-radius: 5px;
    padding: 10px 10px;
    background-color: ${({ theme }) => theme.cardBg};
    box-shadow: 0 4px 10px ${({ theme }) => theme.cardShadow};
    transition: box-shadow 0.2s ease;
`;

const Card = ({ toDo, idx }: ICard) => {

    return (
        <Draggable draggableId={toDo} index={idx}>
            {(dragProps) =>
                <CardEl
                    ref={dragProps.innerRef}
                    {...dragProps.draggableProps}
                    {...dragProps.dragHandleProps}
                >
                    {toDo}
                </CardEl>
            }
        </Draggable>
    );
}

export default React.memo(Card);