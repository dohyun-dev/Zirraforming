import styled from "styled-components";
import { motion } from "framer-motion";
import { useEffect } from "react";

import axios from "axios";
import { useState } from "react";
import Urls from "../../apis/Urls";
import ResultCard from "../../items/ResultCard";
import ResultTwoLine from "../charts/ResultTwoLine";
import { childernVar } from "../../items/Animation";

const Wrapper = styled(motion.div)`
  padding: 20px 10px 10px;
  width: 100%;
  height: 100%;
  background-color: #d8dee7;
  border-radius: 20px;
  font-family: "SBAggroB";
  .grid_box {
    width: 100%;
    height: 100%;

    display: grid;
    grid-template-rows: auto auto 1fr;
    grid-template-columns: 1fr;
    grid-gap: 10px;
  }
`;

const Title = styled(motion.div)`
  text-align: center;

  font-family: "SBAggroB";
  margin-bottom: 2vw;

  font-size: min(3vw, 40px);
  color: black;
  span {
    color: red;
  }
`;

const CardWrapper = styled(motion.div)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GraphBox = styled(motion.div)`
  width: 100%;
  height: 100%;

  padding: 20px 20px 0px;
`;

function Result({ memberId }) {
  const [result, setResult] = useState({
    data: {
      year: [],
      temperature: [],
      temperature_predict: [],
    },
  });
  useEffect(() => {
    axios.get(Urls.myResult(memberId.memberId)).then(({ data }) => {
      setResult({ data });
    });
    console.log(result);
  }, []);

  return (
    <Wrapper variants={childernVar}>
      <div className="grid_box">
        <Title>
          지구에 당신이 <span>오백만명</span> 있다면?
        </Title>
        <CardWrapper>
          <ResultCard color="#487EB0">
            <div className="title">10년 후 지구온도</div>
            <div className="result">
              <span>{result.data.temperature_2030 * 1} </span> 감소
            </div>
          </ResultCard>
          <ResultCard color="#9C88FF">
            <div className="title">10년 후 이산화탄소</div>
            <div className="result">
              <span>{Math.round(result.data.co2_2030 * 1000) / 1000}%</span>
              감소
            </div>
          </ResultCard>
          <ResultCard color="#3c9f58">
            <div className="title">10년 후 빙하무게</div>
            <div className="result">
              <span>{Math.round(result.data.ice_2030 * 1000) / 1000}%</span>
              감소
            </div>
          </ResultCard>
          {/* {{xline, yline, zline, title, name, color, format}} */}
        </CardWrapper>
        <GraphBox>
          <ResultTwoLine
            xline={result?.data?.year}
            yline={result?.data?.temperature}
            zline={result?.data?.temperature_predict}
            name={"Temperature"}
            color={"#FBC531"}
            format={"°C"}
          />
        </GraphBox>
      </div>
    </Wrapper>
  );
}

export default Result;
