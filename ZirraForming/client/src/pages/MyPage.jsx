import styled from "styled-components";
import MyZira from "../components/mypage/MyZira";
import Profile from "../components/mypage/Profile";

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

  height: auto;
  background-color: #e8e8e8;

  .grid {
    display: grid;
    min-height: 1000px;

    grid-template-columns: 1fr;
    grid-template-rows: auto 2fr 2fr;
    grid-gap: 30px;
    div {
      background-color: #d8dee7;
      border-radius: 20px;
    }
  }
`;

function MyPage() {
  return (
    <>
      <NewNav />
      <CanvasWrap>
        <GridWrapper>
          <div className="grid">
            <Profile></Profile>
            <MyZira></MyZira>
            <div className="result"></div>
          </div>
        </GridWrapper>
      </CanvasWrap>
    </>
  );
}

export default MyPage;
