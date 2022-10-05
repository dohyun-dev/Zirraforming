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
  top: 40vh;
  left: 50vw;
  transform: translate(-50%, -50%);
  width: 50vw;
  max-width: 800px;
  font-size: 20px;
  p {
    font-size: 20px;
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
  first: { type: "heading1", text: "줄어드는 북극 빙하" },
  third: [
    {
      type: "paragraph",
      text: "북극 해빙은 1981년부터 2010년 사이의 평균범위와 비교하여 10년 마다 13%의 비율로 줄어들고 있습니다. / 아래의 애니메이션은 위성관측을 기반으로 1979년 이후 매년 측정된 북극해빙의 최소 크기를 보여줍니다. ",
    },
    {
      type: "paragraph",
      text: " 기후변화에 관한 정부 간 협의체 (IPCC)에 따르면 2021년 북극해의 얼음면적이 과거 1천년 역사를 통틀어 가장작았다고 한다. / 2000년 이후로 줄어드는 속도가 더 빨라지고 있으며, 유럽 아이슬라드 빙하는 길이가 1km 이상 줄었다고 알려집니다 / 빙하가 녹으면서 북극 생태계는 큰 영향을 받고 있습니다.",
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
