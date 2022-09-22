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

// const gui = new dat.GUI();

// 지구 컴포넌트
function Earth(props) {
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

  // 애니메이션 조작
  const [Ortho, setOrtho] = useState(false);
  const [rotate, setRotate] = useState(true);
  const [firstAni, setFirstAni] = useState(true);
  const [secondAni, setSecondAni] = useState(false);
  const [thridAni, setThirdAni] = useState(false);

  // HTML 조작
  const [introPage, setIntroPage] = useState(false);
  const [summaryPage, setSummaryPage] = useState(false);
  const [globalTem, setGlobalTem] = useState(false);
  const [temImage, setTemImage] = useState(false);

  const test = useRef();
  const test2 = useRef();
  const cloud = useRef();
  const earth = useRef(); // 지구객체
  const pCamera = useRef(); // Perspective 카메라 객체
  const oCamera = useRef(); // Orthographic 카메라 객체

  const scroll = useScroll();

  // 지구 GUI Earth 파일명 변경확인
  // useEffect(() => {
  //   gui
  //     .add(earth.current.position, "x")
  //     .min(-100)
  //     .max(100)
  //     .step(10)
  //     .name("지구의 x위치");
  //   gui
  //     .add(earth.current.position, "y")
  //     .min(-150)
  //     .max(150)
  //     .step(10)
  //     .name("지구의 y위치");
  //   gui
  //     .add(earth.current.position, "z")
  //     .min(-10)
  //     .max(10)
  //     .step(1)
  //     .name("지구의 z위치");

  //   gui
  //     .add(earth.current.scale, "x")
  //     .min(-10)
  //     .max(10)
  //     .step(1)
  //     .name("지구의 크기");
  // }, [earth]);

  // // Orthographic GUI
  // useEffect(() => {
  //   gui
  //     .add(oCamera.current.position, "x")
  //     .min(-100)
  //     .max(100)
  //     .step(10)
  //     .name("직교카메라의 x위치");
  //   gui
  //     .add(oCamera.current.position, "y")
  //     .min(-300)
  //     .max(500)
  //     .step(10)
  //     .name("직교카메라의 y위치");
  //   gui
  //     .add(oCamera.current.position, "z")
  //     .min(100)
  //     .max(200)
  //     .step(1)
  //     .name("직교카메라의 z위치");
  // }, [oCamera]);

  useFrame(({ clock }, delta) => {
    cloud.current.rotation.y -= delta / 20;

    if (rotate) {
      earth.current.rotation.y += delta / 8;
    }

    // 1번째 페이지 무빙
    if (scroll.scroll.current === 0) {
      setIntroPage(true);
      setSummaryPage(false);

      setRotate(true);
      setFirstAni(true);
      setSecondAni(false);
    }

    if (Math.floor(scroll.scroll.current * 100) === 6) {
      setSummaryPage(true);
      setIntroPage(false);
      setGlobalTem(false);

      setFirstAni(false);
      setThirdAni(false);
      setSecondAni(true);
    }

    if (Math.floor(scroll.scroll.current * 100) === 12) {
      setGlobalTem(true);
      setTemImage(true);
      setSummaryPage(false);

      setFirstAni(false);
      setSecondAni(false);
      setThirdAni(true);
      setRotate(false);
    }

    // 애니메이션
    if (firstAni) {
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
      gsap.to(pCamera.current.rotation, {
        x: -1.55,
        y: 0.1,
        z: 1.48,
        duration: 3,
        ease: "sine",
      });
      // pCamera.current.lookAt(test.current.position);
      gsap
        .to(pCamera.current.position, {
          x: 1000,
          y: -40,
          z: 10,
        })
        .duration(3);
    }
  });

  return (
    <>
      {/* 카메라 설정 */}
      {Ortho ? (
        <OrthographicCamera
          makeDefault
          ref={oCamera}
          zoom={1}
          // left={-(window.innerWidth / window.innerHeight)}
          // right={window.innerWidth / window.innerHeight}
          // top={1}
          // bottom={-1}
          // near={0.01}
          // far={1000}
          position={[0, 0, 10]}
          // updateProjectionMatrix={true}
        />
      ) : (
        <>
          <PerspectiveCamera
            makeDefault
            ref={pCamera}
            position={props.position || [0, 0, 1000]}
            fov={50}
            near={1}
            far={10000}
          />
          {/* <OrbitControls enableZoom={false} /> */}
        </>
      )}

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
      {temImage ? (
        <mesh ref={test} position={[900, -800, 1]}>
          <TemperatureImage />
        </mesh>
      ) : null}
      <Scroll html>
        <RecoilBridge>
          {introPage ? <Intro /> : null}
          {globalTem ? <GlobalTemperature /> : null}
          {/* <GlobalTemperature /> */}
        </RecoilBridge>
      </Scroll>
    </>
  );
}

export default Earth;
