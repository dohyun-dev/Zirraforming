import styled from "styled-components";
import { Link } from "react-router-dom";
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
	z-index: 99;
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
		width: 20%;
		min-width: 300px;
		margin: 150px auto;
		height: 400px;
		border-radius: 1rem;
		background-color: #c6d2e4;
		overflow: hidden;
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

	const accessToken = localStorage.getItem("accessToken", cookies.accessToken);
	console.log(memberId.member.Id);

	const closeModal = () => {
		setModalOpen(false);
	};

	const modalRef = useRef();
	const imageInput = useRef();

	const onLoadFile = (e) => {
		console.log(e.target.files[0]);
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
		const formdata = new FormData();
		formdata.append("image", file);

		formdata.append("memberId", memberId.member.Id);
		console.log(file);
		console.log(formdata);
		const config = {
			Headers: {
				"content-type": "multipart/form-data",
				Authorization: "Bearer " + accessToken,
			},
		};

		axios
			.post("http://j7d107.p.ssafy.io/api/stars", formdata, config)
			.then((response) => {
				console.log("성공");
				console.log(response);
			});
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
					<main>
						<p
							style={{
								color: "#49489B",
								fontSize: "1.6rem",
								margin: "2vh 0px 4vh 0px",
							}}
						>
							오늘 주운 쓰레기 등록
						</p>
						{!file ? (
							<img
								src={upload}
								style={{
									width: "160px",

									marginBottom: "20px",
								}}
								onClick={uploadImage}
								alt=""
							/>
						) : (
							<img
								src={imageSrc}
								style={{
									width: "160px",
									height: "150px",
									marginBottom: "20px",
								}}
							/>
						)}
						<input
							type="file"
							style={{ display: "none" }}
							ref={imageInput}
							onChange={onLoadFile}
						/>

						<BasicButton
							style={{ width: "80%", height: "50px", marginTop: "20px" }}
							onClick={submit}
						>
							등록하기
						</BasicButton>
					</main>
				</section>
			) : null}
		</Modal>
	);
}

export default CampaignModal;
