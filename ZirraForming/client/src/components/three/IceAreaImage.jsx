import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  co2,
  globalTemperature,
  globalTemperatureImages,
  iceArea,
} from "../../atoms";
import { FixWrapper, ImgWrapper } from "../../items/ImageWrapper";

import { MySlider } from "../../items/Slider";
import { WrapVar } from "../../items/TransitionAni";

function IceAreaImage() {
  const ArcticImage = useRecoilValue(iceArea);
  const maxImages = ArcticImage?.images.length - 1;
  const [now, setNow] = useState(0);
  return (
    <FixWrapper
      id="IceAreaDescription"
      left={"50%"}
      transform={"translate(-50%, -100%)"}
      width={"min(30vw, 1000px)"}
      // bg={"black"}
      style={{
        paddingBottom: "10px",
      }}
    >
      <ImgWrapper
        width={"100%"}
        variants={WrapVar}
        initial="start"
        animate="end"
      >
        <div className="imgWrap">
          {ArcticImage.images.map((image, idx) => {
            return (
              <div
                key={idx}
                style={{
                  width: "100%",
                }}
                className={idx == now ? "image current" : "image"}
              >
                <img
                  src={image}
                  style={{
                    width: "100%",
                    height: "100%",
                    // display: "block",
                  }}
                />
              </div>
            );
          })}
        </div>
        <div className="progress" style={{}}>
          <p>{ArcticImage.year[0]}</p>
          <MySlider
            value={now}
            color={"#487EB0"}
            setNow={setNow}
            count={maxImages}
          />
          <p>{ArcticImage.year.slice(-1)[0]}</p>
        </div>
      </ImgWrapper>
    </FixWrapper>
  );
}

export default IceAreaImage;
