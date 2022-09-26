import { Html } from "@react-three/drei";
import { useEffect } from "react";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { globalTemperature, globalTemperatureImages } from "../../atoms";

import { MySlider } from "../../items/Slider";

const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 25%;
  transform: translate(-50%, -50%);
  width: min(45vw, 700px);
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
    margin-top: 10px;
    width: 100%;
    position: relative;

    p {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 32px;
    }
  }
`;

const ImgGraph = styled.image`
  position: relative;
  width: 100%;
  height: 100%;
`;

function TemperatureImage() {
  const Temper = useRecoilValue(globalTemperature);
  const maxImages = Temper.images.length - 1;
  const [now, setNow] = useState(0);
  return (
    <Wrapper>
      <div className="title">
        <div className="top">Global Temperature</div>
        <div className="bottom_left">GLOBAL LAND-OCEAN TEMPERATURE INDEX</div>
        <div className="bottom_right">{Temper.year[now]}</div>
      </div>
      <div className="imgWrap">
        {Temper.images.map((image, idx) => {
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
        <p>{Temper.year[0]}</p>
        <MySlider
          value={now}
          color={"#FBC531"}
          setNow={setNow}
          count={maxImages}
        />
        <p>{Temper.year.slice(-1)[0]}</p>
      </div>
    </Wrapper>
  );
}

export default TemperatureImage;
