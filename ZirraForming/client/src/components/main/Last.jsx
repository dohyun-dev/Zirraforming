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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 50vh;
  left: 50vw;
  transform: translate(-50%, -50%);
  width: 50vw;
  max-width: 800px;
  font-size: 20px;
  font-family: "GmarketSansMedium";
  p {
    font-size: 18px;
    margin: 0px;
  }
`;

const container = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const textHolder = {
  first: { type: "heading1", text: "지라포밍이 필요할 때" },
  second: { type: "heading2", text: "지구방위대" },
  third: [
    {
      type: "paragraph",
      text: `팀장 : 박지현(FE)`,
    },
    {
      type: "paragraph",
      text: `김지혜(BE)`,
    },
    {
      type: "paragraph",
      text: `권도현(BE)`,
    },
    {
      type: "paragraph",
      text: `변수경(BE)`,
    },
    {
      type: "paragraph",
      text: `이동욱(BE)`,
    },
    {
      type: "paragraph",
      text: `허건녕(FE)`,
    },
  ],
};

function Last({ last, first }) {
  const areaData = useRecoilValue(iceArea);
  return (
    <>
      {last ? (
        <>
          <TextBox
            initial="hidden"
            animate={first ? "visible" : "hidden"}
            variants={container}
          >
            <AnimatedCharactersTwo item={textHolder.first} />
            <AnimatedCharactersTwo item={textHolder.second} />
            {textHolder.third.map((item, idx) => {
              return <AnimatedCharactersTwo item={item} key={idx} />;
            })}
          </TextBox>
        </>
      ) : null}
    </>
  );
}

export default Last;
