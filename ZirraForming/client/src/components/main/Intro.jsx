import { motion } from "framer-motion";
import styled from "styled-components";
import { BasicButton } from "../../items/Button";

import MouseSVG from "../../assets/svgs/whitemouse.svg";
import { Html } from "@react-three/drei";
import Navbar from "../Navbar";

const Wrapper = styled(motion.div)`
  position: fixed;
  left: 10vw;
  /* top: 10vh; */
  top: 100px;

  display: grid;
  grid-template-rows: 1fr 4fr 2fr 2fr 1px;
  align-items: center;

  width: 80vw;
  height: 40vh;
  transition: all linear 0.3;
`;

const Title = styled(motion.h1)`
  font-size: min(7vw, 60px);
  text-align: center;
  font-weight: 400;
  white-space: nowrap;
`;

const TitleWrap = styled(motion.div)`
  display: grid;
  grid-template-rows: 1fr 3fr;
  grid-template-columns: 1fr;
  width: 100%;
  height: 100%;
  padding: 40px 30px 5px;

  .title__top {
    font-size: min(3vw, 30px);
    color: #fbc531;
    text-align: center;
    align-self: end;
  }

  .title__main {
    align-self: start;
    color: #3c9f58;
    text-align: center;
    line-height: min(15vw, 130px);
    font-size: min(15vw, 130px);
  }
`;

const Content = styled(motion.div)`
  font-size: min(3vw, 30px);
  text-align: center;
  word-break: keep-all;
`;

const ButtonWrap = styled(motion.div)`
  justify-self: center;
  display: flex;
  width: min(80vw, 800px);
  height: 100%;
  align-items: center;
  justify-content: space-evenly;
  padding-top: 40px;
`;

const SVG = styled(motion.img)`
  position: relative;

  top: 20px;
  width: 50px;
  height: 50px;
  margin: auto auto;
`;

const WrapVar = {
  start: {
    opacity: 0,
    y: 10,
  },
  end: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delayChildren: 1.5,
      staggerChildren: 1.5,
    },
  },
};

const childrenVar = {
  start: {
    opacity: 0,
    y: 10,
  },
  end: {
    opacity: 1,
    y: 0,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.3,
      duration: 0.5,
    },
  },
};

function Intro() {
  return (
    <>
      <Navbar width={"100vw"} />
      <Wrapper variants={WrapVar} initial="start" animate="end">
        <Title variants={childrenVar}>당신의 지구는 안녕하십니까?</Title>
        <TitleWrap variants={childrenVar}>
          <div className="title__top">지구방위대 아픈지구 살리기 프로젝트</div>
          <div className="title__main">지라포밍</div>
        </TitleWrap>
        <Content variants={childrenVar}>
          지라포밍이란 지구 + 테라포밍으로 더 이상 생명이 살 수 없는
          <br /> 행성을 생명이 살 수 있도록 만드는 작업을 의미한다
        </Content>
        <ButtonWrap variants={childrenVar}>
          <a href="/style">
            <BasicButton variants={childrenVar}>환경스타일 분석</BasicButton>
          </a>
          <a href="/campaign">
            <BasicButton variants={childrenVar}>별보러 갈래?</BasicButton>
          </a>
          <a href="/quiz">
            <BasicButton variants={childrenVar}>환경 퀴즈 풀기</BasicButton>
          </a>
        </ButtonWrap>
        <SVG src={MouseSVG} variants={childrenVar}></SVG>
      </Wrapper>

      {/* <img
        src="/assets/temp/temp4.png"
        style={{ marginLeft: "-200px", width: "100vw", marginTop: "1000px" }}
        alt=""
      />
      <img
        src="/assets/temp/temp5.png"
        style={{ marginLeft: "-200px", width: "100vw", marginTop: "1000px" }}
        alt=""
      /> */}
      {/* <img
        src="/assets/temp/temp6.png"
        style={{ marginLeft: "-200px", width: "100vw", marginTop: "1000px" }}
        alt=""
      /> */}
    </>
  );
}

export default Intro;
