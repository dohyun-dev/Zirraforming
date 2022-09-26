import React, { Suspense, useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Stars,
  PerspectiveCamera,
  OrthographicCamera,
  useScroll,
  Scroll,
  useTexture,
  Html,
} from "@react-three/drei";
import * as THREE from "three";
import dat from "dat.gui";
import Summary from "./Summary";

import EarthDayMap from "../../assets/textures/8k_earth_daymap.jpg";
import EarthNormalMap from "../../assets/textures/8k_earth_normal_map.jpg";
import EarthSpecularMap from "../../assets/textures/8k_earth_specular_map.jpg";
import EarthCloudsMap from "../../assets/textures/8k_earth_clouds.jpg";
import CO2001 from "../../assets/textures/co2001.png";

import Intro from "../main/Intro";
import gsap from "gsap";
import Spinner from "../main/Spinner";
import GlobalTemperature from "../main/GlobalTemperature";

import { co2Images, MainData } from "../../atoms";
import {
  useRecoilBridgeAcrossReactRoots_UNSTABLE,
  useRecoilValue,
} from "recoil";
import TemperatureImage from "./TemperatureImage";
import Co2 from "../main/Co2";
import { CustomEase } from "gsap/all";
import IceArea from "../main/IceArea";

const gui = new dat.GUI();

