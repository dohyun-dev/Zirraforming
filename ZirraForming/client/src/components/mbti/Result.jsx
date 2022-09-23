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
	height: 200vh;
	margin-bottom: 20vh;

	h2 {
		font-size: 100;
		color: black;
	}
`;

function Result() {
	const navigate = useNavigate();

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
				<h2>당신은 환경을 위한 실천을 하는</h2>
				<h2>환경지킴이 주디 </h2>
				<img
					src="/assets/styleResult/주디.png"
					style={{ width: "40%", margin: "3vh 0 2vh 0 " }}
					alt=""
				/>
				<BasicButton
					onClick={() => {
						navigate("../style");
					}}
					style={{ marginBottom: "2vh" }}
				>
					테스트 다시하기
				</BasicButton>
				<BasicButton
					onClick={() => {
						navigate("../../quiz");
					}}
					style={{ backgroundColor: "#DBDFFD" }}
				>
					환경 상식 퀴즈 풀러가기
				</BasicButton>
				<BasicButton
					style={{
						height: "230px",

						backgroundColor: "#673f3f",
						marginTop: "2vh",
						backgroundImage: "/assets/homeBanner.png",
						backgroundPosition: "center center",
						backgroundSize: "cover",
					}}
				></BasicButton>
			</Wrapper>
		</>
	);
}

export default Result;
