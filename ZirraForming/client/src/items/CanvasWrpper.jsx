import styled from "styled-components";

export const CanvasWrap = styled.div`
  width: 100%;
  height: 100vh;

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
