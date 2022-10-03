import { motion } from "framer-motion";
import { useEffect } from "react";
import { useRef } from "react";
import styled from "styled-components";
import img1 from "../../assets/banner/temp4.png";
import img2 from "../../assets/banner/temp5.png";
import img3 from "../../assets/banner/temp6.png";
import { BasicButton } from "../../items/Button";

const FixWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 95vw;
  min-width: 700px;
  max-width: 1600px;
  transform: translate(-50%, -50%);
  align-items: center;
`;
const Wrapper = styled(motion.div)`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const Card = styled(motion.div)`
  padding: 20px 0;
  margin: 0px 0px;
  border-radius: 10px;
  left: ${(props) => props.left};

  width: 20vw;
  min-width: 300px;
  max-width: 500px;
  max-height: 600px;
  min-height: 500px;

  background-color: rgba(0, 0, 0, 0);
  font-family: SBAggroB;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  box-shadow: 0 5px 18px -7px #3f3f3f;
  backdrop-filter: blur(2px);

  .description {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    gap: 10px;
    align-items: center;
    .title {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.5vw;
    }
    .des {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 0.5vw;
      text-align: center;
      line-height: 20px;
      word-spacing: 1px;
      word-break: keep-all;
      padding: 0px 50px;
    }
  }
`;

const WrapVar = {
  start: {
    opacity: 0,
    y: 10,
  },
  end: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      delayChildren: 0,
      staggerChildren: 1,
    },
  },
};

const childrenVar = {
  start: {
    opacity: 0,
    y: 10,
  },
  end: {
    opacity: 1,
    y: 0,
    // transition: {
    //   delayChildren: 0.3,
    //   staggerChildren: 0.3,
    //   duration: 1,
    // },
  },
};

function Banner() {
  const card = useRef();

  return (
    <>
      <FixWrapper>
        <Wrapper variants={WrapVar} initial="start" animate="end">
          <Card variants={childrenVar}>
            <img src={img1} width="100%" alt="" />
            <div className="description">
              <div className="title">별 보러 갈래</div>

              <div className="des">
                쓰레기를 잘 버리기만 해도 지구의 환경에 도움이 될 수 있다는 것을
                알고 계시나요? <br />
                시민 한 사람이 올바른 쓰레기 배출을 한다면 연간 88Kg의 탄소
                배출을 줄일 수 있고, 200만명이 실천한다면 연간 21만톤의
                온실가스를 축소할 수 있습니다. <br />
                별보러 갈래 캠페인에 참가하여 건강한 지구를 만들어보아요
              </div>

              <BasicButton>
                <p>하러가기</p>
              </BasicButton>
            </div>
          </Card>
          <Card variants={childrenVar}>
            <img src={img2} width="100%" alt="" />
            <div className="description">
              <div className="title">당신의 환경 스타일은?</div>

              <div className="des">
                당신의 환경 캐릭터는 누구일까요? <br /> 당신의 환경 캐릭터를
                분석하고 당신과 잘 어울리는 캠페인을 추천해 드립니다
              </div>

              <BasicButton>
                <p>하러가기</p>
              </BasicButton>
            </div>
          </Card>
          <Card variants={childrenVar}>
            <img src={img3} width="100%" alt="" />
            <div className="description">
              <div className="title">환경 상식 퀴즈</div>

              <div className="des">
                당신의 환경 점수는 몇점일까요!? <br />
                실생활에 도움이 되는 환경문제를 풀어봐요
              </div>

              <BasicButton>
                <p>하러가기</p>
              </BasicButton>
            </div>
          </Card>
        </Wrapper>
      </FixWrapper>
    </>
  );
}
export default Banner;
