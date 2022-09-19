import { motion } from "framer-motion";
import styled from "styled-components";
import { BasicButton } from "../../items/styleButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Wrapper = styled(motion.div)`
	position: relative;
	top: 15vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: white;
	opacity: 1;
	border-radius: 5vh;
	width: 32vw;
	height: 75vh;

	h2 {
		font-size: 100;
		color: black;
	}
`;

function Quiz() {
	const navigate = useNavigate();
	const quizData = [
		{
			question: "커피를 마시기 위해 카페에 방문한 나는",
			questionImgPath: "/assets/styleQuiz/문제1.png",
			answer1: "가게에서 주는 일회용컵에 담아간다.",
			answer2: "“이럴줄 알고 준비했지!” 라며 <br/> 개인 텀블러에 담아간다.",
			weight1: [0, 1, 0, 1, 0, 0, 0, 0],
			weight2: [0, 0, 0, 0, 0, 1, 1, 0],
		},
		{
			question: "빙하가 녹아 북극곰이 보금자리를 잃은 뉴스 기사를 보면 나는",
			questionImgPath: "/assets/styleQuiz/문제2.png",
			answer1: "빙하가 왜 녹았는지 이유를 분석한다.",
			answer2: "“북극곰 맘 아파 ㅠㅠ” 하며 슬퍼한다.",
			weight1: [0, 0, 0, 1, 0, 1, 0, 0],
			weight2: [0, 1, 0, 0, 0, 0, 0, 1],
		},
		{
			question: "내용물을 다 뺀 후 택배박스를 버릴 때 나는",
			questionImgPath: "/assets/styleQuiz/문제3.png",
			answer1: "송장과 테이프를 다 뜯고, 박스를 접어서 버린다.",
			answer2: "매직으로 택배송장의 개인정보를 지우고 박스를 접어서 버린다.",
			weight1: [0, 0, 0, 1, 0, 1, 0, 0],
			weight2: [0, 1, 0, 0, 0, 0, 0, 1],
		},
		{
			question: "식재료 구입을 위해 장을 볼 때 나는",
			questionImgPath: "/assets/styleQuiz/문제4.png",
			answer1: "주 1-2회 장보는 날을 정한다.",
			answer2: "필요한게 생길 때마다 장을 보러간다.",
			weight1: [0, 0, 0, 1, 0, 1, 0, 0],
			weight2: [0, 1, 0, 0, 0, 0, 0, 1],
		},
		{
			question: "약속 장소에 향하기 위해서 나는 ",
			questionImgPath: "/assets/styleQuiz/문제5.png",
			answer1: "자가용을 타고 이동한다.",
			answer2: "자전거나 대중교통을 이용해서 이동한다.",
			weight1: [0, 0, 0, 1, 0, 1, 0, 0],
			weight2: [0, 1, 0, 0, 0, 0, 0, 1],
		},
		{
			question:
				"길거리에 종량제 봉투 없이 생활 쓰레기를 무단 투기하는 것을 목격한다면 나는",
			questionImgPath: "/assets/styleQuiz/문제6.png",
			answer1: "직접가서 여기에 버리면 안된다고 이야기한다.",
			answer2: "“개념이 없네”라며 혼자 속으로 흉을 본다.",
			weight1: [0, 0, 0, 1, 0, 1, 0, 0],
			weight2: [0, 1, 0, 0, 0, 0, 0, 1],
		},
		{
			question: "생수병, 음료병을 버릴 때 나는",
			questionImgPath: "/assets/styleQuiz/문제7.png",
			answer1: "일반쓰레기와 분리하여 분리수거를 한다.",
			answer2: "페트병의 라벨을 뜯고 병뚜껑을 분리하여 분리수거를 한다.",
			weight1: [0, 0, 0, 1, 0, 1, 0, 0],
			weight2: [0, 1, 0, 0, 0, 0, 0, 1],
		},
		{
			question: "환경을 지킬 수 있는 활동을 신청하려고 할 때 나는",
			questionImgPath: "/assets/styleQuiz/문제8.png",
			answer1: "직접 방문하여 활동할 수 있는 프로그램을 신청한다.",
			answer2: "기부 활동을 통해 실천할 수 있는 프로그램을 신청한다.",
			weight1: [0, 0, 0, 1, 0, 1, 0, 0],
			weight2: [0, 1, 0, 0, 0, 0, 0, 1],
		},
		{
			question: "평소에 제품을 구매할 때 나는",
			questionImgPath: "/assets/styleQuiz/문제9.png",
			answer1: "가격이 비싸도 친환경 마크가 있는 제품을 구매한다.",
			answer2: "자주 구매하는 제품으로 구매한다.",
			weight1: [0, 0, 0, 1, 0, 1, 0, 0],
			weight2: [0, 1, 0, 0, 0, 0, 0, 1],
		},
		{
			question: "제로웨이스트 친환경 상점을 나는",
			questionImgPath: "/assets/styleQuiz/문제10.png",
			answer1: "0-2개 알고 있다.",
			answer2: "3개 이상 알고 있다.",
			weight1: [0, 0, 0, 1, 0, 1, 0, 0],
			weight2: [0, 1, 0, 0, 0, 0, 0, 1],
		},
	];
	const [index, setIndex] = useState(0);
	const [score, setScore] = useState([0, 0, 0, 0, 0, 0, 0, 0]);

	function plusScore(props) {
		setIndex(index + 1);
		setScore(score.map((x, y) => x + props[y]));
		console.log(score);

		if (index === 9) {
			navigate("./result");
		}
	}

	return (
		<>
			<Wrapper>
				<div
					style={{
						width: "80%",
						height: "20px",
						backgroundColor: "#9ba3eb",
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
				<h2>{quizData[index].question}</h2>
				<img
					src={quizData[index].questionImgPath}
					style={{ width: "40%", margin: "3vh 0 2vh 0 " }}
					alt=""
				/>
				<BasicButton
					style={{ marginBottom: "3vh", fontSize: "20px" }}
					onClick={() => {
						plusScore(quizData[index].weight1);
					}}
				>
					{quizData[index].answer1}
				</BasicButton>
				<BasicButton
					style={{ fontSize: "20px" }}
					onClick={() => {
						plusScore(quizData[index].weight2);
					}}
				>
					{quizData[index].answer2}
				</BasicButton>
			</Wrapper>
		</>
	);
}

export default Quiz;
