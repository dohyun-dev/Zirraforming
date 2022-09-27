import { Html } from "@react-three/drei";
import { useEffect } from "react";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { globalTemperature, globalTemperatureImages } from "../../atoms";
import { FixWrapper, ImgWrapper } from "../../items/ImageWrapper";

import { MySlider } from "../../items/Slider";
import { WrapVar } from "../../items/TransitionAni";

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
    <FixWrapper
      top={"50%"}
      // left={"35%"}
      right={"51%"}
      transform={"translate(0%, -50%)"}
    >
      <ImgWrapper variants={WrapVar} initial="start" animate="end">
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
                  loading="lazy"
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
      </ImgWrapper>
    </FixWrapper>
  );
}

export default TemperatureImage;
