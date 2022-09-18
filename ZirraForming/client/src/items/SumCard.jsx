import { motion } from "framer-motion";
import styled from "styled-components";

import { ReactComponent as Up } from "../assets/svgs/up.svg";
import { ReactComponent as Down } from "../assets/svgs/down.svg";

const Wrapper = styled(motion.div)`
  height: 150px;
  width: 350px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  .gridBox {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: 1fr 2fr;
    .grid__title {
      display: flex;
      align-items: flex-end;

      color: ${(props) => props.color};
      grid-area: 1 / 1 / 2/ 3;
      white-space: nowrap;
      font-size: 1.5rem;
      padding: 10px 0px;
    }

    .grid__int {
      display: flex;
      padding: 0px;
      align-items: flex-start;
      font-size: 4rem;
      line-height: 3rem;
      padding-left: 5px;
    }

    .grid__dan {
      padding-left: 2px;
      font-size: 15px;
      line-height: 20px;
    }
  }
`;

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

function SumCard({ color, title, content, dan, up }) {
  return (
    <Wrapper color={color} variants={childrenVar}>
      <div className="gridBox">
        <div className="grid__title">{title}</div>
        <div className="grid__int">
          {up ? <Up /> : <Down />}
          &nbsp;{content}
        </div>
        <div className="grid__dan">{dan}</div>
      </div>
    </Wrapper>
  );
}

export default SumCard;
