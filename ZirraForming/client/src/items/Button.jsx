import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";

export const BasicButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 50px;
  border-radius: 10px;
  border: 0px;
  background-color: #3c9f58;
  color: #f5f6fa;
  font-size: 20px;
  font-weight: 300;
  font-family: "Black Han Sans";
  cursor: pointer;

  transition: all 0.3s linear;

  :hover {
    background-color: rgba(0, 0, 0, 0);
    color: #3c9f58;

    border: 5px solid #3c9f58;
  }
`;
