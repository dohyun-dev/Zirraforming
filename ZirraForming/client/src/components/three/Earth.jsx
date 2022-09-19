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
} from "@react-three/drei";
import * as THREE from "three";
import dat from "dat.gui";
import Summary from "../main/Summary";

import EarthDayMap from "../../assets/textures/8k_earth_daymap.jpg";
import EarthNormalMap from "../../assets/textures/8k_earth_normal_map.jpg";
import EarthSpecularMap from "../../assets/textures/8k_earth_specular_map.jpg";
import EarthCloudsMap from "../../assets/textures/8k_earth_clouds.jpg";

import Intro from "../main/Intro";
import gsap from "gsap";
import Spinner from "../main/Spinner";
import GlobalTemperature from "../main/GlobalTemperature";
import urls from "../../apis/urls";
import { MainData } from "../../atoms";

const gui = new dat.GUI();

// 지구 컴포넌트
function Earth(props) {
  // const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(
  //   TextureLoader,
  //   [EarthDayMap, EarthNormalMap, EarthSpecularMap, EarthCloudsMap]
  // );
  // Recoil Data 불러오기

  const [colorMap, normalMap, specularMap, cloudsMap] = useTexture([
    EarthDayMap,
    EarthNormalMap,
    EarthSpecularMap,
    EarthCloudsMap,
  ]);
  // 애니메이션 조작
  const [rotate, setRotate] = useState(true);
  const [firstAni, setFirstAni] = useState(true);
  const [secondAni, setSecondAni] = useState(false);
  const [thridAni, setThirdAni] = useState(false);

  // HTML 조작
  const [introPage, setIntroPage] = useState(false);
  const [summaryPage, setSummaryPage] = useState(false);
  const [globalTem, setGlobalTem] = useState(false);

  const cloud = useRef();
  const earth = useRef(); // 지구객체
  const pCamera = useRef(); // Perspective 카메라 객체
  const oCamera = useRef(); // Orthographic 카메라 객체

  const scroll = useScroll();

  // 지구 GUI Earth 파일명 변경확인
  useEffect(() => {
    gui
      .add(earth.current.position, "x")
      .min(-100)
      .max(100)
      .step(10)
      .name("지구의 x위치");
    gui
      .add(earth.current.position, "y")
      .min(-150)
      .max(150)
      .step(10)
      .name("지구의 y위치");
    gui
      .add(earth.current.position, "z")
      .min(-10)
      .max(10)
      .step(1)
      .name("지구의 z위치");

    gui
      .add(earth.current.scale, "x")
      .min(-10)
      .max(10)
      .step(1)
      .name("지구의 크기");
  }, [earth]);

  // Orthographic GUI
  useEffect(() => {
    gui
      .add(oCamera.current.position, "x")
      .min(-100)
      .max(100)
      .step(10)
      .name("직교카메라의 x위치");
    gui
      .add(oCamera.current.position, "y")
      .min(-300)
      .max(500)
      .step(10)
      .name("직교카메라의 y위치");
    gui
      .add(oCamera.current.position, "z")
      .min(100)
      .max(200)
      .step(1)
      .name("직교카메라의 z위치");
  }, [oCamera]);

  useFrame(({ clock }, delta) => {
    // 스크롤
    // console.log(scroll.scroll.current);
    // console.log(scroll);

    // console.log(f1);
    //// Intro Trigger
    // console.log(oCamera.current.position);

    // 지구 회전

    cloud.current.rotation.y -= delta / 50;

    if (rotate) {
      earth.current.rotation.y += delta / 8;
    }

    // 1번째 페이지 무빙
    if (scroll.scroll.current === 0) {
      setIntroPage(true);
      setSummaryPage(false);

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
          y: -700,
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
        .to(earth.current.scale, {
          x: Math.min(300, window.innerWidth - 550),
          y: Math.min(300, window.innerWidth - 550),
          z: Math.min(300, window.innerWidth - 550),
        })
        .duration(2);
      gsap.to(oCamera.current.position, {
        x: 0,
      });

      setSummaryPage(true);
    }

    if (thridAni) {
      gsap
        .to(earth.current.scale, {
          x: Math.min(300, window.innerWidth - 600),
          y: Math.min(300, window.innerWidth - 600),
          z: Math.min(300, window.innerWidth - 600),
        })
        .duration(2);
      gsap
        .to(earth.current.position, {
          x: -120,
          y: 30,
        })
        .duration(2);

      gsap.to(oCamera.current.position, {
        x: 80,
      });
    }
  });

  return (
    <>
      {/* 카메라 설정 */}
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

      {/* <PerspectiveCamera
            makeDefault
            ref={pCamera}
            position={props.position || [0, 1, 5]}
            aspect={window.innerWidth / window.innerHeight}
            fov={100}
            near={0.1}
            far={1000}
          /> */}

      {/* 컨트롤 설정 */}

      {/* <OrbitControls /> */}

      {/* 조명설정 */}
      <ambientLight intensity={1} color="white" />
      <pointLight color="#f6f3ea" position={[0, 0, 0]} intensity={1} />

      {/* 오브젝트 */}
      <group ref={earth} position={[0, 0, -500]}>
        <mesh ref={cloud}>
          <sphereGeometry args={[1.005, 32, 16]} />
          <meshPhongMaterial
            map={cloudsMap}
            opacity={0.4}
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

      <Scroll html>
        {introPage ? <Intro /> : null}
        {globalTem ? <GlobalTemperature /> : null}
        {/* <GlobalTemperature /> */}
      </Scroll>
    </>
  );
}

export default Earth;
