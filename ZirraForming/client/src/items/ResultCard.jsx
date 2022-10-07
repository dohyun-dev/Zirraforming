import styled from "styled-components";
import { motion } from "framer-motion";

const ResultCard = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
  max-width: 300px;

  height: 20px;
  margin: 10px;
  .title {
    display: flex;
    align-items: center;
    font-size: min(1.7vw, 18px);
    color: black;
    margin-bottom: 5px;
  }
  .result {
    font-size: min(2.5vw, 25px);
    color: black;

    span {
      color: ${(props) => props.color};
    }
  }
`;

export default ResultCard;
