import styled from "styled-components";
import GrassGraph from "../charts/GrassGraph";

const Wrapper = styled.div`
  padding: 10px;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1.5fr;
  color: black;
  font-size: 24px;
  .top {
    .graph {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px max(10px, 1.5vw);
      svg {
        width: 100%;
        text {
          font-size: 5;
        }
      }
    }
  }
  .bottom {
    width: 100%;
    padding: 10px;
  }
`;

function MyZira() {
  const mySVG = document.getElementsByTagName("svg")[0];
  console.log(mySVG);
  mySVG.setAttribute("viewBox", "0 0 590 100");
  return (
    <Wrapper>
      <div className="top">
        <div className="title">누적 지라포밍 : {"32회"}</div>
        <div className="graph">
          <GrassGraph />
        </div>
      </div>
      <div className="bottom">
        <div className="title">오늘의 지라포밍 : {"2회"}</div>
      </div>
    </Wrapper>
  );
}

export default MyZira;
