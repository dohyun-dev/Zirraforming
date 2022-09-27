import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { BasicButton } from "../../items/styleButton";
import upload from "../../assets/campaign/upload.png";

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
	const closeModal = () => {
		setModalOpen(false);
	};

	const modalRef = useRef();

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
						<img
							src={upload}
							style={{ width: "160px", marginBottom: "20px" }}
							onClick={() => {}}
							alt=""
						/>
						<BasicButton
							style={{ width: "80%", height: "50px" }}
							onClick={() => {}}
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
