import { motion } from "framer-motion";
import styled from "styled-components";
import { BasicButton } from "../../items/styleButton";
import { useState, useEffect } from "react";
import Quiz from "./Quiz";
import axios from "axios";
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
	height: 700px;

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
	const [quizData, setQuizData] = useState([]);

	useEffect(() => {
		axios.get("https://j7d107.p.ssafy.io/api/survey").then((response) => {
			setQuizData(response.data);
			console.log(response.data);
		});
	}, []);
	return (
		<>
			{start ? (
				<Wrapper>
					<div
						style={{
							width: "80%",
							height: "20px",
							backgroundColor: "#9ba3eb",
							margin: "7vh 0px 3vh 0px",
						}}
					></div>
					<h2>캐릭터로 알아보는 </h2>
					<h2>나의 환경 스타일은?</h2>
					<img
						src="/assets/styleQuiz/문제0.png"
						style={{ width: "60%", margin: "3vh 0 2vh 0 " }}
						alt=""
					/>
					<BasicButton
						onClick={() => {
							setStart(!start);
						}}
						style={{ fontFamily: "SBAggroB" }}
					>
						START
					</BasicButton>
				</Wrapper>
			) : (
				<Quiz quizData={quizData} />
			)}
		</>
	);
}

export default Intro;
