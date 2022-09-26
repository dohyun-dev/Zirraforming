import styled from "styled-components";

export const Wrapper = styled.div`
  position: absolute;
  top: ${(props) => props.top || "500vh"};
  left: ${(props) => props.left || "75vw"};

  display: flex;
  flex-direction: column;
  line-break: normal;

  transform: translate(-50%, -50%);
  width: min(calc(50vw - 10px), 800px);

  .title {
    font-size: min(100px, 3vw);
    align-self: center;
    margin-bottom: 50vh;
  }

  .content {
    margin-bottom: 50vh;
    font-size: 20px;
  }
  .graph {
    width: 90%;

    align-self: center;
  }
`;
