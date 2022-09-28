import { motion } from "framer-motion";
import styled from "styled-components";
import { BasicButton } from "../../items/styleButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import result from "../../assets/campaign/result.png";
import camera from "../../assets/campaign/camera.png";
import CampaignModal from "./CampaignModal";
import { useEffect } from "react";

const Wrapper = styled(motion.div)`
	position: relative;
	top: 2vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	border-color: white;
	border: 1px solid;
	opacity: 1;
	border-radius: 5vh;
	width: 90vw;
	height: 80vh;

	p {
		font-size: 3rem;
		color: #ffffff;
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

	.scene img {
		position: absolute;
		cursor: pointer;
	}
`;

function star() {
	let count = 50; // 별 수
	let scene = document.querySelector(".scene");
	let i = 0;
	while (i < count) {
		let star = document.createElement("img");
		let x = Math.floor(Math.random() * (window.innerWidth - 180));
		let y = Math.floor(Math.random() * (window.innerHeight - 180));
		let size = Math.random() * 70;
		let imgSelector = Math.floor(Math.random() * 10);

		// 이미지 선택
		if (imgSelector % 2 == 0) {
			star.src = "/assets/fullstar.png";
		} else {
			star.src = "/assets/star.png";
		}

		star.style.left = x + "px";
		star.style.top = y + "px";
		star.style.width = 1 + size + "px";
		star.style.height = 1 + size + "px";

		scene.appendChild(star);
		i++;
	}
}

function Intro() {
	const [start, setStart] = useState(true);
	const navigate = useNavigate();
	const [modalOpen, setModalOpen] = useState(false);

	const showModal = () => {
		setModalOpen(true);
	};

	useEffect(() => {
		star();
	}, []);

	return (
		<>
			<Wrapper>
				<div className="scene">
					<p style={{ display: "flex" }}>
						일일 등록 수{" "}
						<p style={{ color: "yellow", margin: "0px 20px 0px 20px" }}>83</p>{" "}
						건
					</p>
					<div
						style={{
							position: "fixed",
							width: "250px",
							height: "45vh",
							left: "100px",
							top: "100px",
							backgroundColor: "gray",
							borderRadius: "30px",
							opacity: 0.9,
							display: "flex",
							justifyContent: "center",
							zIndex: "10",
							paddingTop: "10px",
						}}
					>
						<p style={{ color: "black", fontSize: "1.4rem" }}>일일 등록 랭킹</p>
					</div>
					<img
						src={result}
						style={{
							position: "fixed",
							width: "10vw",
							right: "20px",
							bottom: "20px",
							zIndex: "10",
						}}
						onClick={() => {
							navigate("./result");
						}}
						alt=""
					/>
					<img
						src={camera}
						style={{
							position: "fixed",
							width: "5vw",
							right: "60px",
							top: "100px",
							zIndex: "10",
						}}
						onClick={showModal}
						alt=""
					/>
					{modalOpen && <CampaignModal setModalOpen={setModalOpen} />}
				</div>
			</Wrapper>
		</>
	);
}

export default Intro;
