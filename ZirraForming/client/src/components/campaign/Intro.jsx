import { motion } from "framer-motion";
import styled from "styled-components";
import { BasicButton } from "../../items/styleButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import result from "../../assets/campaign/result.png";
import camera from "../../assets/campaign/camera.png";
import CampaignModal from "./CampaignModal";
import { useEffect } from "react";
import axios from "axios";

const Wrapper = styled(motion.div)`
	position: relative;
	top: 2vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	/* border-color: white; */
	/* border: 1px solid; */
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

function star(props) {
	let count = props.length; // 별 수
	let scene = document.querySelector(".scene");
	let i = 0;
	while (i < count) {
		let star = document.createElement("img");
		let x = Math.floor(Math.random() * (window.innerWidth - 180));
		let y = Math.floor(Math.random() * (window.innerHeight - 180));
		let size = 20 + props[i].count * 7;
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
	const [stars, setStars] = useState([]);
	const [totalcount, setTotalcount] = useState(0);
	const [rank, setRank] = useState([]);
	const navigate = useNavigate();
	const [modalOpen, setModalOpen] = useState(false);

	const showModal = () => {
		setModalOpen(true);
	};

	useEffect(() => {
		axios.get("https://j7d107.p.ssafy.io/api/stars").then((response) => {
			console.log(response.data);
			setStars(response.data.stars);
			setTotalcount(response.data.totalCount);
			star(response.data.stars);
		});

		axios
			.get("https://j7d107.p.ssafy.io/api/stars/ranking")
			.then((response) => {
				console.log(response.data);
				setRank(response.data);
			});
	}, []);

	return (
		<>
			<Wrapper>
				<div
					className="scene"
					style={{
						display: "flex",
						width: "100%",
						justifyContent: "space-between",
					}}
				>
					<div
						style={{
							width: "250px",
							height: "45vh",
							margin: "10px 0 0 20px",
							backgroundColor: "gray",
							borderRadius: "30px",
							opacity: 0.9,
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							zIndex: "10",
							paddingTop: "10px",
						}}
					>
						<p style={{ color: "black", fontSize: "1.4rem" }}>일일 등록 랭킹</p>
						{rank.map((count, idx) => {
							return (
								<div
									style={{
										width: "90%",
										margin: "10px 0 10px 0",
										fontSize: 17,
									}}
								>
									<div
										style={{
											float: "left",
											width: "27%",
											display: "flex",
											justifyContent: "center",
										}}
									>
										{idx === 0 || idx == 1 || idx == 2 ? (
											<>
												<img
													src={`/assets/rank${idx + 1}.png`}
													width="30px"
													style={{ border: "none", marginRight: "10px" }}
												/>{" "}
												<p style={{ fontSize: 17 }}> &nbsp;</p>
											</>
										) : (
											<p style={{ fontSize: 17, color: "#A5A5A5" }}>
												{idx + 1} &nbsp;{" "}
											</p>
										)}
									</div>
									<div
										style={{
											float: "left",
											width: "50%",
										}}
									>
										{count.nickname}
									</div>
									<div
										style={{
											float: "left",
											width: "23%",
										}}
									>
										{count.count}건
									</div>
								</div>
							);
						})}
					</div>{" "}
					<p style={{ display: "flex" }}>
						일일 등록 수{" "}
						<p style={{ color: "yellow", margin: "0px 20px 0px 20px" }}>
							{totalcount}
						</p>{" "}
						건
					</p>
					<div
						style={{
							width: "250px",
							height: "45vh",
							display: "hidden",
							flexDirection: "column",
							alignItems: "center",
							margin: "10px 20px 0 0",
							paddingTop: "10px",
						}}
					></div>
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
