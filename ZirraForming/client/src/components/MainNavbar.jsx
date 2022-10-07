import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Logo from "../assets/logo/jirav1.svg";
// import LogoPNG from "../assets/logo/jirav1.png";
import { motion } from "framer-motion";

import LoginModal from "./LoginModal";
import { useCookies } from "react-cookie";
import jwt from "jwt-decode";
import { useRecoilState } from "recoil";
import { MemberData, Token } from "../atoms";
import axios from "axios";

const Nav = styled.div`
  display: grid;
  padding: 10px 30px;
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: 80px;
  width: ${(props) => props.width || "calc(100vw-10px)"};
  height: 80px;
  color: ${(props) => props.theme.lightWhite};
  font-family: "Black Han Sans";

  .logo {
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
  }
  .link {
  }
  .login {
    grid-column: 3 / 5;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
  }
  .container {
    display: flex;
    font-family: "SBAggroB";

    min-width: 220px;
    box-shadow: 0 4px 5px 0 #00000026;
    position: relative;
    z-index: 10;
    text-align: center;
    .dropBox {
      height: 200px;

      box-shadow: 0 5px 18px -7px #3f3f3f;
      position: absolute;
      top: 50px;
      width: 180px;
      right: 0px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      transform: translate(0%, 0%);
      .drop_item {
        :hover {
          color: #3c9f58 !important;
          transition: all linear 0.1s;
        }
      }
    }
    p {
      transition: all linear 0.3s;
      /* transition-delay: 0.3s; */
      font-size: 18px;
      font-family: "GmarketSansMedium";
      span {
        color: #3c9f58;
      }
    }
  }
`;

function MainNavbar({ width, navigate }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);
  const [user, setUser] = useState("");
  const [member, setMember] = useRecoilState(MemberData);
  const [token, setToken] = useRecoilState(Token);
  const [dropdownVisibility, setDropdownVisibility] = useState(false);
  const [dropBox, setDropBox] = useState(false);
  const showModal = () => {
    setModalOpen(true);
  };

  const toggleDropDown = () => {
    setDropBox((val) => !val);
  };
  useEffect(() => {
    if (cookies.accessToken) {
      localStorage.setItem("accessToken", cookies.accessToken);
      const userInfo = jwt(cookies.accessToken);

      setUser(userInfo.nickname);
      const memberId = userInfo.sub;
      setMember({
        member: {
          Id: memberId,
        },
      });
      setToken(cookies.accessToken);
    }
  }, []);

  const subMenuAnimate = {
    enter: {
      opacity: 1,

      transition: {
        duration: 0.5,
        delay: 0.2,
      },
      display: "block",
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
        delay: 0.2,
      },
      transitionEnd: {
        display: "none",
      },
    },
  };

  return (
    <Nav width={width}>
      <div className="logo">
        <img src={Logo} alt="" />
      </div>
      {localStorage.getItem("accessToken") ? (
        <div className="login">
          <motion.div
            className="container"
            onHoverStart={toggleDropDown}
            onHoverEnd={toggleDropDown}
          >
            <p>
              <span>{user}</span> 님 안녕하세요
            </p>

            <motion.div
              className="content"
              initial="exit"
              animate={dropBox ? "enter" : "exit"}
              variants={subMenuAnimate}
            >
              <div className="dropBox">
                <p
                  className="drop_item"
                  onClick={() => navigate(`/mypage/${member.member.Id}`)}
                >
                  마이페이지
                </p>
                <p className="drop_item" onClick={() => navigate("/style")}>
                  환경스타일 검사
                </p>
                <p className="drop_item" onClick={() => navigate("/campaign")}>
                  별보러 갈래?
                </p>
                <p className="drop_item" onClick={() => navigate("/quiz")}>
                  환경상식퀴즈
                </p>
                <p className="drop_item" onClick={() => navigate("/news")}>
                  환경뉴스
                </p>
                <p
                  onClick={() => {
                    const config = {
                      Headers: {
                        Authorization: "Bearer " + cookies.accessToken,
                      },
                    };
                    axios
                      .post("https://j7d107.p.ssafy.io/api/logout", config, {
                        withCredentials: true,
                      })
                      .then((response) => {
                        localStorage.removeItem("accessToken");
                        removeCookie("accessToken");
                        alert("로그아웃 되었습니다.");
                      });
                  }}
                >
                  로그아웃
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      ) : (
        <div className="login" onClick={showModal}>
          LOGIN
        </div>
      )}

      {modalOpen && <LoginModal setModalOpen={setModalOpen} />}
    </Nav>
  );
}

export default MainNavbar;
