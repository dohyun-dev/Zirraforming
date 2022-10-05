import { Html } from "@react-three/drei";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { globalTemperature, iceArea } from "../../atoms";
import { Wrapper } from "../../items/MainWrapper";
import OneLine from "../charts/OneLine";
import { motion } from "framer-motion";
import {
  AnimatedCharacters,
  AnimatedCharactersTwo,
} from "../../items/Animation";

const TextBox = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 30vh;
  left: 50vw;
  transform: translate(-50%, -50%);
  width: 50vw;
  max-width: 800px;
  font-size: 20px;
  p {
    font-size: 30px;
    font-family: GmarketSansMedium;
  }
`;

const GraphBox = styled(motion.div)`
  position: fixed;
  font-family: GmarketSansMedium;
  top: 20vh;
  left: 50vw;
  transform: translate(-50%, -5%);
  width: 35vw;
  height: 35vw;
  max-width: 800px;
  max-height: 800px;
  font-size: 20px;
`;

const container = {
  visible: {
    transition: {
      staggerChildren: 0.025,
    },
  },
};

const textHolder = {
  first: { type: "heading1", text: "줄어드는 지구빙하" },
  third: [
    {
      type: "paragraph",
      text: "세계 인구의 최대 밀집 지역이라고 할 중국 / 동남아시아, 인도 사람들의 삶은 황허강, 양쯔강, 메콩강, 갠지스강, 인더스강이라는 다섯 개의 큰 강에 절대적으로 의존하고 있다. 이 다섯 개의 강 모두의 발원지가 힌두쿠시-히말라야 인접 지역이며, 여기에서의 빙하의 변화는 이 강들의 ",
    },
    {
      type: "paragraph",
      text: "이런저런 이유로 살 곳을 잃고 떠돌게 될 전 지구적인 유랑민들의 숫자에 대해 한 보고서는 2060년 12억명, 2100년에는 20억명에 달할 것으로 전망하고 있다. 2100년에 지구 전체의 인구가 100억명 정도에 도달 ",
    },
  ],
};

function IceArea({ first, second, third, forth }) {
  const areaData = useRecoilValue(iceArea);

  return (
    <>
      {forth ? (
        <GraphBox>
          <OneLine
            title={" 매년 북극 빙하 최소 넓이"}
            xline={areaData?.year}
            yline={areaData?.extent}
            name={"빙하 넓이"}
            color={"#487EB0"}
            format={"million sq km"}
          />
        </GraphBox>
      ) : (
        <>
          <TextBox
            initial="hidden"
            animate={first ? "visible" : "hidden"}
            variants={container}
          >
            <AnimatedCharactersTwo item={textHolder.first} />
          </TextBox>
          <TextBox
            initial="hidden"
            animate={second ? "visible" : "hidden"}
            variants={container}
          >
            <AnimatedCharactersTwo item={textHolder.third[0]} />
          </TextBox>
          <TextBox
            initial="hidden"
            animate={third ? "visible" : "hidden"}
            variants={container}
          >
            <AnimatedCharactersTwo item={textHolder.third[1]} />
          </TextBox>
        </>
      )}
    </>
  );
}

export default IceArea;
