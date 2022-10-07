import styled from "styled-components";
import Result from "../components/campaign/Result";
import Navbar from "../components/Navbar";

const CanvasWrap = styled.div`
	width: 100%;
	height: auto;

	color: ${(props) => props.theme.lightWhite};
	font-family: "Black Han Sans";
	display: flex;
	justify-content: center;
	@media screen and (${(props) => props.theme.tablet}) {
		width: 98%;
		height: auto;
	}
	@media screen and (${(props) => props.theme.mobile}) {
		width: 98%;
		height: auto;
	}
`;
function CampaignResult() {
	return (
		<>
			<Navbar />
			<CanvasWrap>
				<Result />
			</CanvasWrap>
		</>
	);
}
export default CampaignResult;
