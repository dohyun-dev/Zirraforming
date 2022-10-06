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
import gsap, { Power0, Power1 } from "gsap";
import Spinner from "../main/Spinner";
import GlobalTemperature from "../main/GlobalTemperature";

import { co2Images, MainData } from "../../atoms";
import {
  useRecoilBridgeAcrossReactRoots_UNSTABLE,
  useRecoilValue,
} from "recoil";
import TemperatureImage from "./TemperatureImage";
import Co2 from "../main/Co2";
import { CustomEase, SlowMo } from "gsap/all";
import IceArea from "../main/IceArea";
import IceSheet from "../main/IceSheet";
import Banner from "../main/Banner";

// const gui = new dat.GUI();
// 지구 컴포넌트
function Earth(
  {
    setCo2Image,
    setTemImage,
    setIceAreaImage,
    setSummaryPage,
    navigate,
    setFirst,
    setSecond,
    setThird,
    setForth,
    setnFirst,
    setnSecond,
    setLast,
    setLastName,
    setBanner,
    setStart,
  },
  props
) {
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
  const [sixthAni, setsixthAni] = useState(false);
  const [sevenAni, setSevenAni] = useState(false);
  const [eightAni, setEightAni] = useState(false);

  // HTML 조작
  const [introPage, setIntroPage] = useState(false);

  const [globalTem, setGlobalTem] = useState(false);
  const [co2Page, setCo2Page] = useState(false);
  const [iceAreaPage, setIceAreaPage] = useState(false);

  const test = useRef();
  const test2 = useRef();
  const cloud = useRef();
  const earth = useRef(); // 지구객체
  const pCamera = useRef(); // Perspective 카메라 객체
  const oCamera = useRef(); // Orthographic 카메라 객체
  const stars = useRef();

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
      setTemImage(false);
      setSummaryPage(false);
      setCo2Image(false);
      setCo2Page(false);
      setIceAreaPage(false);
      setIceAreaImage(false);
      setSummaryPage(false);
      setFirst(false);
      setSecond(false);

      setFirstAni(true);
      setSecondAni(false);
      setThirdAni(false);
      setForthAni(false);
      setFifthAni(false);
      setsixthAni(false);
      setSevenAni(false);
      setIceAreaImage(false);
      setRotate(false);
      setLast(false);
      setLastName(false);
      setBanner(false);
      setEightAni(false);
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
      setFirstAni(false);
      setsixthAni(false);
      setnFirst(false);
      setnSecond(false);
    }

    if (Math.floor(scroll.scroll.current * 100) === 13) {
      setGlobalTem(true);
      setTemImage(false);
      setIceAreaPage(false);
      setSummaryPage(false);

      setCo2Page(false);
      setCo2Image(false);

      setSummaryPage(false);

      setFirstAni(false);
      setSecondAni(false);

      setForthAni(false);
      setsixthAni(false);

      setRotate(false);
      setnFirst(false);
      setnSecond(false);
    }

    if (
      (Math.floor(scroll.scroll.current * 100) >= 13) &
      (Math.floor(scroll.scroll.current * 100) <= 28)
    ) {
      setTemImage(true);
      setCo2Image(false);
      setCo2Page(false);
      setSummaryPage(false);

      setThirdAni(true);
      setForthAni(false);
      setsixthAni(false);
      setnFirst(false);
      setnSecond(false);
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
      setSummaryPage(false);

      setIceAreaImage(false);

      setFirstAni(false);
      setSecondAni(false);

      setThirdAni(false);
      setForthAni(true);
      setFifthAni(false);
      setsixthAni(false);
      setFirst(false);
      setRotate(false);
      setnFirst(false);
      setnSecond(false);
    }

    if (Math.floor(scroll.scroll.current * 100) >= 50) {
      setTemImage(false);
      setSummaryPage(false);
      setCo2Image(false);
      setCo2Page(false);
      setIceAreaPage(true);
      setIceAreaImage(true);
      setSummaryPage(false);

      setFirstAni(false);
      setSecondAni(false);
      setThirdAni(false);
      setForthAni(false);
      setFifthAni(true);
      setsixthAni(false);
      setRotate(false);
      setFirst(true);
      setStart(true);
      setSecond(false);
      setnFirst(false);
      setnSecond(false);
      if (Math.floor(scroll.scroll.current * 100) >= 55) {
        setFirst(false);
        setSecond(true);
        setThird(false);
        setForth(false);
      }
      if (Math.floor(scroll.scroll.current * 100) >= 60) {
        setFirst(false);
        setSecond(false);
        setThird(true);
        setForth(false);
      }
      if (Math.floor(scroll.scroll.current * 100) >= 65) {
        setFirst(false);
        setSecond(false);
        setThird(false);
        setForth(true);
        setnFirst(false);
        setnSecond(false);
      }
    }
    if (Math.floor(scroll.scroll.current * 100) >= 70) {
      setForth(false);
      setTemImage(false);
      setSummaryPage(false);
      setCo2Image(false);
      setCo2Page(false);
      setIceAreaPage(true);
      setIceAreaImage(true);
      setSummaryPage(false);

      setFirstAni(false);
      setSecondAni(false);
      setThirdAni(false);
      setForthAni(false);
      setFifthAni(false);
      setsixthAni(true);
      setIceAreaImage(false);
      setSevenAni(false);
      setRotate(false);
      setStart(false);
      setnFirst(true);
    }
    if (Math.floor(scroll.scroll.current * 100) >= 85) {
      setTemImage(false);
      setSummaryPage(false);
      setCo2Image(false);
      setCo2Page(false);
      setIceAreaPage(false);
      setIceAreaImage(false);
      setSummaryPage(false);

      setFirstAni(false);
      setSecondAni(false);
      setThirdAni(false);
      setForthAni(false);
      setFifthAni(false);
      setsixthAni(false);
      setSevenAni(true);
      setIceAreaImage(false);
      setRotate(false);
      setLast(true);
      setLastName(false);
      if (Math.floor(scroll.scroll.current * 100) >= 88) {
        setLastName(true);
        setBanner(false);
        setEightAni(false);
      }
    }

    if (Math.floor(scroll.scroll.current * 100) >= 98) {
      setTemImage(false);
      setSummaryPage(false);
      setCo2Image(false);
      setCo2Page(false);
      setIceAreaPage(false);
      setIceAreaImage(false);
      setSummaryPage(false);

      setFirstAni(false);
      setSecondAni(false);
      setThirdAni(false);
      setForthAni(false);
      setFifthAni(false);
      setsixthAni(false);
      setSevenAni(false);
      setIceAreaImage(false);
      setRotate(false);
      setLast(false);
      setLastName(false);
      setBanner(true);
      setEightAni(true);
    }

    // console.log(scroll.scroll.current); //81 83
    if (firstAni) {
      // 애니메이션
      gsap.to(earth.current.scale, {
        x: 1,
        y: 1,
        z: 1,
        ease: Power0,
        duration: 5,
      });
      gsap
        .to(pCamera.current.rotation, {
          x: 0.2,
          y: 0,
          z: 0,
          ease: Power0,
        })
        .duration(2);
      gsap.to(pCamera.current.position, {
        x: 0,
        y: 1,
        z: 3,
        duration: 3,
        ease: Power0,
      });
    }
    // 두번째 애니메이션
    if (secondAni) {
      gsap.to(earth.current.position, {
        y: 0,
        x: 0,
        z: 0,
        duration: 2,
        ease: Power0,
      });

      gsap.to(pCamera.current.rotation, {
        x: -1,
        y: 0,
        z: 0,
        duration: 3,
        ease: Power0,
      });
      gsap.to(earth.current.scale, {
        x: 1,
        y: 1,
        z: 1,
        ease: Power0,
        duration: 5,
      });
      gsap.to(pCamera.current.position, {
        x: 0,
        y: 3,
        z: 2.5,
        duration: 3,
        ease: Power0,
      });
    }
    // 세번째 에니메이션
    if (thridAni) {
      // console.log(stars.current);
      gsap.to(earth.current.position, {
        y: 0,
        x: 0,
        z: 0,
        duration: 2,
        ease: Power0,
      });

      gsap.to(pCamera.current.rotation, {
        x: -0.5,
        y: 0,
        z: 0,
        duration: 3,
        ease: Power0,
      });
      gsap.to(earth.current.scale, {
        x: 10,
        y: 10,
        z: 10,
        ease: Power0,
        duration: 5,
      });
      gsap.to(pCamera.current.position, {
        x: -20,
        y: 25,
        z: 20,
        duration: 5,
        ease: Power0,
      });

      gsap.to(earth.current.position, {
        x: 0,
        y: 0,
        z: 0,
        duration: 10,
      });
    }
    if (forthAni) {
      //71
      gsap.to(earth.current.scale, {
        x: 30,
        y: 30,
        z: 30,
        duration: 5,
        ease: Power0,
      });

      gsap.to(pCamera.current.rotation, {
        x: -0.35,
        y: 1,
        z: 0.12,
        duration: 5,
        ease: Power0,
      });
      gsap.to(pCamera.current.position, {
        x: 200,
        y: 100,
        z: 10,
        duration: 5,
        ease: Power0,
      });

      gsap.to(earth.current.position, {
        x: 0,
        y: 0,
        z: 0,
        duration: 5,
        ease: Power0,
      });
    }
    if (fifthAni) {
      gsap.to(earth.current.scale, {
        x: 50,
        y: 50,
        z: 50,
        duration: 5,
        ease: Power0,
      });
      gsap.to(pCamera.current.rotation, {
        x: -0.2,
        y: 1.56,
        z: 0,
        duration: 5,
        ease: Power0,
      });
      gsap.to(pCamera.current.position, {
        x: 100,
        y: 10,
        z: -20,
        duration: 7,
        ease: Power0,
      });

      gsap.to(earth.current.position, {
        x: 0,
        y: 0,
        z: 0,
        duration: 5,
        ease: Power0,
      });

      gsap.to(earth.current.rotation, {
        x: 0,
        y: 0,
        z: 0,
        duration: 5,
        ease: Power0,
      });
    }
    if (sixthAni) {
      // pCamera.current.lookAt(earth.current.position);

      gsap.to(earth.current.scale, {
        x: 20,
        y: 20,
        z: 20,
        duration: 5,
        ease: Power0,
      });
      gsap.to(pCamera.current.rotation, {
        x: 0,
        y: 0,
        z: 0,
        duration: 3,
        ease: Power0,
      });
      gsap.to(pCamera.current.position, {
        x: -20,
        y: 0,
        z: 60,
        duration: 7,
        ease: Power0,
      });

      gsap.to(earth.current.position, {
        x: 0,
        y: 0,
        z: 0,
        duration: 5,
        ease: Power0,
      });

      gsap.to(earth.current.rotation, {
        x: -1.6,
        y: 0,
        z: 0,
        duration: 5,
        ease: Power0,
      });
    }
    if (sevenAni) {
      gsap.to(earth.current.rotation, {
        x: 0,
        y: 0,
        z: 0,
        duration: 5,
        ease: Power0,
      });
      gsap.to(earth.current.position, {
        y: 0,
        x: 0,
        z: 0,
        duration: 2,
        ease: Power0,
      });

      gsap.to(pCamera.current.rotation, {
        x: -0.5,
        y: 0,
        z: 0,
        duration: 3,
        ease: Power0,
      });
      gsap.to(earth.current.scale, {
        x: 10,
        y: 10,
        z: 10,
        ease: Power0,
        duration: 5,
      });
      gsap.to(pCamera.current.position, {
        x: 0,
        y: 25,
        z: 50,
        duration: 3,
        ease: Power0,
      });
      // console.log(scroll.range(1, 1 / 20));
      // console.log(Math.floor(scroll.scroll.current * 100) - 81);
      // pCamera.current.position.z =
      //   -250 - (Math.floor(scroll.scroll.current * 100) - 81) * 10;
      // gsap.to(pCamera.current.position, {
      //   x: 13,
      //   y: 10,
      //   z: -100,
      //   duration: 5,
      //   ease: Power0,
      // });
    }
    if (eightAni) {
      gsap.to(earth.current.rotation, {
        x: 0,
        y: 0,
        z: 0,
        duration: 5,
        ease: Power0,
      });
      gsap.to(earth.current.position, {
        y: 0,
        x: 0,
        z: 0,
        duration: 2,
        ease: Power0,
      });

      gsap.to(pCamera.current.rotation, {
        x: -0.5,
        y: 0,
        z: 0,
        duration: 3,
        ease: Power0,
      });
      gsap.to(earth.current.scale, {
        x: 10,
        y: 10,
        z: 10,
        ease: Power0,
        duration: 5,
      });
      gsap.to(pCamera.current.position, {
        x: 0,
        y: 25,
        z: 50,
        duration: 3,
        ease: Power0,
      });
      // console.log(scroll.range(1, 1 / 20));
      // console.log(Math.floor(scroll.scroll.current * 100) - 81);
      // pCamera.current.position.z =
      //   -250 - (Math.floor(scroll.scroll.current * 100) - 81) * 10;
      // gsap.to(pCamera.current.position, {
      //   x: 13,
      //   y: 10,
      //   z: -100,
      //   duration: 5,
      //   ease: Power0,
      // });
    }
  });

  return (
    <>
      {/* 카메라 설정 */}

      <PerspectiveCamera
        makeDefault
        ref={pCamera}
        position={[0, 0, 30]}
        fov={50}
      />
      {/* <OrbitControls enableZoom={true} /> */}

      {/* 컨트롤 설정 */}

      {/* 조명설정 */}

      <ambientLight
        intensity={
          firstAni || secondAni
            ? 1
            : fifthAni || sixthAni || sevenAni || eightAni
            ? 1
            : 3
        }
        color={firstAni || secondAni ? "white" : "gray"}
      />
      <pointLight color="#f6f3ea" position={[0, 0, 0]} intensity={1} />

      {/* 오브젝트 */}
      <Stars
        ref={stars}
        radius={40}
        count={2500}
        factor={firstAni || secondAni ? 5 : 8}
        fade={true}
        speed={2}
        saturation={50}
      />
      <group ref={earth} position={[0, 0, 0]}>
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

      <Scroll html>
        <RecoilBridge>
          {introPage ? <Intro navigate={navigate} /> : null}
          {globalTem ? <GlobalTemperature /> : null}
          <Co2 />
          <IceSheet />
        </RecoilBridge>
      </Scroll>
    </>
  );
}

export default Earth;
