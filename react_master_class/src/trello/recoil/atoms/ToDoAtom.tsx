import { atom } from "recoil";

export interface IToDo {
    text: string;
    id: number;
}

export interface IBoard {
    type: string;
    toDos: IToDo[];
}

export interface IToDoAtom {
    [key: string] : IToDo[]
}

export const ToDoAtom = atom<IToDoAtom>({
    key: "CToDoAtomKey",
    default: {
        "To Do": [],
        "Doing": [],
        "Done": [],
    }
});