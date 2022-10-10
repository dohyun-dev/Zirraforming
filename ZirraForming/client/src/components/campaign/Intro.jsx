import { motion } from "framer-motion";
import styled from "styled-components";
import { BasicButton } from "../../items/styleButton";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import result from "../../assets/campaign/result.png";
import camera from "../../assets/campaign/camera.png";
import CampaignModal from "./CampaignModal";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

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
	}

	.starContent:hover {
		visibility: visible;
		cursor: pointer;
		opacity: 1 !important;
	}
`;

function star(props) {
	let count = props.length; // 별 수
	let scene = document.querySelector(".scene");
	let nodeList = document.querySelectorAll(".starbox")
	for (let node of nodeList) { 
		node.remove()
	}
	let i = 0;
	while (i < count) {
		let starbox = document.createElement("div");
		let star = document.createElement("img");
		let content = document.createElement("div");

		let x = Math.floor(Math.random() * (window.innerWidth - 180));
		let y = Math.floor(Math.random() * (window.innerHeight - 180));
		let size = 20 + props[i].count * 5.5;
		let imgSelector = Math.floor(Math.random() * 10);

		// 이미지 선택
		if (imgSelector % 2 == 0) {
			star.src = "/assets/fullstar.png";
		} else {
			star.src = "/assets/star.png";
		}

		starbox.className = "starbox";

		starbox.style.position = "absolute";
		starbox.style.display = "flex";
		starbox.style.justifyContent = "center";
		starbox.style.alignItems = "center";
		starbox.style.left = x + "px";
		starbox.style.top = y + "px";
		starbox.style.height = 1 + size + "px";

		star.style.width = 1 + size + "px";
		star.style.height = 1 + size + "px";

		content.innerText = props[i].nickname + " " + props[i].count + "건";
		content.style.left = x + "px";
		let yy = y + 1000;
		content.style.top = yy + "px";
		let memberId = props[i].memberId;
		content.style.zIndex = "10";
		content.style.backgroundColor = "rgba(0,0,0,0.5)";
		content.style.opacity = "0";
		content.className = "starContent";
		const getMember = (props) => {
			window.location.href = `https://j7d107.p.ssafy.io/mypage/${props}`;
		};
		content.addEventListener("click", () => {
			getMember(memberId);
		});

		starbox.appendChild(star);
		starbox.appendChild(content);
		scene.appendChild(starbox);

		i++;
	}
}

