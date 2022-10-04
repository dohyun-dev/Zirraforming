import { motion } from "framer-motion";
import styled from "styled-components";
import { hoverUpDown } from "./Animation";

export const ImgWrapper = styled(motion.div)`
  width: ${(props) => props.width || "min(30vw, 700px)"};

  .title {
    display: grid;
    grid-template-columns: 1fr 100px;
    grid-template-rows: auto 40px;
    margin-bottom: 12px;

    align-items: center;
    .top {
      grid-area: 1 / 1 / 2 /3;
      font-size: min(4vw, 40px);
    }
    .bottom_left {
      color: ${(props) => props.color};
      font-size: min(1vw, 18px);
      align-self: center;
    }
    .bottom_right {
      display: grid;
      grid-template-columns: 80px;
      height: 100%;
      grid-template-rows: 15px 1fr;
      text-align: right;
      font-size: min(3vw, 30px);
      .right__top {
        width: 100%;
        font-size: 1px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: ${(props) => props.color};
      }
      .right__bottom {
        width: 100%;
        text-align: center;
      }
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
    grid-template-columns: 25px auto 1fr auto;
    width: 100%;
    position: relative;
    align-items: center;
    grid-gap: 15px;
    svg {
      cursor: pointer;
      :hover {
        animation: ${hoverUpDown} 1s infinite alternate;
      }
    }

    p {
      padding-bottom: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 25px;
      font-family: "GmarketSansMedium";
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
