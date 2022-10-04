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
      <div className="content">
        세계 인구의 최대 밀집 지역이라고 할 중국, 동남아시아, 인도 사람들의 삶은
        황허강, 양쯔강, 메콩강, 갠지스강, 인더스강이라는 다섯 개의 큰 강에
        절대적으로 의존하고 있다. 이 다섯 개의 강 모두의 발원지가
        힌두쿠시-히말라야 인접 지역이며, 여기에서의 빙하의 변화는 이 강들의
        흐름에 큰 영향을 미친다. 지금 급속히 진행되는 해빙으로 인하여 이
        나라들은 강물 유량의 극심한 불안정에 시달리고 있으며, 몇년 전 중국처럼
        대규모 댐이 붕괴할 뻔한 끔찍한 홍수도 나타나고 있고, 이 때문에 이 강들의
        조절을 놓고 여러 나라들 간의 갈등이 극심해지고 있다.
      </div>
      <div className="content">
        이런저런 이유로 살 곳을 잃고 떠돌게 될 전 지구적인 유랑민들의 숫자에
        대해 한 보고서는 2060년 12억명, 2100년에는 20억명에 달할 것으로 전망하고
        있다. 2100년에 지구 전체의 인구가 100억명 정도에 도달할 것으로 예측되는
        것을 감안한다면, 5명 중 1명이 기후 유랑민이 되는 그림이다.
      </div>
      <div className="graph">
        <TwoLine
          title={"세계 평균 기온 추세"}
          xline={globalTemp?.year}
          yline={globalTemp?.lowess}
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
