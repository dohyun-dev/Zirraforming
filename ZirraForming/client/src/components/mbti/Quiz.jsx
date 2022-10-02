import { motion } from "framer-motion";
import styled from "styled-components";
import { BasicButton } from "../../items/styleButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
	const [score, setScore] = useState([0, 0, 0, 0, 0, 0, 0, 0]);

	function plusScore(props) {
		setIndex(index + 1);
		setScore(score.map((x, y) => x + props[y]));
		console.log(score);

		if (index === 9) {
			const maxValue = score.findIndex((ele) => ele === Math.max(...score)) + 1;
			console.log(maxValue);

			navigate("./result", { state: maxValue });
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
						left: 40 * (index + 1),
						margin: "4vh 0 2vh 0 ",
						position: "absolute",
					}}
					alt=""
				/>
				<h2
					style={{
						justifyContent: "center",
						alignItems: "center",
						display: "flex",
						flexDirection: "column",
					}}
				>
					{quizData[index].question.split("<br>").map((line, idx) => {
						return (
							<div key={idx}>
								{line} <br />
							</div>
						);
					})}
				</h2>
				<img
					src={quizData[index].imgUrl}
					style={{ width: "40%", margin: "3vh 0 2vh 0 " }}
					alt=""
				/>
				<BasicButton
					style={{
						marginBottom: "3vh",
						fontSize: "20px",
						display: "flex",
						flexDirection: "column",
					}}
					onClick={() => {
						plusScore(quizData[index].weight1);
					}}
				>
					{quizData[index].answer1.split("<br>").map((line, idx) => {
						return (
							<div key={idx}>
								{line} <br />
							</div>
						);
					})}
				</BasicButton>
				<BasicButton
					style={{ fontSize: "20px", display: "flex", flexDirection: "column" }}
					onClick={() => {
						plusScore(quizData[index].weight2);
					}}
				>
					{quizData[index].answer2.split("<br>").map((line, idx) => {
						return (
							<div key={idx}>
								{line} <br />
							</div>
						);
					})}
				</BasicButton>
			</Wrapper>
		</>
	);
}

export default Quiz;
