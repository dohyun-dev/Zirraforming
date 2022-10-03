import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Logo from "../assets/logo/jirav1.svg";
// import LogoPNG from "../assets/logo/jirav1.png";

import LoginModal from "./LoginModal";
import { useCookies } from "react-cookie";
import jwt from "jwt-decode";
import { useRecoilState } from "recoil";
import { MemberData, Token } from "../atoms";
import axios from "axios";

const Nav = styled.div`
	display: grid;
	padding: 10px 30px;
	grid-template-columns: 200px 1fr 200px;
	grid-template-rows: 80px;
	width: ${(props) => props.width || "calc(100vw-10px)"};
	height: 80px;
	color: ${(props) => props.theme.lightWhite};
	font-family: "Black Han Sans";

	.logo {
		width: 100%;
		height: 100%;
		img {
			width: 100%;
			height: 100%;
			cursor: pointer;
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
	.container {
		min-width: 220px;
		box-shadow: 0 4px 5px 0 #00000026;
		position: relative;
		z-index: 10;
		text-align: center;
	}
	#dropdown {
		left: 0;
		visibility: hidden;
		position: absolute;
	}
	.dropdownLabel {
		display: flex;
		justify-content: center;
		padding: 12px;
		width: 200px;
	}
	.dropdownLabel:hover {
		cursor: pointer;
	}
	.content {
		display: none;
		position: absolute;
		width: 80%;
		left: 0;
		font-size: 20px;
		background: rgba(255, 255, 255, 0.9);
		box-shadow: 0 4px 5px 0 #00000026;
		border-radius: 8px;
		box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
		margin-left: 20px;
		z-index: 100;
	}

	#dropdown:checked + label + div.content {
		display: block;
		border-top: 1px solid #00000026;
	}
	.caretIcon {
		transition: transform 250ms ease-out;
	}
	#dropdown:checked + label > .caretIcon {
		transform: rotate(-180deg);
	}

	.content ul {
		list-style-type: none;
		padding: 12px;
		margin: 0;
	}
	.content ul li {
		margin: 0.8rem 0;
	}

	@keyframes slide-fade-in-dropdown-animation {
		0% {
			transform: translateY(-100%);
		}

		100% {
			transform: translateY(0);
		}
	}

	.slide-fade-in-dropdown {
		overflow: hidden;
	}

	.slide-fade-in-dropdown > ul {
		animation: slide-fade-in-dropdown-animation 0.4s ease;
	}

	@keyframes slide-fade-out-dropdown-animation {
		0% {
			transform: translateY(0);
		}

		100% {
			transform: translateY(-100%);
		}
	}
`;

const Dropdown = (props) => {
	const [visibilityAnimation, setVisibilityAnimation] = useState(false);
	const [repeat, setRepeat] = useState(null);

	useEffect(() => {
		if (props.visibility) {
			clearTimeout(repeat);
			setRepeat(null);
			setVisibilityAnimation(true);
		} else {
			setRepeat(
				setTimeout(() => {
					setVisibilityAnimation(false);
				}, 400)
			);
		}
	}, [props.visibility]);

	return (
		<article
			article
			className={`components-dropdown ${
				props.visibility ? "slide-fade-in-dropdown" : "slide-fade-out-dropdown"
			}`}
		>
			{visibilityAnimation && props.children}
		</article>
	);
};

function Navbar({ width, navigate }) {
	const [modalOpen, setModalOpen] = useState(false);
	const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);
	const [user, setUser] = useState("");
	const [member, setMember] = useRecoilState(MemberData);
	const [token, setToken] = useRecoilState(Token);
	const [dropdownVisibility, setDropdownVisibility] = useState(false);
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
			setToken(cookies.accessToken);
		}
	}, []);

	return (
		<Nav width={width}>
			<div className="logo">
				<Link to={"/"}>
					<img src={Logo} alt="" />
				</Link>
			</div>
			{localStorage.getItem("accessToken") ? (
				<div className="login">
					<div className="container">
						<input id="dropdown" type="checkbox" />
						<label className="dropdownLabel" for="dropdown">
							<p style={{ fontSize: 16, color: "#3c9f58" }}>{user} </p>
							<p style={{ fontSize: 16 }}> 님 안녕하세요</p>
						</label>
						<div className="content">
							<ul>
								<li>
									<Link to={`/mypage/${member.member.Id}`} class="link">
										마이페이지
									</Link>
								</li>
								<li>
									<Link to="/style" class="link">
										환경스타일 검사
									</Link>
								</li>
								<li>
									<Link to="/campaign" class="link">
										별보러 갈래?
									</Link>
								</li>
								<li>
									<Link to="/quiz" class="link">
										환경상식퀴즈
									</Link>
								</li>
								<li>
									<Link
										to="/"
										class="link"
										onClick={() => {
											const config = {
												Headers: {
													Authorization: "Bearer " + cookies.accessToken,
												},
											};
											axios
												.post("https://j7d107.p.ssafy.io/api/logout", config, {
													withCredentials: true,
												})
												.then((response) => {
													localStorage.removeItem("accessToken");
													removeCookie("accessToken");
													alert("로그아웃 되었습니다.");
												});
										}}
									>
										로그아웃
									</Link>
								</li>
							</ul>
						</div>
					</div>
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
