import { Html } from "@react-three/drei";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { MainData, SummaryData } from "../../atoms";
import SumCard from "../../items/SumCard";

const FixWrapper = styled.div`
  position: fixed;
  display: flex;
  bottom: 0px;
  left: 50%;
  width: 95vw;
  min-width: 700px;
  max-width: 1600px;
  transform: translate(-50%, 0);
  height: 300px;
  align-items: center;

  @media screen and (max-width: 1400px) {
    max-width: 1100px;
    align-items: center;
  }
`;

const Wrapper = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 1fr;

  width: 100%;

  @media screen and (max-width: 1400px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr 1fr;

    transform: translate(-50%, -50%);
  }
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
      duration: 1,
      delayChildren: 0,
      staggerChildren: 1,
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
    // transition: {
    //   delayChildren: 0.3,
    //   staggerChildren: 0.3,
    //   duration: 1,
    // },
  },
};

function Summary() {
  // const summaryData = useRecoilValue(SummaryData);
  return (
    <FixWrapper>
      <Wrapper variants={WrapVar} initial="start" animate="end">
        <SumCard
          color={"#FBC531"}
          title={"Global Temperature"}
          content={"1.01"}
          dan={"°C since 1880"}
          up={true}
        />
        <SumCard
          color={"#E84118"}
          title={"Carbon Dioxide"}
          content={"419"}
          dan={"parts per million (current) 1880"}
          up={true}
        />
        <SumCard
          color={"#487EB0"}
          title={"IceArea"}
          content={"427"}
          dan={"percent per decade since 1979"}
          up={false}
        />
        <SumCard
          color={"#9C88FF"}
          title={"Ice Sheets"}
          content={"13"}
          dan={"billion metric tons per year"}
          up={false}
        />
      </Wrapper>
    </FixWrapper>
  );
}

export default Summary;
