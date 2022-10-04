import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { co2, globalTemperature, globalTemperatureImages } from "../../atoms";
import { FixWrapper, ImgWrapper } from "../../items/ImageWrapper";

import { ReactComponent as Play } from "../../assets/svgs/play.svg";
import { ReactComponent as Stop } from "../../assets/svgs/stop.svg";

import { MySlider } from "../../items/Slider";
import { WrapVar } from "../../items/Animation";
import { useInterval } from "../../hooks";
import { useEffect } from "react";

const ImgGraph = styled.image`
  position: relative;
  width: 100%;
  height: 100%;
`;

function Co2Image() {
  const co2Data = useRecoilValue(co2);
  const maxImages = co2Data?.images.length - 1;
  const ImgYear = [];
  const ImgMonth = [];
  co2Data.imgYear.forEach((data) => {
    const temp = data.split("-");
    ImgYear.push(temp[0]);
    ImgMonth.push(temp[1]);
  });

  const MonthString = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "April",
    "May",
    "Jun",
    "JuLy",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const { now, setNow, start, stop, play, setPlay } = useInterval(maxImages);
  useEffect(() => {
    start();
  }, []);
  return (
    <FixWrapper top={"50%"} left={"55vw"}>
      <ImgWrapper
        color={"#E84118"}
        variants={WrapVar}
        initial="start"
        animate="end"
      >
        <div className="title">
          <div className="top">이산화탄소</div>
          {/* <div className="bottom_left">DIRECT MEASUREMENTS: 2005-PRESENT</div> */}
          <div className="bottom_left">2005년부터 현재까지 추이</div>
          <div
            className="bottom_right"
            style={{
              width: "70px",
              gridTemplateRows: "1fr 1fr",
            }}
          >
            <div
              className="right__top"
              style={{
                fontSize: "12px",
              }}
            >
              {ImgYear[now]}
            </div>
            <div
              className="right__bottom"
              style={{
                fontSize: "24px",
              }}
            >
              {MonthString[ImgMonth[now] * 1]}
            </div>
          </div>
        </div>
        <div className="imgWrap">
          {co2Data.images.map((image, idx) => {
            const a = "s";
            const httpsImage = [image.slice(0, 4), a, image.slice(4)].join("");
            return (
              <div key={idx} className={idx == now ? "image current" : "image"}>
                <img
                  src={httpsImage}
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
              fill={"#E84118"}
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
              fill={"#E84118"}
              style={{
                paddingBottom: "5px",
              }}
            />
          )}
          <p>{ImgYear[0]}</p>
          <MySlider
            value={now}
            color={"#E84118"}
            setNow={setNow}
            count={maxImages}
            play={play}
            setPlay={setPlay}
          />
          <p>{ImgYear.slice(-1)[0]}</p>
        </div>
      </ImgWrapper>
    </FixWrapper>
  );
}

export default Co2Image;
