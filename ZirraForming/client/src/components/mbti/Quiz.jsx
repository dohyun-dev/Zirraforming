import { motion } from "framer-motion";
import styled from "styled-components";
import { BasicButton } from "../../items/styleButton";
import { useState } from "react";

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
	];
	const [index, setIndex] = useState(0);
	const [score, setScore] = useState([0, 0, 0, 0, 0, 0, 0, 0]);

	function plusScore(props) {
		setScore(score.map((x, y) => x + props[y]));
		console.log(score);
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
						setIndex(index + 1);
						plusScore(quizData[index].weight1);
					}}
				>
					{quizData[index].answer1}
				</BasicButton>
				<BasicButton
					style={{ fontSize: "20px" }}
					onClick={() => {
						setIndex(index + 1);
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
