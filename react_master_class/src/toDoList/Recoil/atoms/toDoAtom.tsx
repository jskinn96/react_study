import { atom } from "recoil";

export interface IToDo {
    text: string;
    date: number;
    category: "TO_DO" | "DOING" | "DONE";
}

export const ToDoAtom = atom<IToDo[]>({
    key: "toDoAtomKey",
    default: []
});