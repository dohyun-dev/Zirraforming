import styled from "styled-components";
import temp from "../../assets/logo/jirav1.svg";
import welcome from "../../assets/badge/welcome.png";
import earth from "../../assets/badge/earth.svg";
import lock from "../../assets/badge/lock.svg";
import penguin from "../../assets/badge/penguin.svg";
import polarbak from "../../assets/badge/polarbak.png";
import save from "../../assets/badge/save.png";
import ten from "../../assets/badge/ten.png";

import edit from "../../assets/svgs/pencil.svg";
import { useState } from "react";
import { motion } from "framer-motion";

const Wrapper = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-rows: auto;
  grid-template-columns: 1fr 1fr 2fr;
  padding: 20px;
  grid-gap: 20px;
  font-family: "SBAggroB";
  .img {
    background-color: #e0e5e9 !important;
  }
  .description {
    color: black;
    font-size: 20px;
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .line {
      display: flex;
      justify-content: space-between;
    }

    #edit {
      :hover {
        animation: hoverAnimation infinite 1s;
      }
    }
  }
  .badge {
    width: 100%;
    height: 100%;
    background-color: #e0e5e9 !important;
    display: grid;
    grid-gap: 10px;
    padding: 10px 20px;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
    .cell {
      display: flex;
      height: 100%;
      justify-content: center;
      align-items: center;
      background-color: transparent !important;
      img {
        display: block;
      }
    }
    .cell:after {
      padding-bottom: 100%;
    }
  }

  @keyframes hoverAnimation {
    0% {
      scale: 1;
      transform: rotateY(0);
    }
    50% {
      scale: 1.5;
      transform: rotateY(30deg);
    }
    100% {
      scale: 1;
      transform: rotateY(360deg);
    }
  }
`;

const NickInput = styled(motion.input)`
  width: 100%;
  border-radius: 5px;
  line-height: 20px;
  font-size: 20px;
  font-family: "SBAggroB";
  display: flex;
  align-items: center;
  border: none;
  background-color: RGB(216, 222, 231);
  :focus {
    outline: none;
  }
`;

function Profile() {
  const [editMode, setEditMode] = useState(false);
  return (
    <Wrapper>
      <div className="img">
        <img src={temp} alt="" />
      </div>
      <div className="description">
        <div className="line">
          {editMode ? (
            <form action="">
              <NickInput type="text" />
            </form>
          ) : (
            <p>{"닉네임"}</p>
          )}
          <img
            id="edit"
            onClick={() => setEditMode(true)}
            src={edit}
            width={"20px"}
            alt=""
          />
        </div>
        <p>{"환경유형"}</p>
        <p>{"나의환경점수"}</p>
      </div>
      <div className="badge">
        <div className="cell">
          <img src={welcome} alt="" width={"80%"} />
        </div>
        <div className="cell">
          <img src={earth} alt="" width={"100%"} />
        </div>
        <div className="cell">
          <img src={ten} alt="" width={"100%"} />
        </div>
        <div className="cell">
          <img src={penguin} alt="" width={"100%"} />
        </div>
        <div className="cell">
          <img src={polarbak} alt="" width={"100%"} />
        </div>
        <div className="cell">
          <img src={save} alt="" width={"100%"} />
        </div>
        {/* <img src={temp3} alt="" width={"70px"} /> */}
      </div>
    </Wrapper>
  );
}
// #e0e5e9

export default Profile;
