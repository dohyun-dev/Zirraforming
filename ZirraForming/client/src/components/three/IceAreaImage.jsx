import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { co2, globalTemperature, globalTemperatureImages } from "../../atoms";

import { MySlider } from "../../items/Slider";

const Wrapper = styled.div`
  position: fixed;
  bottom: 0%;
  left: 50%;
  width: min(45vw, 500px);
  transform: translate(-50%, 0%);
  /* height: min(calc(50vw * 0.8), 400px); */

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
      font-size: 16px;
    }
  }
`;

const ImgGraph = styled.image`
  position: relative;
  width: 100%;
  height: 100%;
`;

function IceAreaImage() {
  const co2Data = useRecoilValue(co2);
  const maxImages = co2Data?.images.length - 1;
  const [now, setNow] = useState(0);
  return (
    <Wrapper id="IceAreaDescription">
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
          color={"#487EB0"}
          setNow={setNow}
          count={maxImages}
        />
        <p>{co2Data.year.slice(-1)[0]}</p>
      </div>
    </Wrapper>
  );
}

export default IceAreaImage;
