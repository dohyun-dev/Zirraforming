import { motion } from "framer-motion";
import styled from "styled-components";
import img1 from "../../assets/banner/temp4.png";
import img2 from "../../assets/banner/temp5.png";
import img3 from "../../assets/banner/temp6.png";
import img4 from "../../assets/banner/test1.png";

const Banners = styled.div`
  position: absolute;
  width: 100vw;
  top: 2500vh;
  position: absolute;
  left: 0;
`;

const ImageWrapper = styled(motion.div)`
  position: relative;
  background-color: black;
`;

function Banner() {
  return (
    <Banners>
      <ImageWrapper>
        <img src={img1} width={"100%"} />
      </ImageWrapper>
      <ImageWrapper>
        <img src={img2} width={"100%"} />
      </ImageWrapper>
      <ImageWrapper>
        <img src={img3} width={"100%"} />
      </ImageWrapper>
    </Banners>
  );
}
export default Banner;
