import { Html } from "@react-three/drei";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { globalTemperature } from "../../atoms";
import { Wrapper } from "../../items/MainWrapper";
import OneLine from "../charts/OneLine";
import TwoLine from "../charts/TwoLine";

function GlobalTemperature() {
  const globalTemp = useRecoilValue(globalTemperature);
  return (
    <Wrapper top={"450vh"} left={"55vw"}>
      <div className="title">상승하는 지구 표면 온도</div>
      <div className="content">
        1951년부터 꾸준히 지구의 온도가 상승해 왔습니다.
        <br /> 에니메이션은 지구 표면 온도의 변화를 보여줍니다. 진한 파란색은
        평균보다 따뜻한 지역이고 빨간색으로 갈 수록 평균보다 따뜻한 지역입니다.
      </div>
      <div className="content">
        OECD 환경 전망에 따르면 합의된 국제 목표인 지구 표면온도 상승 2°C를 훨씬
        초과하여 세기 말 까지 6°C까지 오를 것으로 예상된다고 합니다. 지구 온도
        상승을 빠르게 막지 못한다면 강수량 추이가 변하고, 해수면 상승과 같은
        기상이변의 강도와 빈도가 더 심화될 것입니다.
      </div>
      <div className="graph">
        <TwoLine
          title={"세계 평균 기온 추세"}
          xline={globalTemp?.lowess}
          yline={globalTemp?.year}
          zline={globalTemp?.temperature}
          name={"Temperature"}
          color={"#FBC531"}
          format={"°C"}
        />
      </div>
    </Wrapper>
  );
}

export default GlobalTemperature;
