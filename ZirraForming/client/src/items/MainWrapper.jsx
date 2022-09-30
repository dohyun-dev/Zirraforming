import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 10px;
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  transform: ${(props) => props.transform};
  display: flex;
  flex-direction: column;
  line-break: normal;
  font-family: "GmarketSansMedium";

  width: min(40vw, 800px);

  .title {
    font-size: min(50px, 3vw);
    align-self: center;
    margin-bottom: 50vh;
  }

  .content {
    margin-bottom: 50vh;
    font-size: 20px;
  }
  .graph {
    width: min(100%, 70vw);

    align-self: center;
  }
`;
