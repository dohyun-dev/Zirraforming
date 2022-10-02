import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Logo from "../assets/logo/jirav1.svg";
// import LogoPNG from "../assets/logo/jirav1.png";

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

  .login {
    grid-column: 3 / 5;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
  }
`;

function Navbar({ width, navigate }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);
  const [user, setUser] = useState("");
  const [member, setMember] = useRecoilState(MemberData);
  const [token, setToken] = useRecoilState(Token);
  const showModal = () => {
    setModalOpen(true);
  };

  useEffect(() => {
    if (cookies.accessToken) {
      localStorage.setItem("accessToken", cookies.accessToken);
      const userInfo = jwt(cookies.accessToken);
      console.log(userInfo.nickname);
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

  return (
    <Nav width={width}>
      <div className="logo">
        <Link to={"/"}>
          <img src={Logo} alt="" />
        </Link>
      </div>
      {localStorage.getItem("accessToken") ? (
        <div
          className="login"
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
          <p style={{ fontSize: 16, color: "#3c9f58" }}>{user} </p>
          <p style={{ fontSize: 13 }}> 님 안녕하세요</p>
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

export default Navbar;
