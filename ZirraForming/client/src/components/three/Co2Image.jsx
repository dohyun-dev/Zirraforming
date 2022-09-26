import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { co2, globalTemperature, globalTemperatureImages } from "../../atoms";

import { MySlider } from "../../items/Slider";

const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 75%;
  width: min(45vw, 700px);

  transform: translate(-50%, -50%);
  /* height: min(calc(50vw * 0.8), 400px); */
  .title {
    display: grid;
    grid-template-columns: 1fr 200px;
    grid-template-rows: auto 50px;
    align-items: center;
    .top {
      grid-area: 1 / 1 / 2 /3;
      font-size: 42px;
    }
    .bottom_left {
      color: #fbc531;
    }
    .bottom_right {
      text-align: right;
      font-size: 40px;
    }
  }
  .imgWrap {
    width: 100%;
    position: relative;
    .image {
      position: absolute;
      top: 0;
      left: 0;
      height: auto;
      visibility: hidden;
    }
    .current {
      visibility: visible;
      position: relative;
    }
  }

  .progress {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 100px 1fr 100px;
    width: 100%;
    position: relative;

    p {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 20px;
      margin-top: 10px;
    }
  }
`;

const ImgGraph = styled.image`
  position: relative;
  width: 100%;
  height: 100%;
`;

function Co2Image() {
  const co2Data = useRecoilValue(co2);
  const maxImages = co2Data?.images.length - 1;
  const [now, setNow] = useState(0);
  return (
    <Wrapper>
      <div className="title">
        <div className="top">CO2</div>
        <div className="bottom_left">DIRECT MEASUREMENTS: 2005-PRESENT</div>
        <div className="bottom_right">{co2Data.year[now]}</div>
      </div>
      <div className="imgWrap">
        {co2Data.images.map((image, idx) => {
          return (
            <div key={idx} className={idx == now ? "image current" : "image"}>
              <img
                src={image}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </div>
          );
        })}
      </div>
      <div className="progress">
        <p>{co2Data.year[0]}</p>
        <MySlider
          value={now}
          color={"#E84118"}
          setNow={setNow}
          count={maxImages}
        />
        <p>{co2Data.year.slice(-1)[0]}</p>
      </div>
    </Wrapper>
  );
}

export default Co2Image;
