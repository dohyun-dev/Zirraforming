import { motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";
import Noimage from "../../assets/noimage.png";

const Wrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 3fr 50px;
  border-radius: 5px;
  overflow: hidden;
  cursor: pointer;
  .img {
    width: 100%;
    height: 100%;
    text-align: center;
    position: relative;
    overflow: hidden;
    /* background: ${(props) => `url(${props.no}) no-repeat center center`}; */
    background: ${(props) => `url(${props.no}) no-repeat center center`};
    background-size: contain;
  }
  .img::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${(props) =>
      `url(${props.background}) no-repeat center center`};
    content: "";
    background-size: cover;
    opacity: 1;
  }

  .articl_title {
    z-index: 3;
    display: flex;
    font-family: SBAggroB;
    font-size: 11px;
    padding: 8px;
    background-color: #d8dee7;
    word-break: keep-all;
    text-align: center;
    align-items: center;
    justify-content: center;
  }
`;

const MyHover = {
  hover: {
    scale: 1.1,
  },
};

function Article({ images, title, des, link }) {
  const [hover, isHover] = useState(false);
  const newTitle = title.slice(0, 30) + "...";
  console.log(newTitle);
  return (
    <Wrapper
      variants={MyHover}
      whileHover="hover"
      no={Noimage}
      background={images}
      onClick={() => window.open(link, "_blank")}
    >
      <div className="img">{/* <div className="des">{des}</div> */}</div>
      <div className="articl_title">
        {title.length >= 30 ? newTitle : title}
      </div>
    </Wrapper>
  );
}

export default Article;
