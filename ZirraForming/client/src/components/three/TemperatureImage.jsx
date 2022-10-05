import { Html } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { globalTemperature, globalTemperatureImages } from "../../atoms";
import { FixWrapper, ImgWrapper } from "../../items/ImageWrapper";

import { MySlider } from "../../items/Slider";
import { WrapVar } from "../../items/Animation";

import { ReactComponent as Play } from "../../assets/svgs/play.svg";
import { ReactComponent as Stop } from "../../assets/svgs/stop.svg";
import { useInterval } from "../../hooks";
const ImgGraph = styled.image`
  position: relative;
  width: 100%;
  height: 100%;
`;

function TemperatureImage({ html }) {
  const Temper = useRecoilValue(globalTemperature);
  const maxImages = Temper.images.length - 1;

  const { now, setNow, start, stop, play, setPlay } = useInterval(maxImages);
  useEffect(() => {
    start();
  }, []);
  return (
    <FixWrapper top={"50%"} right={"55%"} ref={html}>
      <ImgWrapper
        color={"#FBC531"}
        variants={WrapVar}
        initial="start"
        animate="end"
      >
        <div className="title">
          {/* <div className="top">Global Temperature</div> */}
          <div className="top">지구표면온도</div>
          {/* <div className="bottom_left">GLOBAL LAND-OCEAN TEMPERATURE INDEX</div> */}
          <div className="bottom_left">세계 표면온도 지표</div>
          <div className="bottom_right">
            <div className="right__top">YEAR</div>
            <div className="right__bottom">{Temper.year[now]}</div>
          </div>
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
          {play ? (
            <Stop
              onClick={() => {
                stop();
              }}
              width={"100%"}
              height={"100%"}
              fill={"#FBC531"}
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
              fill={"#FBC531"}
              style={{
                paddingBottom: "5px",
              }}
            />
          )}
          <p>{Temper.year[0]}</p>
          <MySlider
            value={now}
            color={"#FBC531"}
            setNow={setNow}
            count={maxImages}
            play={play}
            setPlay={setPlay}
          />
          <p>{Temper.year.slice(-1)[0]}</p>
        </div>
      </ImgWrapper>
    </FixWrapper>
  );
}

export default TemperatureImage;
