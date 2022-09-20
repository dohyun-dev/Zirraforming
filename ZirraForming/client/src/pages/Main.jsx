import { Canvas } from "@react-three/fiber";
import {
  Stars,
  PerspectiveCamera,
  ScrollControls,
  OrthographicCamera,
} from "@react-three/drei";
import styled from "styled-components";
import axios from "axios";

import Earth from "../components/three/Earth";
import { Suspense, useEffect } from "react";
import Spinner from "../components/main/Spinner";
import {
  useRecoilBridgeAcrossReactRoots_UNSTABLE,
  useRecoilState,
  useSetRecoilState,
} from "recoil";
import { MainData } from "../atoms";
import Urls from "../apis/Urls";

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
  const RecoilBridge = useRecoilBridgeAcrossReactRoots_UNSTABLE();
  const [allData, setAllData] = useRecoilState(MainData);

  useEffect(() => {
    axios.get(Urls.data()).then(({ data }) => {
      setAllData(data.data);
      // console.log(data);
    });
  }, []);
  console.log(allData);
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
        <RecoilBridge>
          <Stars
            saturation={100}
            radius={400}
            count={20000}
            factor={0}
            fade={true}
            speed={1}
          />
          <Suspense fallback={<Spinner />}>
            <ScrollControls pages={15}>
              <Earth />
            </ScrollControls>
          </Suspense>
        </RecoilBridge>
      </Canvas>
    </CanvasWrap>
  );
}
export default Main;
