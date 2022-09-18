import { motion } from "framer-motion";
import styled from "styled-components";
import { BasicButton } from "../../items/styleButton";
import { useState } from "react";
import Quiz from "./Quiz";

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
							backgroundColor: "#9ba3eb",
							margin: "7vh 0px 3vh 0px",
						}}
					></div>
					<h2>캐릭터로 알아보는 나의 환경 스타일은?</h2>
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