function Intro() {
	const [stars, setStars] = useState([]);
	const [totalcount, setTotalcount] = useState(0);
	const [rank, setRank] = useState([]);
	const navigate = useNavigate();
	const [modalOpen, setModalOpen] = useState(false);
	const [onetab, setOnetab] = useState(false);
	const [percentage, setPercentage] = useState(0);
	const [isHover, setIsHover] = useState(false);
	const [hover, setHover] = useState(false);
	const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);
	const webSocket = useRef(null);

	const showModal = () => {
		if (!cookies.accessToken) {
			alert("로그인한 사용자만 이용가능합니다!");
		} else {
			setModalOpen(true);
		}
	};

	useEffect(() => {
		axios.get("https://j7d107.p.ssafy.io/api/stars").then((response) => {
			console.log(response.data);
			setStars(response.data.stars);
			setTotalcount(response.data.totalCount);
			setPercentage(Math.min((response.data.totalCount / 80) * 100).toFixed(1));
			star(response.data.stars);
		});

		axios.get("https://j7d107.p.ssafy.io/api/stars/ranking")
			.then((response) => {
				console.log(response.data);
				setRank(response.data);
			});



		webSocket.current = new WebSocket(`wss://j7d107.p.ssafy.io/ws/socket`)
		
		webSocket.current.onopen = (event) => { 
			console.log("인트로 소켓연결")
		}


		webSocket.current.onmessage = (event) => { 
			const response = JSON.parse(event.data)
			console.log(response)
			setStars(response.stars.stars)
			setRank(response.rankings)
			setTotalcount(response.stars.totalCount)
			setPercentage(Math.min((response.stars.totalCount / 80) * 100).toFixed(1))
			
			console.log("인트로 메시지")
			star(response.stars.stars);
		}

		return () => webSocket.current.onclose = () => { 
			console.log("인트로 소켓연결해제")
		}
	}, []);

	const handleMouseEnter = () => {
		setIsHover(true);
	};
	const handleMouseLeave = () => {
		setIsHover(false);
	};

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
							minWidth: "250px",
							height: "330px",
							margin: "10px 0 0 20px",
							backgroundColor: "gray",
							borderRadius: "30px",
							opacity: 0.9,
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							zIndex: "100",
							paddingTop: "10px",
						}}
					>
						<p
							style={{
								color: "black",
								fontSize: "1.4rem",
								margin: "5px 0 10px 0",
							}}
						>
							일일 등록 랭킹
						</p>
						{!onetab ? (
							<>
								{rank.map((count, idx) => {
									if (idx < 5) {
										return (
											<div
												key={idx}
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
														height: "24.8px",
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
														<p
															style={{
																fontSize: 17,
																color: "#A5A5A5",
																margin: "0 0 2px 0",
															}}
														>
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
									}
								})}

								{rank.length > 5 && (
									<div
										style={{
											backgroundColor: "#575757",
											margin: "10px 5px 10px 5px",
											padding: "2px 10px 2px 10px",
											borderRadius: "10px",
											cursor: "pointer",
										}}
										onClick={() => {
											setOnetab(!onetab);
										}}
									>
										6~10위 보기
									</div>
								)}
							</>
						) : (
							<>
								{rank.map((count, idx) => {
									if (idx > 4) {
										return (
											<div
												key={idx}
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
														margin: "2px 0 2px 0",

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
														<p
															style={{
																fontSize: 17,
																color: "#A5A5A5",
															}}
														>
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
									}
								})}
								<div
									style={{
										backgroundColor: "#575757",
										margin: "10px 5px 10px 5px",
										padding: "2px 10px 2px 10px",
										borderRadius: "10px",
										cursor: "pointer",
									}}
									onClick={() => {
										setOnetab(!onetab);
									}}
								>
									1~5위 보기
								</div>{" "}
							</>
						)}{" "}
					</div>{" "}
					<p style={{ display: "flex", marginTop: "-60px", fontSize: "2rem" }}>
						일일 등록 수{" "}
						<p
							style={{
								color: "yellow",
								margin: "0px 10px 0px 20px",
								fontSize: "2rem",
							}}
						>
							{totalcount}
						</p>
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
					{isHover ? (
						<div
							style={{
								position: "fixed",
								width: "120px",
								right: "50px",
								bottom: "50px",
								zIndex: "100",
								cursor: "pointer",
							}}
							onMouseLeave={handleMouseLeave}
							onClick={() => {
								navigate("./result");
							}}
						>
							<CircularProgressbarWithChildren value={percentage}>
								<div
									style={{
										marginTop: -5,
										display: "flex",
										marginTop: "6px",
										flexDirection: "column",
										justifyContent: "center",
										alignItems: "center",
									}}
								>
									<p style={{ fontSize: 15 }}>오늘의 목표</p>
									<p style={{ fontSize: 15 }}>{percentage}% 달성</p>
								</div>
							</CircularProgressbarWithChildren>
						</div>
					) : (
						<img
							onMouseEnter={handleMouseEnter}
							src={result}
							style={{
								position: "fixed",
								width: "140px",
								right: "40px",
								bottom: "40px",
								zIndex: "200",
							}}
							onClick={() => {
								navigate("./result");
							}}
							alt=""
						/>
					)}
					<img
						src={camera}
						style={{
							position: "fixed",
							width: "5vw",
							right: "60px",
							top: "100px",
							zIndex: "100",
							cursor: "pointer",
						}}
						onClick={showModal}
						alt=""
					/>
					{modalOpen && <CampaignModal setModalOpen={setModalOpen} webSocket={ webSocket } />}
				</div>
			</Wrapper>
		</>
	);
}

export default Intro;
