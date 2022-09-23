import { Html } from "@react-three/drei";
import { useEffect } from "react";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { globalTemperature, globalTemperatureImages } from "../../atoms";

import { MySlider } from "../../items/Slider";

const Wrapper = styled.div`
  position: relative;
  right: 52.5%;
  width: min(45vw, 500px);
  /* height: min(calc(50vw * 0.8), 400px); */

  .imgWrap {
    width: 100%;
    position: relative;
    .image {
      position: relative;
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
  const co2Datas = useRecoilValue(globalTemperature);
  const images = useRecoilValue(globalTemperatureImages);
  const maxImages = images.length - 1;
  const [now, setNow] = useState(0);
  return (
    <Html center>
      <Wrapper>
        <div className="title">야호</div>
        <div className="imgWrap">
          {images.map((image, idx) => {
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
          <p>{co2Datas.year[0]}</p>
          <MySlider
            value={now}
            color={"#FBC531"}
            setNow={setNow}
            count={maxImages}
          />
          <p>{co2Datas.year.slice(-1)[0]}</p>
        </div>
      </Wrapper>
    </Html>
  );
}

export default TemperatureImage;
