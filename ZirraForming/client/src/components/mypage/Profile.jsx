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
import qs from "qs";

const Wrapper = styled.div`
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
    font-size: 1.8vw;
  }
  .description {
    .error {
      display: inline-block;
      font-size: 10px;
      color: red;
    }
    color: black;
    font-size: 2.5vw;
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
    .imageWrap {
      display: flex;
      justify-content: center;
      align-items: center;
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
    const config = {
      Headers: {
        Authorization: "Bearer " + cookies.accessToken,
      },
    };

    axios
      .get(Urls.checkNick(e.target[0].value))
      .then(({ data }) => {
        setNickCol(data.result);
        return data;
      })
      .then((res) => {
        console.log(res);
        const config = {
          Headers: {
            Authorization: "Bearer " + cookies.accessToken,
          },
        };
        if (res.result) {
          axios({
            url: Urls.changeNick(memberId.memberId),
            method: "put",
            data: data,
          })
            .then((res) => {
              console.log(res);
              setEditMode(false);
            })
            .catch((err) => {
              console.log(err);
              setError(err.message);
            });
        } else {
          setError(res.message);
        }
      })
      .catch((err) => console.log(err));
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
  return (
    <Wrapper>
      <div className="profile">
        <img
          src={member.imagePath ? member.imagePath : user}
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
              <img
                id="edit"
                onClick={() => setEditMode(true)}
                src={edit}
                width={"20px"}
                alt=""
              />
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

        {member.characterName ? (
          <p>{member.characterName}</p>
        ) : (
          <Link to={"/mbti"}>
            <p className="italic">유형검사 하러가기</p>
          </Link>
        )}
        {member.score ? (
          <p>{member.score}</p>
        ) : (
          <Link to={"/mbit"}>
            <p className="italic">퀴즈풀러가기</p>
          </Link>
        )}
      </div>
      <div className="badge">
        {Images.map((img, idx) => {
          if (memberInfo.badges[idx]) {
            return (
              <div className="imageWrap">
                <img key={idx} src={img} width={"60%"} alt="" />
              </div>
            );
          } else {
            return (
              <div className="imageWrap">
                <img key={idx} src={lock} width={"60%"} alt="" />
              </div>
            );
          }
        })}
        {/* <img src={temp3} alt="" width={"70px"} /> */}
      </div>
    </Wrapper>
  );
}
// #e0e5e9

export default Profile;
