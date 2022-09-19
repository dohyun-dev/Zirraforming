import styled from "styled-components";
import { Link } from "react-router-dom";

import Logo from "../assets/logo/jirav1.svg";
// import LogoPNG from "../assets/logo/jirav1.png";

const Nav = styled.div`
	display: grid;
	padding: 10px 30px;
	grid-template-columns: 200px 1fr 200px;
	grid-template-rows: 80px;
	width: 100%;
	height: 80px;


	.logo {
		width: 100%;
		height: 100%;
		img {
			width: 100%;
			height: 100%;
		}
	}

	.login {
		grid-column: 3 / 4;

		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 30px;
	}
`;

function Navbar() {
	return (
		<Nav>
			<div className="logo">
				<a href="/">
					<img src={Logo} alt="" />
				</a>
			</div>
			<div className="login">LOGIN</div>
		</Nav>
	);
}

export default Navbar;
