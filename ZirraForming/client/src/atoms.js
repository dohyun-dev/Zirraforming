import { atom, selector } from "recoil";

export const MainData = atom({
  key: "MainData",
  default: {},
});

// data 조작

export const SummaryData = selector({
  key: "SummaryData",
  get: ({ get }) => {
    const datas = get(MainData);

    const Summary = {
      global: datas?.global.temperature.slice(-1)[0],
      co2: datas?.co2.co2.slice(-1)[0],
      iceArea: datas?.iceArea.extent.slice(-1)[0],
      iceWeight: datas?.iceWeight.extent.slice(-1)[0],
    };
    return Summary;
  },
});

export const co2Images = selector({
  key: "co2Images",
  get: ({ get }) => {
    const datas = get(MainData);

    return datas?.co2.images;
  },
});
