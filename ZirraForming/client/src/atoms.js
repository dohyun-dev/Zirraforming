import { atom, selector } from "recoil";

export const MainData = atom({
  key: "MainData",
  default: {
    co2: {
      co2: [],
      images: [],
      imgYear: [],
      year: [],
    },
    temperature: {
      images: [],
      lowess: [],
      year: [],
      temperature: [],
    },
    iceArea: {
      extent: [],
      images: [],
      year: [],
    },
  },
});

// data 조작

export const SummaryData = selector({
  key: "SummaryData",
  get: ({ get }) => {
    const datas = get(MainData);

    const Summary = {
      temperature: datas?.temperature.temperature.slice(-1)[0],
      co2: datas?.co2.co2.slice(-1)[0],
      iceArea: datas?.iceArea.extent.slice(-1)[0],
      iceWeight: datas?.iceWeight.extent.slice(-1)[0],
    };
    return Summary;
  },
});

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
  key: "iceArea",
  get: ({ get }) => {
    const datas = get(MainData);
    return datas?.iceArea;
  },
});

