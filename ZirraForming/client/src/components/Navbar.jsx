import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Logo from "../assets/logo/jirav1.svg";
// import LogoPNG from "../assets/logo/jirav1.png";

import LoginModal from "./LoginModal";
import { useCookies } from "react-cookie";
import jwt from "jwt-decode";
import { useRecoilState } from "recoil";
import { MemberData } from "../atoms";

const Nav = styled.div`
	display: grid;
	padding: 10px 30px;
	grid-template-columns: 200px 1fr 200px;
	grid-template-rows: 80px;
	width: ${(props) => props.width || "100%"};
	height: 80px;
	color: ${(props) => props.theme.lightWhite};
	font-family: "Black Han Sans";
	.logo {
		width: 100%;
		height: 100%;
		img {
			width: 100%;
			height: 100%;
		}
	}

	.login {
		grid-column: 3 / 5;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 30px;
	}
`;

function Navbar({ width }) {
	const [modalOpen, setModalOpen] = useState(false);
	const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);
	const [user, setUser] = useState("");
	const [member, setMember] = useRecoilState(MemberData);
	const showModal = () => {
		setModalOpen(true);
	};

	useEffect(() => {
		if (cookies.accessToken) {
			localStorage.setItem("accessToken", cookies.accessToken);
			const userInfo = jwt(cookies.accessToken);
			console.log(userInfo.nickname);
			setUser(userInfo.nickname);
			const memberId = userInfo.sub;
			setMember({
				member: {
					Id: memberId,
				},
			});
		}
	}, []);

	return (
		<Nav width={width}>
			<div className="logo">
				<a href="/">
					<img src={Logo} alt="" />
				</a>
			</div>
			{localStorage.getItem("accessToken") ? (
				<div
					className="login"
					onClick={() => {
						// window.location.href = "../mypage";
						//임시로 로그아웃 진행
						localStorage.removeItem("accessToken");
						// localStorage.clear();
						// alert("토큰 없애기");
						window.location.reload();
					}}
				>
					<p style={{ fontSize: 16, color: "#3c9f58" }}>{user} </p>
					<p style={{ fontSize: 13 }}> 님 안녕하세요</p>
				</div>
			) : (
				<div className="login" onClick={showModal}>
					LOGIN
				</div>
			)}

			{modalOpen && <LoginModal setModalOpen={setModalOpen} />}
		</Nav>
	);
}

export default Navbar;
