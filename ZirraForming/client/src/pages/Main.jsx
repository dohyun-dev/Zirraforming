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
import { useNavigate } from "react-router-dom";
import IceArea from "../components/main/IceArea";
import IceSheet from "../components/main/IceSheet";
import IceSheetImage from "../components/three/IceSheetImage";
import Last from "../components/main/Last";
import Banner from "../components/main/Banner";

const CanvasWrap = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("/assets/bg/space.jfif");
  background-position: center center;
  background-size: cover;
  color: ${(props) => props.theme.lightWhite};
  font-family: "SBAggroB";
`;

function Main() {
  const RecoilBridge = useRecoilBridgeAcrossReactRoots_UNSTABLE();

  const [allData, setAllData] = useRecoilState(MainData);

  const [summaryPage, setSummaryPage] = useState(false);
  const [temImage, setTemImage] = useState(false);
  const [co2Image, setCo2Image] = useState(false);
  const [iceAreaImage, setIceAreaImage] = useState(false);

  // 빙하페이지 조작
  const [first, setFirst] = useState(false);
  const [second, setSecond] = useState(false);
  const [third, setThird] = useState(false);
  const [forth, setForth] = useState(false);

  // 남극페이지 조작
  const [nfirst, setnFirst] = useState(false);
  const [nsecond, setnSecond] = useState(false);
  const [nthird, setnThird] = useState(false);

  // 마지막페이지
  const [last, setLast] = useState(false);
  const [lastName, setLastName] = useState(false);

  const [banner, setBanner] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(Urls.total())
      .then(({ data }) => {
        console.log(data);
        setAllData(data);
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
            <ScrollControls
              pages={25}
              style={
                {
                  // left: "20px",
                }
              }
            >
              <Earth
                navigate={navigate}
                setIceAreaImage={setIceAreaImage}
                setTemImage={setTemImage}
                setCo2Image={setCo2Image}
                setSummaryPage={setSummaryPage}
                setFirst={setFirst}
                setSecond={setSecond}
                setThird={setThird}
                setForth={setForth}
                setnFirst={setnFirst}
                setnSecond={setnSecond}
                setLast={setLast}
                setLastName={setLastName}
                setBanner={setBanner}
              />
            </ScrollControls>
          </Suspense>
        </RecoilBridge>
      </Canvas>
      {temImage ? <TemperatureImage /> : null}
      {co2Image ? <Co2Image /> : null}
      {iceAreaImage ? <IceAreaImage /> : null}
      {summaryPage ? <Summary /> : null}
      {first ? (
        <IceArea first={first} second={second} third={third} forth={forth} />
      ) : null}
      {/* {nfirst || nsecond ? (
        <IceSheetImage first={nfirst} second={nsecond} third={nthird} />
      ) : null} */}
      {last ? <Last last={last} first={lastName} /> : null}
      {banner ? <Banner /> : null}
    </CanvasWrap>
  );
}
export default Main;
