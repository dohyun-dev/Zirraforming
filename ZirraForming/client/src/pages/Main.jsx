import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Stars, PerspectiveCamera, ScrollControls } from "@react-three/drei";
import styled from "styled-components";

import Earth from "../components/three/earth";

const CanvasWrap = styled.div`
  width: "100vw";
  height: "100vh";
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
          width: "100vw",
          height: "100vh",

          // backgroundColor: "black",
        }}
      >
        <ScrollControls pages={5}>
          <Earth />
          <PerspectiveCamera
            position={[0, 1, 5]}
            aspect={window.innerWidth / window.innerHeight}
            fov={100}
            near={0.1}
            far={1000}
          />
          <ambientLight intensity={1} color="white" />
        </ScrollControls>
      </Canvas>
    </CanvasWrap>
  );
}
export default Main;
