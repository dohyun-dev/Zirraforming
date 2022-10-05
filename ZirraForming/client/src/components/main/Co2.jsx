import { useRecoilValue } from "recoil";
import { co2, globalTemperature } from "../../atoms";
import { Wrapper } from "../../items/MainWrapper";
import OneLine from "../charts/OneLine";

function Co2() {
  const co2Datas = useRecoilValue(co2);
  const yearType = co2Datas.year.map((data) => {
    const temp = data.split("-");
    const newDate = temp[0] + "-" + temp[1] + "-" + 1;
    return newDate;
  });

  return (
    <Wrapper top={"900vh"} left={"11vw"}>
      <div className="title">늘어나는 탄소 배출량</div>
      <div className="content">
        이산화탄소는 화석연료(석탄, 석유, 천연 가스 등)의 추출 및 연소, 산불 및
        화산 폭발과 같은 자연현상에도 발생하는 온실 가스 입니다. 이러한 자연적인
        변화를 제가한 상태에서 측정한 대기 중 이산화 탄소 농도는 꾸준히 상승하고
        있습니다.
        <br />
        옆의 애니메이션은 전 세계 이산화 탄소의 변화량을 보여줍니다. 2002년
        365ppm에서 현재 400ppm 이상으로 증가함에 따라 지도 색상이 붉게 변화는
        것을 확인 할 수 있습니다
      </div>
      <div className="content">
        CO2 배출의 70%이상을 차지하고 있는 에너지 관련 CO2배출량은 앞으로도
        50%이상 증가할 것으로 예상되며 파괴적인 기후변화를 일으킬 것으로 예상
        됩니다.
        <br />
        2050년 온실가스의 대기 중 농도가 685ppm에 달할 수 있다고 경고하고
        있습니다. 온실가스가 증가함에 따라 기후변화를 일으키며, 생물의 다양성
        감소, 열대림, 육상생물의 감소는 10%가까이 줄것으로 예상됩니다.
      </div>
      <div className="graph">
        <OneLine
          title={"Data source: Atmospheric Infrared Sounder (AIRS)."}
          xline={yearType}
          yline={co2Datas?.co2}
          name={"CO2"}
          format={"ppm"}
          color={"#E84118"}
        />
      </div>
    </Wrapper>
  );
}

export default Co2;
