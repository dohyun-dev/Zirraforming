import { motion } from "framer-motion";
import styled from "styled-components";
import { BasicButton } from "../../items/quizButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import correct from "../../assets/quiz/correct.gif";
import incorrect from "../../assets/quiz/incorrect.gif";

const Wrapper = styled(motion.div)`
	position: relative;
	top: 2vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: white;
	opacity: 1;
	border-radius: 5vh;
	width: 500px;
	height: 650px;
	h2 {
		font-size: 100;
		color: black;
	}
	h3 {
		color: black;
	}
	@media screen and (${(props) => props.theme.tablet}) {
		width: 70vw;
		height: 700px;
	}
	@media screen and (${(props) => props.theme.mobile}) {
		width: 300px;
		min-width: 300px;
		height: 500px;
	}
`;

function Quiz() {
	const navigate = useNavigate();
	const quizData = [
		{
			question: "이 중 실제로 지정되어 있는 환경 기념일이 아닌 것은?",
			option: [
				"3월 18일 재활용의 날",
				"4월 22일 지구의 날",
				"6월 5일 플라스틱 없는 날 ",
				"7월 3일 세계 일회용 비닐봉투 없는 날",
			],
			answer: 2,
			solution:
				"6월 5일은 환경의 날 입니다. 플라스틱 없는 날은 아직까지 존재하지 않습니다.",
		},
		{
			question: "이 중 재활용 쓰레기로 분리배출해야 하는 물건은?",
			option: ["빨대", "일회용포크", "칫솔", "부탄가스"],
			answer: 3,
			solution:
				"빨대-부피가 작은 플라스틱은 플라스틱으로 분리 배출해도 재활용 가치가 없기 때문에 분리수거 업체에 의해 선별되지 않고 일반쓰레기로 버려진다고 합니다.<br>비닐랩-PVC 소재로 재활용하기도 쉽지 않고, 처리 과정에서 유해 물질도 나오기 때문에 반드시 종량제봉투에 버려주세요.<br>칫솔-칫솔은 부피가 작고, 칫솔모, 고무 손잡이 등 다른 재질이 혼합되어 있어서 플라스틱으로 재활용이 불가능합니다. 모두 일반쓰레기로 버려주세요.<br>컵라면용기-다른 재질과 혼합되어 재활용이 어려우며, 미세척된 컵라면 용기는 음식물이 제거되지 않아 재활용이 어렵습니다.<br>부탄가스-캔으로 분리배출 해야합니다.",
		},
		{
			question: "의약품은 분리수거 대상이다?",
			option: ["O", "X"],
			answer: 0,
			solution:
				"일반 쓰레기로 버려진다면 처리되는 과정에서 토양이나 하천을 오염시킨다고 합니다. 특히, 버려진 약이 토양에 들어간다면 생태계 파괴를 일으키니 특별히 조심해야 합니다.<br>- 알약은 밀봉되는 봉투에 모아 배출<br>- 가루로 된 약은 포장지를 뜯지 말고 그대로 배출<br>- 물약, 시럽제 약물은 한 병에 모아 새지 않게 밀봉 후 배출<br>- 연고, 안약 등 통에 담긴 의약품은 겉 종이박스만 분리 후, 용기째 배출<br>이렇게 준비된 의약품을 주변 약국이나 동주민센터, 구청, 복지관 등 공공시설에 비치된 폐의약품 수거함에 넣어주면 됩니다.",
		},
		{
			question: "고추장, 간장, 쌈장 등 장류는 음식물 쓰레기다?",
			option: ["O", "X"],
			answer: 1,
			solution:
				"염분이 많은 장류는 음식물 쓰레기에 포함되지 않습니다. 비닐봉지에 담아 단단히 묶은 후 일반쓰레기로 버려주세요.",
		},
		{
			question: "영수증은 종이류로 분리배출해야한다?",
			option: ["O", "X"],
			answer: 1,
			solution:
				"영수증은 합성재로 코팅되어 있기 때문에 재활용이 불가합니다. 일반쓰레기로 버려주세요.",
		},
		{
			question: "치킨 뼈는 음식물쓰레기로 버린다?",
			option: ["O", "X"],
			answer: 1,
			solution:
				"음식물쓰레기의 분류는 동물이 먹을 수 있는지, 아닌지로 구분하면 좀 더 쉽게 접근할 수 있습니다. 따라서 치킨 뼈뿐만 아니라 각종 뼈나 가시 등은 전부 다 일반쓰레기로 간주하고 버리는 게 맞습니다.",
		},
		{
			question: "다 쓴 치약은 분리수거가 된다?",
			option: ["O", "X"],
			answer: 0,
			solution:
				"튜브 속 내용물을 깨끗이 씻어낸 후 뚜껑과 함께 플라스틱으로 배출해주세요.",
		},
		{
			question: "휴지보다 물티슈가 환경을 더 오염시킨다?",
			option: ["O", "X"],
			answer: 0,
			solution:
				"일반 휴지와 달리 물티슈는 플라스틱 소재로 토양, 해양 등에서 완전히 분해되기까지 200여 년이 소요됩니다. 또 제대로 분리배출 되지 않을 경우 광풍화 작용으로 미세플라스틱을 발생시켜 환경을 오염시킵니다.",
		},
		{
			question: "온실가스는 이산화탄소가 가장 큰 비중을 차지한다?",
			option: ["O", "X"],
			answer: 0,
			solution:
				"환경부 소속 온실가스종합정보센터에 따르면 2019년 기준 국내 6대 온실가스별 비중은 이산화탄소가 91.8%로 가장 높으며, 메탄 3.9%, 아산화질소 2%, 수소불화탄소 1%, 육불화황 0.8%, 과불화탄소 0.4% 등의 순으로 나타났다고 합니다.",
		},
		{
			question:
				"지구가 원래 1년에 재생할 수 있는 자연 자원은 한정적이다, 1년에 지구가 재생해서 만들어줄 수 있는 양을 ‘지구생태용량’이라고 하는데 인간은 1.7배의 지구를 소모하고 있다?",
			option: ["O", "X"],
			answer: 0,
			solution:
				"현재 인류의 자원 소비를 모두 감당하기 위해서는 약 1.7개의 지구가 필요하다고 합니다.",
		},
	];
	const [index, setIndex] = useState(0);
	const [score, setScore] = useState(0);
	const [isResult, setIsResult] = useState(false);
	const [isCorrect, setIsCorrect] = useState(false);

	function plusScore() {
		setScore(score + 1);
		console.log(score);
	}

	return (
		<>
			{!isResult ? (
				<Wrapper>
					<div
						style={{
							width: "80%",
							height: "20px",
							backgroundColor: "#3c9f58",
							margin: "7vh 0px 3vh 0px",
						}}
					></div>
					<h3 style={{ marginBottom: "20px" }}>{index + 1}/10</h3>
					<img
						src="/assets/styleQuiz/bar.png"
						style={{
							width: "70px",
							left: 50 * 1,
							margin: "4vh 0 2vh 0 ",
							position: "absolute",
						}}
						alt=""
					/>
					<h2 style={{ marginBottom: "20px", padding: "0 35px 0 35px" }}>
						{quizData[index].question}
					</h2>

					{quizData[index].option.map((option, idx) => {
						return (
							<BasicButton
								key={idx}
								style={{ marginBottom: "3vh", fontSize: "20px" }}
								onClick={() => {
									setIsResult(!isResult);
									setIndex(index + 1);
									if (idx === quizData[index].answer) {
										setIsCorrect(true);
										plusScore();
									} else {
										setIsCorrect(false);
									}
								}}
							>
								{option}
							</BasicButton>
						);
					})}
				</Wrapper>
			) : (
				<Wrapper>
					<div
						style={{
							width: "80%",
							height: "20px",
							backgroundColor: "#3c9f58",
							margin: "7vh 0px 3vh 0px",
						}}
					></div>
					<img
						src="/assets/styleQuiz/bar.png"
						style={{
							width: "70px",
							left: 50 * 1,
							margin: "4vh 0 2vh 0 ",
							position: "absolute",
						}}
						alt=""
					/>
					<h3 style={{ marginBottom: "20px" }}>{index}/10</h3>
					<img
						src={isCorrect ? correct : incorrect}
						style={{
							width: "70px",
						}}
						alt=""
					/>

					<h2 style={{ marginBottom: "20px", padding: "0 35px 0 35px" }}>
						{quizData[index - 1].question}
					</h2>

					<BasicButton
						style={
							isCorrect
								? { marginBottom: "3vh", fontSize: "20px" }
								: { marginBottom: "3vh", fontSize: "20px", color: "yellow" }
						}
					>
						{quizData[index - 1].option[quizData[index - 1].answer]}
					</BasicButton>

					<div
						style={{
							width: "80%",
							height: "200px",
							overflowY: "scroll",
							backgroundColor: "#D9D9D9",
							margin: "3vh 0px 3vh 0px",
							padding: " 10px 20px 10px 20px",
							display: "flex",
							flexDirection: "column",
							color: "black",
						}}
					>
						<h2 style={{ alignSelf: "center", marginBottom: "10px" }}>풀이</h2>
						{quizData[index - 1].solution}
					</div>
					<div
						style={{
							width: "70px",
							backgroundColor: "#3c9f58",
							margin: "3vh 0px 3vh 0px",
							padding: " 10px 20px 10px 20px",
							display: "flex",
							justifyContent: "center",
							color: "white",
						}}
						onClick={() => {
							setIsResult(!isResult);

							if (index === 10) {
								navigate("./result", { state: score });
							}
						}}
					>
						{index === 10 ? "결과" : "다음"}
					</div>
				</Wrapper>
			)}
		</>
	);
}

export default Quiz;
