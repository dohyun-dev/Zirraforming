import { Html } from "@react-three/drei";
import { useEffect } from "react";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { globalTemperatureImages } from "../../atoms";

const Wrapper = styled.div`
  position: relative;
  right: 52.5%;
  width: min(45vw, 500px);
  /* height: min(calc(50vw * 0.8), 400px); */

  .imgWrap {
    width: 100%;
    position: relative;
    .image {
      position: relative;
      top: 0;
      left: 0;
      height: auto;
      visibility: hidden;
    }
    .current {
      visibility: visible;
      position: absolute;
    }
  }

  .progress {
    background-color: red;
    width: 100%;
    height: 40px;
    position: relative;
  }
`;

const ImgGraph = styled.image`
  position: relative;
  width: 100%;
  height: 100%;
`;

function TemperatureImage() {
  // const images = useRecoilValue(globalTemperatureImages);

  const [now, setNow] = useState(0);

  return (
    <Html center>
      <Wrapper>
        <div className="imgWrap">
          {/* {images.map((image, idx) => {
            return (
              <div key={idx} className={idx == now ? "image" : "image current"}>
                <img
                  src={image}
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              </div>
            );
          })} */}
        </div>
        <div className="progress"></div>
      </Wrapper>
    </Html>
  );
}

export default TemperatureImage;
