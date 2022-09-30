import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { hoverUpDown } from "./Animation";

export const BasicButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 45px;
  border-radius: 10px;
  border: 0px;
  background-color: #3c9f58;
  color: #f5f6fa;
  font-size: 16px;
  font-weight: 500;
  font-family: "GmarketSansMedium";
  cursor: pointer;

  transition: all 0.3s linear;

  :hover {
    background-color: rgba(0, 0, 0, 0);
    color: #3c9f58;

    border: 5px solid #3c9f58;
  }
  p {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;

    :hover {
      animation: infinite alternate ${hoverUpDown} 1s;
    }
  }
`;
