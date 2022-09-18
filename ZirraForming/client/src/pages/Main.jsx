import { Canvas } from "@react-three/fiber";
import {
  Stars,
  PerspectiveCamera,
  ScrollControls,
  OrthographicCamera,
} from "@react-three/drei";
import styled from "styled-components";

import Earth from "../components/three/Earth";
import { Suspense } from "react";
import Spinner from "../components/main/Spinner";

const CanvasWrap = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("/assets/bg/space.jfif");
  background-position: center center;
  background-size: cover;
  color: ${(props) => props.theme.lightWhite};
  font-family: "Black Han Sans";
`;
function Main() {
  return (
    <CanvasWrap>
      <Canvas
        gl={{ antialias: true }}
        style={{
          width: "100%",
          height: "100%",
          // backgroundColor: "black",
        }}
      >
        <Stars
          saturation={100}
          radius={400}
          count={20000}
          factor={0}
          fade={true}
          speed={1}
        />
        {/* <Suspense fallback={<Spinner />}> */}
        <ScrollControls pages={4}>
          <Earth />
        </ScrollControls>
        {/* </Suspense> */}
      </Canvas>
    </CanvasWrap>
  );
}
export default Main;
