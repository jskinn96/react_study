import { atom, selector } from "recoil";

export const minutesAtom = atom<number | "">({
    key: "minutesAtomKey",
    default: "",
});

export const minutesSelector = selector<number | "">({
    key: "minutesSelectorKey",
    get: ({ get }) => {

        const minutes = get(minutesAtom);
        return minutes === '' ? '' : minutes / 60;
    },
    set: ({ set }, newValue) => {

        if (newValue === '') set(minutesAtom, '');
        else set(minutesAtom, (newValue as number) * 60);
    }
});