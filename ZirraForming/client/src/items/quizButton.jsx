import styled from "styled-components";

export const BasicButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 400px;
	height: 65px;
	border-radius: 10px;
	border: 0px;
	background-color: #3c9f58;
	color: black;
	font-size: 25px;
	font-weight: 300;
	font-family: "Black Han Sans";
	cursor: pointer;

	@media screen and (${(props) => props.theme.tablet}) {
		width: 65vw;
	}
	@media screen and (${(props) => props.theme.mobile}) {
		width: 45vw;
	}
`;
