import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { BasicButton } from "../../items/styleButton";
import upload from "../../assets/campaign/upload.png";
import { MemberData } from "../../atoms";
import { useRecoilValue } from "recoil";
import { useCookies } from "react-cookie";
import axios from "axios";

const Modal = styled.div`
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 200;
	background-color: rgba(0, 0, 0, 0.6);
	width: 100vw;
	height: 100vh;
	animation: modal-bg-show 0.3s;

	button {
		outline: none;
		cursor: pointer;
		border: 0;
	}
	section {
		width: 24%;
		min-width: 300px;
		margin: 100px auto;
		height: 580px;
		border-radius: 1rem;
		background-color: #c6d2e4;
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}
	section > header {
		position: relative;
		padding: 16px 64px 16px 16px;
		background-color: #c6d2e4;
		font-weight: 700;
	}
	section > header button {
		position: absolute;
		top: 15px;
		right: 15px;
		width: 30px;
		font-size: 21px;
		font-weight: 700;
		text-align: center;
		color: #999;
		background-color: transparent;
	}
	section > main {
		padding: 16px;
		/* border-bottom: 1px solid #dee2e6;
		border-top: 1px solid #dee2e6; */
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	section > main > img {
		position: relative !important;
	}

	@keyframes modal-bg-show {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
`;

function CampaignModal({ setModalOpen }) {
	const [file, setFile] = useState("");
	const [imageSrc, setImageSrc] = useState("");
	const memberId = useRecoilValue(MemberData);
	const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);
	const [result, setResult] = useState({});
	const [isSubmit, setIsSubmit] = useState(false);
	const [isFile, setIsFile] = useState(false);

	const accessToken = localStorage.getItem("accessToken", cookies.accessToken);

	const navigate = useNavigate();
	const closeModal = () => {
		setModalOpen(false);
	};

	const modalRef = useRef();
	const imageInput = useRef();

	const onLoadFile = (e) => {
		setFile(e.target.files[0]);
		showImage(e.target.files[0]);
	};

	const showImage = (fileBlob) => {
		const reader = new FileReader();

		reader.readAsDataURL(fileBlob);

		return new Promise((resolve) => {
			reader.onload = () => {
				setImageSrc(reader.result);

				resolve();
			};
		});
	};

	const submit = () => {
		
		if (!file) {
			setIsFile(true);
		} else {
			const formdata = new FormData();
			formdata.append("image", file);
			formdata.append("memberId", memberId.member.Id);
			const config = {
				Headers: {
					"content-type": "multipart/form-data",
					Authorization: "Bearer " + accessToken,
				},
			};

			axios
				.post("https://j7d107.p.ssafy.io/api/stars", formdata, config)
				.then((response) => {
					setResult(response.data);
					setIsSubmit(true);
				});
		}
		
	};

	const uploadImage = () => {
		imageInput.current.click();
	};

	useEffect(() => {

		const handler = (e) => {
			if (
				setModalOpen &&
				modalRef.current &&
				!modalRef.current.contains(e.target)
			) {
				setModalOpen(false);
			}
		};

		// 이벤트 핸들러 등록
		document.addEventListener("mousedown", handler);
		// document.addEventListener('touchstart', handler); // 모바일 대응

		return () => {
			// 이벤트 핸들러 해제
			document.removeEventListener("mousedown", handler);
			// document.removeEventListener('touchstart', handler); // 모바일 대응
		};
	});

	return (
		<Modal>
			{setModalOpen ? (
				<section ref={modalRef}>
					<header>
						<p style={{ color: "#c6d2e4" }}></p>
						<button className="close" onClick={closeModal}>
							&times;
						</button>
					</header>
					{isSubmit ? (
						<main>
							<p
								style={{
									color: "#49489B",
									fontSize: "1.9rem",
									margin: "1vh 0px 1vh 0px",
								}}
							>
								오늘의 지라포밍
							</p>
							<p
								style={{
									color: "#151457",
									fontSize: "2.4rem",
								}}
							>
								{result.type}
							</p>
							<img
								src={result.imgUrl}
								style={{ width: "40%", margin: "1vh 0 1vh 0 " }}
								alt=""
							/>
							<p
								style={{
									color: "#222128",
									fontSize: "1rem",
									padding: "0 25px 0 25px",
									fontFamily: "GmarketSansMedium",
								}}
							>
								{result.comment}
							</p>
							<BasicButton
								style={{
									width: "80%",
									height: "80px",
									marginTop: "20px",
									backgroundColor: "#9498BE",
									color: "#49489B",
									fontSize: "13px",
									cursor: "default",
									display: "flex",
									flexDirection: "column",
									fontFamily: "SBAggroB",
								}}
							>
								전 인구가 이 쓰레기를 잘 버린다면 <br />
								<p
									style={{
										fontSize: "30px",
										color: "#49489B",
										marginLeft: "20px",
									}}
								>
									빙하 {result.iceAmount}t{" "}
									<strong style={{ color: "red" }}>↑</strong>
								</p>
							</BasicButton>
							<BasicButton
								style={{
									width: "80%",
									height: "50px",
									marginTop: "20px",
									fontFamily: "SBAggroB",
								}}
								onClick={() => {
									navigate("./result");
								}}
							>
								전체 결과보기
							</BasicButton>
						</main>
					) : (
						<main style={{ marginTop: "20px" }}>
							<p
								style={{
									color: "#49489B",
									fontSize: "1.6rem",
									margin: "5vh 0px 4vh 0px",
								}}
							>
								오늘 주운 쓰레기 등록
							</p>
							{!file ? (
								<>
									<img
										src={upload}
										style={{
											width: "160px",
											cursor: "pointer",
											marginBottom: "20px",
										}}
										onClick={uploadImage}
										alt=""
									/>
									{isFile ? (
										<p
											style={{
												fontSize: "12px",
												color: "#bb3e30",
												fontFamily: "SBAggroB",
											}}
										>
											업로드된 이미지가 없습니다
										</p>
									) : (
										<p
											style={{
												fontSize: "12px",
												color: "#bb3e30",
												fontFamily: "SBAggroB",
											}}
										>
											버튼을 눌러 이미지를 업로드해주세요
										</p>
									)}
								</>
							) : (
								<>
									<img
										src={imageSrc}
										style={{
											width: "160px",
											height: "150px",
											marginBottom: "20px",
										}}
									/>
									<p
										style={{
											fontSize: "12px",
											color: "#bb3e30",
											fontFamily: "SBAggroB",
										}}
									>
										이미지가 업로드 되었습니다
									</p>
								</>
							)}
							<input
								type="file"
								style={{ display: "none" }}
								ref={imageInput}
								onChange={onLoadFile}
							/>

							<BasicButton
								style={{ width: "80%", height: "50px", marginTop: "40px" }}
									onClick={ submit }
							>
								등록하기
							</BasicButton>
						</main>
					)}
				</section>
			) : null}
		</Modal>
	);
}

export default CampaignModal;