import { motion } from "framer-motion";
import styled from "styled-components";
import { BasicButton } from "../../items/quizButton";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import correct from "../../assets/quiz/correct.gif";
import incorrect from "../../assets/quiz/incorrect.gif";
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
	height: 650px;
	h2 {
		font-size: 100;
		color: black;
		margin-top: 20px;
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

function Quiz(props) {
	const navigate = useNavigate();
	const quizData = props.quizData;

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
							left: 40 * (index + 1),
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
							left: 40 * index,
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
