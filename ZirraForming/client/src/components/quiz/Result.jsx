import { motion } from "framer-motion";
import styled from "styled-components";
import { BasicButton } from "../../items/quizButton";
import { HomeButton } from "../../items/goHome";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import Share from "../common/Share";

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
	height: auto;
	margin-bottom: 20vh;

	h1 {
		color: black;
	}
	@media screen and (${(props) => props.theme.tablet}) {
		width: 60vw;
	}
	@media screen and (${(props) => props.theme.mobile}) {
		width: 300px;
		min-width: 300px;
	}
`;

const Note = styled(motion.div)`
	background-color: #d9d9d9;
	display: flex;
	flex-direction: column;

	width: 400px;
	height: 430px;
	border-radius: 10px;
	border: 0px;
	color: black;
	font-size: 25px;
	font-weight: 300;
	font-family: "Black Han Sans";
	margin: 3vh 0px 3vh 0px;
	padding: 10px 10px 10px 10px;
	overflow-y: scroll;
	cursor: pointer;

	@media screen and (${(props) => props.theme.tablet}) {
		width: 55vw;
		height: 27vh;
		font-size: 30px;
	}
	@media screen and (${(props) => props.theme.mobile}) {
		width: 45vw;
		height: 25vh;
		min-width: 260px;
		font-size: 18px;
	}
`;

function Result() {
	const navigate = useNavigate();
	const location = useLocation();
	return (
		<>
			<Wrapper>
				<div
					style={{
						width: "80%",
						height: "20px",
						backgroundColor: "#3c9f58",
						margin: "7vh 0px 3vh 0px",
					}}
				></div>
				<h1>나의 환경 점수는?</h1>
				<div
					style={{
						width: "80%",
						height: "120px",
						fontSize: "80px",
						display: "flex",
						justifyContent: "center",
						color: "black",
						margin: "7vh 0px 0px 0px",
					}}
				>
					<p style={{ color: "red" }}>{location.state.score}</p>/10
				</div>
				<div
					style={{
						width: "80%",
						height: "120px",
						backgroundColor: "#ffffff",
						margin: "3vh 0px 3vh 0px",
					}}
				>
					<Share state={location.state.score} />
				</div>

				<BasicButton
					onClick={() => {
						navigate("../quiz");
					}}
					style={{ marginBottom: "2vh" }}
				>
					테스트 다시하기
				</BasicButton>
				<BasicButton
					onClick={() => {
						navigate("../../style");
					}}
					style={{ backgroundColor: "#99D1A9" }}
				>
					나의 환경스타일 분석하기
				</BasicButton>
				<HomeButton
					style={{
						backgroundColor: "#9D9D9D",
						marginTop: "2vh",
					}}
				>
					<img
						src="/assets/homebanner.png"
						style={{ width: "100%", height: "100%" }}
						alt=""
					/>
					<HomeButton
						style={{
							backgroundColor: "#575757",
							height: "50px",
							justifyContent: "center",
							alignItems: "center",
							width: "width: 400px",
							color: "white",
						}}
					>
						지구의 이야기를 들으러 GO!
					</HomeButton>
				</HomeButton>
				<Note>
					<p style={{ alignSelf: "center" }}>오답노트</p>
					{location.state.solution.map((data, idx) => {
						return (
							<div key={idx} style={{ margin: "10px 0 10px 0" }}>
								<p style={{ color: "#3c9f58" }}>{data.quizId}번</p>
								<p style={{ fontSize: "18px" }}>
									{data.solution.split("<br>").map((line) => {
										return (
											<>
												{line} <br />
											</>
										);
									})}
								</p>
							</div>
						);
					})}
				</Note>
			</Wrapper>
		</>
	);
}

export default Result;
