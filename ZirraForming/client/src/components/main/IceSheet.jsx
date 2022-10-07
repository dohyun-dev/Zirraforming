import { Html } from "@react-three/drei";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { iceSheet } from "../../atoms";
import { Wrapper } from "../../items/MainWrapper";
import OneLine from "../charts/OneLine";

function IceSheet() {
  const IceSheetData = useRecoilValue(iceSheet);
  const DataType = IceSheetData.mass.map((data) => {
    return Math.floor(data);
  });
  const yearType = IceSheetData.year.map((data) => {
    const temp = data.split("-");
    const newDate = temp[0] + "-" + temp[1] + "-" + 1;
    return newDate;
  });
  return (
    <Wrapper
      top={"1750vh"}
      left={"50vw"}
      transform="translate(-50%, 0%)"
      style={{
        width: "50vw",
        maxWidth: "800px",
      }}
    >
      <div className="title">사라지는 남극</div>
      <div className="content">
        북극 뿐만 아니라 남극의 빙상 질량도 급격히 줄어들고 있다. 저명 학술지
        "Nature"에 발표된 한 연구에서는 지난 25년간 빙하 전선에서 얼음이
        소실되면서 남극 해안선의 변화를 발표했습니다. 빙상의 가장 자리가 얼어서
        생긴 얼음의 질량보다 높은 기온으로 인해 녹아내린 빙하 질량이 더 많다는
        것을 확인했고, 1997년 이후 얼음 손실 추정치는 6조에서 12조 미터톤으로
        두배 늘었습니다.
      </div>

      <div className="graph">
        <OneLine
          title={"남극 빙상 데이터"}
          xline={yearType}
          yline={DataType}
          name={"질량"}
          format={"Gt"}
          color={"#9C88FF"}
        />
      </div>
    </Wrapper>
  );
}

export default IceSheet;
