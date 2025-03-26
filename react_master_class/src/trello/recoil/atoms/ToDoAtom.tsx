import { atom } from "recoil";

export const ToDoAtom = atom({
    key: "CToDoAtomKey",
    default: ["a", "b", "c", "d", "e", "f"]
});