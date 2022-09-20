import styled from "styled-components";

export const HomeButton = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: end;
	width: 400px;
	height: 230px;
	border-radius: 10px;
	border: 0px;
	color: black;
	font-size: 25px;
	font-weight: 300;
	font-family: "Black Han Sans";
	cursor: pointer;

	@media screen and (${(props) => props.theme.tablet}) {
		width: 70vw;
		height: 27vh;
		font-size: 30px;
	}
	@media screen and (${(props) => props.theme.mobile}) {
		width: 70vw;
		height: 25vh;
		font-size: 18px;
	}
`;
