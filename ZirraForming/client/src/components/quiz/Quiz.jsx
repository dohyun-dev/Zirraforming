import { motion } from "framer-motion";
import styled from "styled-components";
import { BasicButton } from "../../items/quizButton";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import correct from "../../assets/quiz/correct.gif";
import incorrect from "../../assets/quiz/incorrect.gif";
import axios from "axios";
import { DEG2RAD } from "three/src/math/MathUtils";
import { useRecoilValue } from "recoil";
import { useCookies } from "react-cookie";
import { MemberData } from "../../atoms";
import ProgressBar from "../common/progressBar";

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
	const [solution, setSolution] = useState([]);

	const memberData = useRecoilValue(MemberData);
	const [cookies] = useCookies(["accessToken"]);

	function plusScore() {
		setScore(score + 1);
	}

	function insertSolution(solutionData, question) {
		setSolution([
			...solution,
			{ quizId: index + 1, solutionData: solutionData, question: question },
		]);
	}

	function saveScore(score) {
		const config = {
			Headers: {
				Authorization: "Bearer " + cookies.accessToken,
			},
		};

		const data = {
			memberId: memberData.member.Id,
			score: score,
		};

		if (data.memberId) {
			axios
				.put("https://j7d107.p.ssafy.io/api/quiz", data, config)
				.then((response) => {
					console.log(response.data.message);
				})
				.catch((err) => {
					console.log(err.message);
				});
		}
	}

	return (
		<>
			{!isResult ? (
				<Wrapper>
					{/* <div
						style={{
							width: "80%",
							height: "20px",
							backgroundColor: "#3c9f58",
							margin: "7vh 0px 3vh 0px",
						}}
					></div> */}
					<ProgressBar
						bgcolor="#3c9f58"
						completed={((index + 1) / 10) * 100}
						left={index + 1}
					/>
					<h3 style={{ marginBottom: "20px", fontFamily: "Black Han Sans" }}>
						{index + 1}/10
					</h3>
					{/* <img
						src="/assets/styleQuiz/bar.png"
						style={{
							width: "70px",
							left: 40 * (index + 1),
							margin: "4vh 0 2vh 0 ",
							position: "absolute",
						}}
						alt=""
					/> */}
					<h2 style={{ marginBottom: "20px", padding: "0 35px 35px 35px" }}>
						{quizData[index].question}
					</h2>

					{quizData[index].option.map((option, idx) => {
						return (
							<BasicButton
								key={idx}
								style={{
									marginBottom: "3vh",
									fontSize: "20px",
									fontWeight: 600,
								}}
								onClick={() => {
									setIsResult(!isResult);
									setIndex(index + 1);
									if (idx === quizData[index].answer) {
										setIsCorrect(true);
										plusScore();
									} else {
										setIsCorrect(false);

										insertSolution(
											quizData[index].solution,
											quizData[index].question
										);
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
					{/* <div
						style={{
							width: "80%",
							height: "20px",
							backgroundColor: "#3c9f58",
							margin: "7vh 0px 3vh 0px",
						}}
					></div> */}
					<ProgressBar
						bgcolor="#3c9f58"
						completed={(index / 10) * 100}
						left={index}
					/>
					{/* <img
						src="/assets/styleQuiz/bar.png"
						style={{
							width: "70px",
							left: 40 * index,
							margin: "4vh 0 2vh 0 ",
							position: "absolute",
						}}
						alt=""
					/> */}
					<h3 style={{ marginBottom: "20px", fontFamily: "Black Han Sans" }}>
						{index}/10
					</h3>
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
								? { marginBottom: "3vh", fontSize: "20px", cursor: "default" }
								: {
										marginBottom: "3vh",
										fontSize: "20px",
										color: "yellow",
										cursor: "default",
								  }
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
						<h2
							style={{
								alignSelf: "center",
								marginBottom: "10px",
								fontFamily: "SBAggroB",
							}}
						>
							풀이
						</h2>
						{quizData[index - 1].solution.split("<br>").map((line, idx) => {
							return (
								<div key={idx}>
									{line} <br />
								</div>
							);
						})}
					</div>
					<div
						style={{
							width: "90px",
							backgroundColor: "#3c9f58",
							margin: "3vh 0px 3vh 0px",
							padding: " 10px 20px 10px 20px",
							display: "flex",
							justifyContent: "center",
							color: "white",
							cursor: "pointer",
						}}
						onClick={() => {
							setIsResult(!isResult);

							if (index === 10) {
								saveScore(score);
								navigate("./result", {
									state: {
										score: score,
										solution: solution,
									},
								});
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
