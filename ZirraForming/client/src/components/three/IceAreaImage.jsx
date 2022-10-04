import { useEffect, useState } from "react";
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
import { WrapVar } from "../../items/Animation";
import { useInterval } from "../../hooks";

import { ReactComponent as Play } from "../../assets/svgs/play.svg";
import { ReactComponent as Stop } from "../../assets/svgs/stop.svg";

function IceAreaImage() {
  const ArcticImage = useRecoilValue(iceArea);
  const maxImages = ArcticImage?.images.length - 1;

  const { now, setNow, start, stop, play, setPlay } = useInterval(maxImages);
  useEffect(() => {
    start();
  }, []);
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
        color={"#487EB0"}
        width={"100%"}
        variants={WrapVar}
        initial="start"
        animate="end"
      >
        <div className="imgWrap">
          {ArcticImage.images.map((image, idx) => {
            const a = "s";
            const httpsImage = [image.slice(0, 4), a, image.slice(4)].join("");
            return (
              <div
                key={idx}
                style={{
                  width: "100%",
                }}
                className={idx == now ? "image current" : "image"}
              >
                <img
                  src={httpsImage}
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
          {play ? (
            <Stop
              onClick={() => {
                stop();
              }}
              width={"100%"}
              height={"100%"}
              fill={"#487EB0"}
              style={{
                paddingBottom: "10px",
              }}
            />
          ) : (
            <Play
              onClick={() => {
                start();
              }}
              width={"100%"}
              height={"100%"}
              fill={"#487EB0"}
              style={{
                paddingBottom: "5px",
              }}
            />
          )}
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
