import React, { useEffect, useRef, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import {
  OrbitControls,
  Stars,
  PerspectiveCamera,
  OrthographicCamera,
  useScroll,
  Scroll,
} from "@react-three/drei";
import * as THREE from "three";

import EarthDayMap from "../../assets/textures/8k_earth_daymap.jpg";
import EarthNormalMap from "../../assets/textures/8k_earth_normal_map.jpg";
import EarthSpecularMap from "../../assets/textures/8k_earth_specular_map.jpg";
import EarthCloudsMap from "../../assets/textures/8k_earth_clouds.jpg";
import { TextureLoader } from "three";
import dat from "dat.gui";
import Intro from "../main/Intro";

const gui = new dat.GUI();

// 지구 컴포넌트
function Earth(props) {
  const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(
    TextureLoader,
    [EarthDayMap, EarthNormalMap, EarthSpecularMap, EarthCloudsMap]
  );

  const [isIntro, setIntro] = useState(true);

  const earth = useRef(); // 지구객체
  const pCamera = useRef(); // Perspective 카메라 객체
  const oCamera = useRef(); // Orthographic 카메라 객체

  const scroll = useScroll();

  useEffect(() => {
    console.log(earth.current.scale);
  }, [earth]);

  // 지구 GUI
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
      .min(-100)
      .max(100)
      .step(10)
      .name("직교카메라의 y위치");
    gui
      .add(oCamera.current.position, "z")
      .min(100)
      .max(200)
      .step(1)
      .name("직교카메라의 z위치");
  }, [oCamera]);
  useFrame(({ clock }) => {
    // 스크롤
    // console.log(scroll.scroll.current);
    // console.log(scroll);
    const f1 = scroll.range(0, 1 / 5);
    // console.log(f1);
    //// Intro Trigger

    // 지구 회전
    const elapsedTime = clock.getElapsedTime();
    earth.current.rotation.y = elapsedTime / 12;
    earth.current.position.y = -110 - window.innerHeight * 0.03;

    // 1번째 페이지 무빙
    oCamera.current.position.y = f1 * -100;
    earth.current.scale.set(70, 70, 70);
    // earth.current.scale.set([80 - f1, 80 - f1, 80 - f1]);
  });

  return (
    <>
      {/* 카메라 설정 */}
      {/* <PerspectiveCamera
        makeDefault
        ref={pCamera}
        position={props.position || [0, 1, 5]}
        aspect={window.innerWidth / window.innerHeight}
        fov={100}
        near={0.1}
        far={1000}
      /> */}
      <Scroll>
        <>
          <Stars radius={400} count={15000} factor={25} fade={true} speed={1} />
          <OrthographicCamera
            makeDefault
            ref={oCamera}
            zoom={5}
            left={-(window.innerWidth / window.innerHeight)}
            right={window.innerWidth / window.innerHeight}
            top={1}
            bottom={-1}
            near={1}
            far={1000}
            position={[0, 0, 100]}
          />

          {/* 컨트롤 설정 */}
          {/* <OrbitControls /> */}

          {/* 조명설정 */}
          <pointLight color="#f6f3ea" position={[0, 0, 0]} intensity={1} />

          {/* 오브젝트 */}
          <group
            ref={earth}
            position={[0, -100 - window.innerHeight * 0.03, 0]}
            scale={80}
          >
            <mesh>
              <sphereGeometry args={[1.005, 32, 32]} />
              <meshPhongMaterial
                map={cloudsMap}
                opacity={0.4}
                depthWrite={true}
                transparent={true}
                side={THREE.DoubleSide}
              />
            </mesh>
            <mesh>
              <sphereGeometry args={[1, 32, 32]} />
              <meshPhongMaterial specularMap={specularMap} />
              <meshStandardMaterial
                map={colorMap}
                normalMap={normalMap}
                metalness={0.4}
                roughness={0.7}
              />
            </mesh>
          </group>
        </>
      </Scroll>

      <Scroll html>{isIntro ? <Intro /> : null}</Scroll>
    </>
  );
}

export default Earth;
