import styled from "styled-components";
import Intro from "../components/campaign/Intro";
import Navbar from "../components/Navbar";

const CanvasWrap = styled.div`
  width: 100%;

  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("/assets/bg/space.jfif");
  background-position: center center;
  background-size: cover;
  color: ${(props) => props.theme.lightWhite};
  font-family: "Black Han Sans";
  display: flex;
  justify-content: center;
  @media screen and (${(props) => props.theme.tablet}) {
    width: 98%;
  }
  @media screen and (${(props) => props.theme.mobile}) {
    width: 98%;
  }
`;
function Campaign() {
  return (
    <>
      <Navbar />
      <CanvasWrap>
        <Intro />
      </CanvasWrap>
    </>
  );
}
export default Campaign;