// 지구 컴포넌트
function Earth({ setCo2Image, setTemImage, setIceAreaImage }, props) {
  // const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(
  //   TextureLoader,
  //   [EarthDayMap, EarthNormalMap, EarthSpecularMap, EarthCloudsMap]
  // );
  // Recoil Data 불러오기
  const RecoilBridge = useRecoilBridgeAcrossReactRoots_UNSTABLE();

  const [colorMap, normalMap, specularMap, cloudsMap] = useTexture([
    EarthDayMap,
    EarthNormalMap,
    EarthSpecularMap,
    EarthCloudsMap,
  ]);

  // const co2Texture = [];
  // for (let i = 0; i++; i < co2ImageData.length) {
  //   co2Texture.push(useTexture(co2ImageData[i]));
  // }
  // GUI

  // 애니메이션 조작
  const [Ortho, setOrtho] = useState(false);
  const [rotate, setRotate] = useState(true);
  const [firstAni, setFirstAni] = useState(true);
  const [secondAni, setSecondAni] = useState(false);
  const [thridAni, setThirdAni] = useState(false);
  const [forthAni, setForthAni] = useState(false);
  const [fifthAni, setFifthAni] = useState(false);

  // HTML 조작
  const [introPage, setIntroPage] = useState(false);
  const [summaryPage, setSummaryPage] = useState(false);
  const [globalTem, setGlobalTem] = useState(false);
  const [co2Page, setCo2Page] = useState(false);
  const [iceAreaPage, setIceAreaPage] = useState(false);

  const test = useRef();
  const test2 = useRef();
  const cloud = useRef();
  const earth = useRef(); // 지구객체
  const pCamera = useRef(); // Perspective 카메라 객체
  const oCamera = useRef(); // Orthographic 카메라 객체

  const scroll = useScroll();

  useFrame(({ clock }, delta) => {
    cloud.current.rotation.y -= delta / 20;
    // console.log(scroll.scroll.current);
    if (rotate) {
      earth.current.rotation.y += delta / 8;
    }

    // 1번째 페이지 무빙
    if (scroll.scroll.current === 0) {
      setIntroPage(true);
      setSummaryPage(false);
      setCo2Page(false);
      setCo2Image(false);
      setTemImage(false);
      setIceAreaPage(false);

      setRotate(true);
      setFirstAni(true);
      setSecondAni(false);
    }

    if (Math.floor(scroll.scroll.current * 100) === 6) {
      setSummaryPage(true);
      setIntroPage(false);
      setGlobalTem(false);
      setCo2Image(false);
      setTemImage(false);
      setIceAreaPage(false);

      setFirstAni(false);
      setThirdAni(false);
      setSecondAni(true);
      setForthAni(false);
    }

    if (Math.floor(scroll.scroll.current * 100) === 13) {
      setGlobalTem(true);
      setTemImage(false);
      setIceAreaPage(false);

      setCo2Page(false);
      setCo2Image(false);

      setSummaryPage(false);

      setFirstAni(false);
      setSecondAni(false);

      setForthAni(false);
      setRotate(false);
    }

    if (
      (Math.floor(scroll.scroll.current * 100) >= 13) &
      (Math.floor(scroll.scroll.current * 100) <= 28)
    ) {
      setTemImage(true);
      setCo2Image(false);
      setCo2Page(false);

      setThirdAni(true);
      setForthAni(false);
    }

    if (
      (Math.floor(scroll.scroll.current * 100) >= 31) &
      Math.floor(scroll.scroll.current * 100 < 48)
    ) {
      // setGlobalTem(false);
      setTemImage(false);
      setSummaryPage(false);
      setCo2Image(true);
      setCo2Page(true);
      setIceAreaPage(false);

      setIceAreaImage(false);

      setFirstAni(false);
      setSecondAni(false);

      setThirdAni(false);
      setForthAni(true);
      setFifthAni(false);

      setRotate(false);
    }

    if (Math.floor(scroll.scroll.current * 100) >= 50) {
      setTemImage(false);
      setSummaryPage(false);
      setCo2Image(false);
      setCo2Page(false);
      setIceAreaPage(true);
      setIceAreaImage(true);

      setFirstAni(false);
      setSecondAni(false);
      setThirdAni(false);
      setForthAni(false);
      setFifthAni(true);

      setRotate(false);
    }
    if (firstAni) {
      // 애니메이션
      gsap
        .to(earth.current.position, {
          y: -650,
          x: 0,
        })
        .duration(3);
      gsap
        .to(earth.current.scale, {
          x: Math.min(450, window.innerWidth - 50),
          y: Math.min(450, window.innerWidth - 50),
          z: Math.min(450, window.innerWidth - 50),
        })
        .duration(3);
      gsap
        .to(pCamera.current.rotation, {
          y: 0,
          x: 0,
          z: 0,
        })
        .duration(2);
    }
    // 두번째 애니메이션
    if (secondAni) {
      gsap
        .to(earth.current.position, {
          y: 150,
          x: 0,
        })
        .duration(2);
      gsap
        .to(pCamera.current.rotation, {
          y: 0,
          x: 0,
          z: 0,
        })
        .duration(2);

      gsap
        .to(earth.current.scale, {
          x: Math.min(500, window.innerWidth - 100),
          y: Math.min(500, window.innerWidth - 100),
          z: Math.min(500, window.innerWidth - 100),
        })
        .duration(2);

      gsap
        .to(pCamera.current.position, {
          x: 0,
          y: 0,
          z: 1000,
          duration: 3,
          ease: "sine",
        })
        .duration(3);
      setSummaryPage(true);
    }
    // 세번째 에니메이션
    if (thridAni) {
      if (pCamera.current.rotation.y < -0.1) {
        gsap.to(pCamera.current.rotation, {
          x: 0,
          y: 0,
          z: 0,
          duration: 1,
          ease: "slow",
        });
      } else {
        gsap.to(pCamera.current.rotation, {
          x: -1.5,
          y: 1.5,
          z: 0,
          duration: 3,
          ease: "slow",
        });
      }
      gsap
        .to(pCamera.current.position, {
          x: 0,
          y: 0,
          z: 1000,
        })
        .duration(3);
    }
    if (forthAni) {
      //71
      if (pCamera.current.rotation.y > 0.1) {
        gsap.to(pCamera.current.rotation, {
          x: 0,
          y: 0,
          z: 0,
          duration: 3,
          ease: "slow",
        });
      } else {
        gsap.to(pCamera.current.rotation, {
          x: -1.5,
          y: -1.5,
          z: 0,
          duration: 3,
          ease: "slow",
        });
      }
      gsap
        .to(pCamera.current.position, {
          x: 0,
          y: 0,
          z: 1000,
        })
        .duration(3);
    }
    if (fifthAni) {
      if (pCamera.current.rotation.x < -0.1) {
        gsap.to(pCamera.current.rotation, {
          x: 0,
          y: 0,
          z: 0,
          duration: 3,
          ease: "slow",
        });
      } else {
        gsap.to(pCamera.current.rotation, {
          x: 1.5,
          y: -1.5,
          z: 0,
          duration: 3,
          ease: "slow",
        });
      }
    }
  });

  return (
    <>
      {/* 카메라 설정 */}

      <PerspectiveCamera
        makeDefault
        ref={pCamera}
        position={props.position || [0, 0, 1000]}
        fov={50}
        near={1}
        far={10000}
        zoom={0.8}
      />
      {/* <OrbitControls enableZoom={false} /> */}

      {/* 컨트롤 설정 */}

      {/* 조명설정 */}
      <ambientLight intensity={1} color="white" />
      <pointLight color="#f6f3ea" position={[0, 0, 0]} intensity={1} />

      {/* 오브젝트 */}

      <group ref={earth} position={[0, 0, -500]}>
        <mesh ref={cloud}>
          <sphereGeometry args={[1.005, 32, 16]} />
          <meshPhongMaterial
            map={cloudsMap}
            opacity={0.6}
            // depthWrite={true}
            transparent={true}
            side={THREE.DoubleSide}
          />
        </mesh>
        <mesh>
          <sphereGeometry args={[1, 32, 16]} />
          <meshPhongMaterial specularMap={specularMap} />
          <meshStandardMaterial
            map={colorMap}
            normalMap={normalMap}
            metalness={0.4}
            roughness={0.7}
          />
        </mesh>
      </group>
      {summaryPage ? <Summary /> : null}
      {/* {temImage ? (
        <mesh position={[900, -800, 1]}>
          <TemperatureImage />
        </mesh>
      ) : null} */}
      <Scroll html>
        <RecoilBridge>
          {introPage ? <Intro /> : null}
          {globalTem ? <GlobalTemperature /> : null}
          {co2Page ? <Co2 /> : null}
          {iceAreaPage ? <IceArea /> : null}
          {/* <GlobalTemperature /> */}
        </RecoilBridge>
      </Scroll>
    </>
  );
}

export default Earth;
