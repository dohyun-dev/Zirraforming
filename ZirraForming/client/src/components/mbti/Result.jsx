import { motion } from "framer-motion";
import styled from "styled-components";
import { BasicButton } from "../../items/styleButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HomeButton } from "../../items/goHome";
import StyleShare from "../common/StyleShare";

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

	h2 {
		font-size: 100;
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
					style={{
						backgroundColor: "#DBDFFD",
						height: "200px",
						margin: "30px 0 30px 0",
					}}
				>
					<p style={{ fontSize: "14px" }}>
						이 캐릭터는 ~~~~ 캐릭터는 이제 환경을 지키고 <br />
						이 캐릭터는 ~~~~ 캐릭터는 이제 환경을 지키고 <br />
						이 캐릭터는 ~~~~ 캐릭터는 이제 환경을 지키고 <br />이 캐릭터는 ~~~~
						캐릭터는 이제 환경을 지키고
					</p>
				</BasicButton>
				<div
					style={{
						width: "80%",
						height: "120px",
						backgroundColor: "#ffffff",
						margin: "3vh 0px 3vh 0px",
					}}
				>
					<StyleShare />
				</div>

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
				<HomeButton
					style={{
						backgroundColor: "#9D9D9D",
						marginTop: "2vh",
					}}
				>
					<img src="/assets/homebanner.png" style={{ width: "100%" }} alt="" />
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
				<HomeButton
					style={{
						backgroundColor: "#FBEBDC",
						margin: "2vh 0 5vh 0",
					}}
				>
					<HomeButton
						style={{
							backgroundColor: "#FFC792",
							height: "50px",
							justifyContent: "center",
							alignItems: "center",
							width: "width: 400px",
							color: "white",
						}}
					>
						나와 어울리는 환경 캠페인 참여하기
					</HomeButton>
				</HomeButton>
			</Wrapper>
		</>
	);
}

export default Result;
