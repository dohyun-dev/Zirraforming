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

const gui = new dat.GUI();

// 지구 컴포넌트
function Earth(props) {
  // const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(
  //   TextureLoader,
  //   [EarthDayMap, EarthNormalMap, EarthSpecularMap, EarthCloudsMap]
  // );

  const [colorMap, normalMap, specularMap, cloudsMap] = useTexture([
    EarthDayMap,
    EarthNormalMap,
    EarthSpecularMap,
    EarthCloudsMap,
  ]);
  // 애니메이션 조작
  const [firstAni, setFirstAni] = useState(true);
  const [secondAni, setSecondAni] = useState(false);

  // HTML 조작
  const [summaryPage, setSummaryPage] = useState(false);

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
    const f1 = scroll.range(0, 1 / 4);
    // console.log(f1);
    //// Intro Trigger
    // console.log(oCamera.current.position);

    // 지구 회전
    const elapsedTime = clock.getElapsedTime();
    earth.current.rotation.y = elapsedTime / 12;

    // 1번째 페이지 무빙
    if (scroll.scroll.current === 0) {
      setFirstAni(true);
      setSummaryPage(false);
      setSecondAni(false);
    }

    if (Math.floor(scroll.scroll.current * 10) === 2) {
      setSecondAni(true);
      setFirstAni(false);
      setSummaryPage(true);
    }

    // 애니메이션
    if (firstAni) {
      gsap
        .to(earth.current.position, {
          y: -700,
        })
        .duration(3);
      gsap
        .to(earth.current.scale, {
          x: 450,
          y: 450,
          z: 450,
        })
        .duration(3);
    }
    // 두번째 애니메이션
    if (secondAni) {
      gsap
        .to(earth.current.position, {
          y: 150,
        })
        .duration(2);

      gsap
        .to(earth.current.scale, {
          x: 300,
          y: 300,
          z: 300,
        })
        .duration(2);

      setSummaryPage(true);
    }
  });

  return (
    <>
      {/* 카메라 설정 */}
      <OrthographicCamera
        makeDefault
        ref={oCamera}
        zoom={1}
        left={-(window.innerWidth / window.innerHeight)}
        right={window.innerWidth / window.innerHeight}
        top={1}
        bottom={-1}
        near={0.01}
        far={1000}
        position={[0, 0, 10]}
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
      <Suspense fallback={<Spinner />}>
        <group ref={earth} position={[0, 0, -500]} scale={300}>
          <mesh>
            <sphereGeometry args={[1.005, 32, 16]} />
            <meshPhongMaterial
              map={cloudsMap}
              opacity={0.4}
              depthWrite={true}
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
      </Suspense>
      <Scroll html>
        <Intro />
      </Scroll>
    </>
  );
}

export default Earth;
