import { atom, selector } from "recoil";

export const MainData = atom({
  key: "MainData",
  default: {},
});

export const MemberData = atom({
  key: "MemberData",
  default: {
    member: {
      Id: "",
    },
  },
});

// data 조작

export const globalTemperature = selector({
  key: "globalTemperature",
  get: ({ get }) => {
    const datas = get(MainData);

    return datas?.temperature;
  },
});

export const co2 = selector({
  key: "co2",
  get: ({ get }) => {
    const datas = get(MainData);
    return datas?.co2;
  },
});

export const iceArea = selector({
  key: "arcticSeaIceDto",
  get: ({ get }) => {
    const datas = get(MainData);
    return datas?.arcticSeaIceDto;
  },
});

export const iceSheet = selector({
  key: "IceSheetsDto",
  get: ({ get }) => {
    const datas = get(MainData);
    return datas?.iceSheetsDto;
  },
});

// user정보

export const userInfo = atom({
  key: "info",
  default: {},
});

export const Token = atom({
  key: "Token",
  default: localStorage.getItem("token") || "",
});

export const member = atom({
  key: "member",
  default: {
    nickName: "",
    total: 0,
    score: 0,
    characterImgPath: "",
    characterName: "",
    badges: "",
    zirraforming: {},
  },
});
