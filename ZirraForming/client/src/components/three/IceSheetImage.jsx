import { useEffect, useRef } from "react";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { globalTemperature, globalTemperatureImages } from "../../atoms";
import { FixWrapper, ImgWrapper } from "../../items/ImageWrapper";

import { WrapVar } from "../../items/Animation";
import Namone from "../../assets/icesheet/namtwo.jpg";
import { motion } from "framer-motion";

const ImageWrap = styled(motion.div)`
  width: 40vw;
  max-width: 800px;
`;

function IceSheetImage({ first }) {
  const Temper = useRecoilValue(globalTemperature);

  return (
    <FixWrapper top={"50%"} left={"55%"} transform={"translate(0%, -50%)"}>
      <ImageWrap
        className="item"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={first ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring" }}
        color={"#FBC531"}
      >
        <img src={Namone} width={"100%"} alt="" />
      </ImageWrap>
    </FixWrapper>
  );
}

export default IceSheetImage;
