import { motion } from "framer-motion";
import styled from "styled-components";
import { BasicButton } from "../../items/quizButton";
import { useState } from "react";
import Quiz from "./Quiz";

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

function Intro() {
	const [start, setStart] = useState(true);
	return (
		<>
			{start ? (
				<Wrapper>
					<div
						style={{
							width: "80%",
							height: "20px",
							backgroundColor: "#3c9f58",
							margin: "7vh 0px 3vh 0px",
						}}
					></div>
					<h2>퀴즈로 알아보는 나의 환경 상식</h2>
					<h2>당신의 환경점수는?</h2>
					<img
						src="/assets/styleQuiz/문제0.png"
						style={{ width: "60%", margin: "3vh 0 2vh 0 " }}
						alt=""
					/>
					<BasicButton
						onClick={() => {
							setStart(!start);
						}}
					>
						START
					</BasicButton>
				</Wrapper>
			) : (
				<Quiz />
			)}
		</>
	);
}

export default Intro;
