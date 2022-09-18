import styled from "styled-components";
import Intro from "../components/mbti/Intro";

const CanvasWrap = styled.div`
	width: 100vw;
	height: 100vh;
	background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
		url("/assets/bg/space.jfif");
	background-position: center center;
	background-size: cover;
	color: ${(props) => props.theme.lightWhite};
	font-family: "Black Han Sans";
	display: flex;
	justify-content: center;
`;
function Mbti() {
	return (
		<CanvasWrap>
			<Intro />
		</CanvasWrap>
	);
}
export default Mbti;
