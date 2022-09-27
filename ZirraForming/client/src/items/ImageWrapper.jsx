import { motion } from "framer-motion";
import styled from "styled-components";

export const ImgWrapper = styled(motion.div)`
  width: ${(props) => props.width || "min(20vw, 1000px)"};

  .title {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-rows: auto 40px;
    align-items: center;
    .top {
      grid-area: 1 / 1 / 2 /3;
      font-size: 30px;
    }
    .bottom_left {
      color: #fbc531;
      font-size: 15px;
    }
    .bottom_right {
      text-align: right;
      font-size: 40px;
    }
  }
  .imgWrap {
    width: 100%;
    position: relative;

    .image {
      position: absolute;
      top: 0;
      left: 0;
      height: auto;
      visibility: hidden;
    }
    .current {
      visibility: visible;
      position: relative;
    }
  }

  .progress {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 100px 1fr 100px;
    width: 100%;
    position: relative;

    p {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 20px;
      margin-top: 0px;
    }
  }
`;

export const FixWrapper = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  width: ${(props) => props.width};
  background-color: ${(props) => props.bg || "null"};
  align-items: center;
  bottom: ${(props) => props.bottom};
  top: ${(props) => props.top};
  right: ${(props) => props.right};
  left: ${(props) => props.left};
  transform: ${(props) => props.transform || "translate(0, -50%)"};
`;
