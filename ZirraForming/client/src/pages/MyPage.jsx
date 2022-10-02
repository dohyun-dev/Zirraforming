import axios from "axios";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import Urls from "../apis/Urls";
import { member, Token, userInfo } from "../atoms";
import MyZira from "../components/mypage/MyZira";
import Profile from "../components/mypage/Profile";
import Result from "../components/mypage/Result";

import Navbar from "../components/Navbar";
// import { CanvasWrap } from "../items/CanvasWrpper";

const NewNav = styled(Navbar)`
  position: fixed;
  margin-bottom: 10px;
`;

const CanvasWrap = styled.div`
  width: 100%;
  /* height: 100vh; */

  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("/assets/bg/space.jfif");
  background-position: center center;
  background-size: cover;
  color: ${(props) => props.theme.lightWhite};
  font-family: "Black Han Sans";
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (${(props) => props.theme.tablet}) {
    width: 98%;
  }
  @media screen and (${(props) => props.theme.mobile}) {
    width: 98%;
  }
`;

const GridWrapper = styled.div`
  margin: 40px 0px;
  border-radius: 40px;
  padding: 30px;
  width: 80vw;
  min-width: 500px;
  max-width: 1200px;

  height: auto;
  background-color: #e8e8e8;

  .grid {
    display: grid;
    min-height: 1000px;

    grid-template-columns: 1fr;
    grid-template-rows: auto auto 1fr;
    grid-gap: 30px;
  }
`;

function MyPage() {
  const userToken = useRecoilValue(Token);
  // const memberId = useRecoilValue(userInfo);

  const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);
  const [memberInfo, setMemberInfo] = useRecoilState(member);
  const memberId = useParams();
  useEffect(() => {
    if (Token) {
      // const config = {
      //   Headers: {
      //     Authorization: "Bearer " + cookies.accessToken,
      //   },
      // };
      axios
        .get(Urls.userInfo(memberId.memberId))
        .then(({ data }) => {
          setMemberInfo(data);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <>
      <NewNav />
      <CanvasWrap>
        <GridWrapper>
          <div className="grid">
            <Profile memberId={memberId}></Profile>
            <MyZira memberId={memberId}></MyZira>
            <Result memberId={memberId}></Result>
          </div>
        </GridWrapper>
      </CanvasWrap>
    </>
  );
}

export default MyPage;
