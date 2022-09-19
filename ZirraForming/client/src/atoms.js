import { atom, selector } from "recoil";

export const MainData = atom({
  key: "main",
  default: {},
});

// data 조작

export const Co2 = selector({
  key: "Co2",
  get: ({ get }) => {
    const datas = get;
  },
});
