import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { co2, globalTemperature, globalTemperatureImages } from "../../atoms";
import { FixWrapper, ImgWrapper } from "../../items/ImageWrapper";

import { MySlider } from "../../items/Slider";
import { WrapVar } from "../../items/TransitionAni";

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
    <FixWrapper top={"50%"} left={"55%"}>
      <ImgWrapper variants={WrapVar} initial="start" animate="end">
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
                  loading="lazy"
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
      </ImgWrapper>
    </FixWrapper>
  );
}

export default Co2Image;
