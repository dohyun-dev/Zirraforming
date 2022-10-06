import { useEffect } from "react";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { member } from "../../atoms";
import GrassGraph from "../charts/GrassGraph";
import axios from "axios";
import Urls from "../../apis/Urls";
import { motion } from "framer-motion";
import { childernVar } from "../../items/Animation";

const Wrapper = styled(motion.div)`
  padding: 20px 20px 10px;
  background-color: #d8dee7;
  border-radius: 20px;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr auto;
  color: black;
  font-size: 24px;
  font-family: "SBAggroB";
  .top {
    .graph {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px max(10px, 1.5vw);
      svg {
        width: 100%;
        text {
          font-size: 5;
        }
      }
    }
  }
  .bottom {
    display: flex;
    flex-direction: column;
    width: 100%;

    overflow: auto;
    .title {
      margin-bottom: 10px;
    }
    .image_wrap {
      display: grid;
      grid-gap: 10px;
      grid-template-rows: 1fr;
      grid-template-columns: minmax(100px, calc(12vw));
      grid-auto-columns: minmax(100px, calc(12vw));
      grid-auto-flow: column;
      border-radius: 20px;
      width: 100%;
      height: 100%;
      min-height: calc(12vw * 1.6);
      padding: 25px 10px;
      background-color: #e0e5e9;
      overflow: hidden;
      .image_div {
        display: flex;
        align-items: center;
      }
      ::-webkit-scrollbar {
        height: 8px;
        background-color: none;
      }
      ::-webkit-scrollbar-thumb {
        background-color: #f5f6fa;
        border-radius: 10px;
      }
      :hover {
        overflow-x: scroll;
      }
    }
  }
`;

function MyZira({ memberId }) {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  // const [date, setDate] = useState("2022-10-01");
  const [datas, setDatas] = useState([]);
  const [count, setCount] = useState(0);
  const memberInfo = useRecoilValue(member);

  useEffect(() => {
    axios.get(Urls.todayZira(memberId.memberId, date)).then((res) => {
      setDatas(res.data.images);
      setCount(res.data.count);
    });
  }, [date]);
  const mySVG = document.getElementsByTagName("svg")[0];
  mySVG.setAttribute("viewBox", "0 0 590 100");

  return (
    <Wrapper variants={childernVar}>
      <div className="top">
        <div className="title">누적 지라포밍 : {memberInfo.total}회</div>
        <div className="graph">
          <GrassGraph setDate={setDate} data={memberInfo.zirraforming} />
        </div>
      </div>
      <div className="bottom">
        <div className="title">
          {date} 지라포밍 : {count} 회
        </div>
        <div className="image_wrap">
          {datas.map((data, idx) => {
            return (
              <div className="image_div" key={idx}>
                <img src={data} width="100%" />
              </div>
            );
          })}
        </div>
      </div>
    </Wrapper>
  );
}

export default MyZira;
