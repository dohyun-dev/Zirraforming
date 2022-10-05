import styled from "styled-components";
import temp from "../../assets/logo/jirav1.svg";
import welcome from "../../assets/badge/welcome.png";
import earth from "../../assets/badge/earth.svg";
import lock from "../../assets/badge/lock.svg";
import polarbak from "../../assets/badge/polarbak.png";
import save from "../../assets/badge/save.png";
import mbit from "../../assets/badge/mbti.png";
import tenten from "../../assets/badge/tenten.png";
import user from "../../assets/badge/user.png";

import edit from "../../assets/svgs/pencil.svg";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRecoilState } from "recoil";
import { member } from "../../atoms";
import { Link } from "react-router-dom";
import axios from "axios";
import Urls from "../../apis/Urls";
import { useCookies } from "react-cookie";
import ReactTooltip from "react-tooltip";
import { childernVar } from "../../items/Animation";

const badgeTitle = [
  "환영합니다!",
  "십시일반",
  "환경박사",
  "별 수집가",
  "환경러버",
  "나의 환경스타일은?",
];
const badgeDes = [
  "처음으로 쓰레기 등록",
  "10일 연속 쓰레기 등록",
  "환경퀴즈 백점",
  "일일 랭킹 1위 도달",
  "일일 5회이상 쓰레기 등록",
  "환경 스타일 검사 완료",
];

const Wrapper = styled(motion.div)`
  display: grid;
  width: 100%;
  background-color: #d8dee7;
  border-radius: 20px;
  height: 100%;
  grid-template-rows: auto;
  grid-template-columns: 1fr 1fr 2fr;
  padding: 20px;
  grid-gap: 20px;
  font-family: "GmarketSansMedium";
  .img {
    background-color: #e0e5e9 !important;
  }
  .profile {
    display: flex;
    align-items: center;
  }
  .italic {
    font-style: italic;
    color: #353b48;
    font-size: min(1.8vw, 18px);
  }
  .description {
    .error {
      display: inline-block;
      font-size: 10px;
      color: red;
    }
    color: black;
    font-size: min(2vw, 22px);
    padding: 30px 0;
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
    align-items: center;
    .imageWrap {
      display: flex;
      justify-content: center;
      align-items: center;

      .hoverdImg {
        z-index: -2 !important;
      }

      /* img {
        z-index: 2;
      } */
      :hover .whenHover {
        visibility: visible;
      }
      .whenHover {
        z-index: -1;
        position: absolute;
        color: black;
        font-size: 10px;
        -webkit-transform: 1; //0.5 -> 50%
        opacity: 1 !important;
        visibility: hidden;
        transition: all 1 linear;
        word-break: keep-all;
        text-align: center;
        .hoverTitle {
          color: #43b262;
        }
        .hoverdes {
          color: black;
          -webkit-transform: scale(0.8); //0.5 -> 50%
        }
      }
    }
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
  /* line-height: 20px; */
  font-size: 20px;
  font-family: "GmarketSansMedium";
  display: flex;
  align-items: center;
  border: none;
  border-radius: 5px;
  height: 32px;
  display: flex;
  align-items: center;
  background-color: rgba(200, 204, 208, 0.867);
  :focus {
    outline: none;
  }
`;

const BadgeHover = {
  hovering: {
    scale: 1.2,
  },
};

const ImgHover = {
  hovering: {
    opacity: 0.3,
  },
};

function Profile({ memberId }) {
  const [editMode, setEditMode] = useState(false);
  const [memberInfo, setMemberInfo] = useRecoilState(member);
  const [nickCol, setNickCol] = useState(true);
  const [error, setError] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);

  const Images = [welcome, earth, polarbak, tenten, mbit, save];
  const handleSubmit = (e) => {
    e.preventDefault();
    const changeNick = e.target[0].value;
    const data = { nickname: changeNick };

    axios
      .get(Urls.checkNick(e.target[0].value))
      .then(({ data }) => {
        setNickCol(data.result);
        return data;
      })
      .then((res) => {
        const config = {
          Headers: {
            // Authorization: "Bearer " + cookies.accessToken,
            Authorization: "Bearer " + cookies.accessToken,
          },
        };
        if (res.result) {
          axios({
            url: Urls.changeNick(memberId.memberId),
            method: "put",
            data: data,
            config: config,
            withCredentials: true,
          })
            .then((res) => {
              setEditMode(false);
            })
            .catch((err) => {
              console.log(err);
              setError(err.response.data.message);
            });
        } else {
          setError("중복된 닉네임입니다");
        }
      })
      .catch((err) => setError(err.response.data.message));
  };
  const handleChange = (e) => {
    setMemberInfo((data) => {
      const newData = {
        ...data,
        nickName: e.target.value,
      };
      return newData;
    });
  };
  console.log(memberInfo);
  return (
    <Wrapper variants={childernVar}>
      <div className="profile">
        <img
          src={memberInfo.characterImgPath ? memberInfo.characterImgPath : user}
          width="100%"
          style={{ display: "block" }}
        />
      </div>
      <div className="description">
        {editMode ? (
          <>
            <div className="line">
              <form className="myForm" onSubmit={handleSubmit}>
                <NickInput
                  value={memberInfo.nickName}
                  onChange={handleChange}
                  type="text"
                />
              </form>
              <img id="edit" src={edit} width={"20px"} alt="" />
            </div>
            <p className="error">{error}</p>
          </>
        ) : (
          <div className="line">
            <p>{memberInfo.nickName}</p>
            <img
              id="edit"
              onClick={() => setEditMode(true)}
              src={edit}
              width={"20px"}
              alt=""
            />
          </div>
        )}

        {memberInfo.characterName ? (
          <p>{memberInfo.characterName}</p>
        ) : (
          <Link to={"/style"}>
            <p className="italic">유형검사 하러가기</p>
          </Link>
        )}
        {memberInfo.score != null ? (
          <p>{memberInfo.score} / 10 점</p>
        ) : (
          <Link to={"/quiz"}>
            <p className="italic">퀴즈풀러가기</p>
          </Link>
        )}
      </div>
      <div className="badge">
        {Images.map((img, idx) => {
          return (
            <div key={idx}>
              {memberInfo.badges[idx] ? (
                <motion.div
                  className="imageWrap"
                  style={{ position: "relative" }}
                  variants={BadgeHover}
                  whileHover="hovering"
                >
                  <motion.img
                    class="hoveredImg"
                    variants={ImgHover}
                    whileHover="hovering"
                    src={img}
                    width={"90%"}
                    alt=""
                  />
                  <div className="whenHover">
                    <p>{badgeTitle[idx]}</p>
                    <p className="hoverdes">{badgeDes[idx]}</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  style={{ position: "relative" }}
                  className="imageWrap"
                  variants={BadgeHover}
                  whileHover="hovering"
                >
                  <div className="whenHover">
                    <p>{badgeDes[idx]}</p>
                  </div>
                  <motion.img
                    class="hoveredImg"
                    variants={ImgHover}
                    whileHover="hovering"
                    src={lock}
                    width={"90%"}
                    alt=""
                  />
                </motion.div>
              )}
            </div>
          );
        })}
        {/* <img src={temp3} alt="" width={"70px"} /> */}
      </div>
    </Wrapper>
  );
}
// #e0e5e9

export default Profile;
