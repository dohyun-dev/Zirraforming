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
import { Suspense, useEffect, useState } from "react";
import Spinner from "../components/main/Spinner";
import {
  useRecoilBridgeAcrossReactRoots_UNSTABLE,
  useRecoilState,
  useSetRecoilState,
} from "recoil";

import Co2Image from "../components/three/Co2Image";
import { MainData } from "../atoms";
import Urls from "../apis/Urls";
import TemperatureImage from "../components/three/TemperatureImage";
import IceAreaImage from "../components/three/IceAreaImage";
import Summary from "../components/three/Summary";

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

  const [summaryPage, setSummaryPage] = useState(false);
  const [temImage, setTemImage] = useState(false);
  const [co2Image, setCo2Image] = useState(false);
  const [iceAreaImage, setIceAreaImage] = useState(false);
  useEffect(() => {
    axios
      .get(Urls.total())
      .then(({ data }) => {
        console.log(data);
        setAllData({
          iceArea: {
            extent: [],
            images: [],
            year: [],
          },
          ...data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleTemper = () => {
    setTemImage(true);
  };
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
          <Suspense fallback={<Spinner />}>
            <ScrollControls pages={25}>
              <Earth
                setIceAreaImage={setIceAreaImage}
                setTemImage={setTemImage}
                setCo2Image={setCo2Image}
                setSummaryPage={setSummaryPage}
              />
            </ScrollControls>
          </Suspense>
        </RecoilBridge>
      </Canvas>
      {temImage ? <TemperatureImage /> : null}
      {co2Image ? <Co2Image /> : null}
      {iceAreaImage ? <IceAreaImage /> : null}
      {summaryPage ? <Summary /> : null}
    </CanvasWrap>
  );
}
export default Main;
