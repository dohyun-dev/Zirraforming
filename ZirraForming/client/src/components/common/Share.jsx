import styled from "styled-components";
import {
	FacebookShareButton,
	FacebookIcon,
	TwitterIcon,
	TwitterShareButton,
} from "react-share";
import kakaoLogo from "../../assets/logo/kakao.png";

// 제목과 버튼을 감싸는 컨테이너
const FlexContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

// 버튼을 배치시키는 컨테이너
const GridContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 48px);
	grid-column-gap: 8px;
	justify-content: center;
	align-items: center;
	margin-bottom: 16px;
	margin-top: 10px;
`;

const URLShareButton = styled.button`
	width: 48px;
	height: 48px;
	color: white;
	border-radius: 24px;
	border: 0px;
	font-weight: 800;
	font-size: 18px;
	cursor: pointer;
	background-color: #7362ff;
	&:hover {
		background-color: #a99fee;
	}
`;

const KakaoShareButton = styled.a`
	cursor: pointer;
`;

const KakaoIcon = styled.img`
	width: 48px;
	height: 48px;
	border-radius: 24px;
`;

const handleKakaoButton = () => {
	// window.Kakao.Link.sendScrap({
	// 	requestUrl: "http://j7d107.p.ssafy.io",
	// });

	window.Kakao.Link.sendDefault({
		objectType: "feed",
		content: {
			title: "환경지킴이 짱구",
			description: "나의 환경 점수는 몇점일까?",
			imageUrl: "http://j7d107.p.ssafy.io/images/zzang.jpeg",
			link: {
				webUrl: "http://j7d107.p.ssafy.io",
				mobileWebUrl: "http://j7d107.p.ssafy.io",
			},
		},
		buttons: [
			{
				title: "환경스타일 검사하러가기",
				link: {
					webUrl: "http://j7d107.p.ssafy.io",
					mobileWebUrl: "http://j7d107.p.ssafy.io",
				},
			},
		],
	});
};

function Share() {
	return (
		<FlexContainer>
			<h3 style={{ color: "black" }}>이 결과 공유하기</h3>
			<GridContainer>
				<FacebookShareButton url="http://localhost:3000/quiz">
					<FacebookIcon size={48} round={true} borderRadius={24}></FacebookIcon>
				</FacebookShareButton>
				<TwitterShareButton url="http://localhost:3000/quiz">
					<TwitterIcon size={48} round={true} borderRadius={24}></TwitterIcon>
				</TwitterShareButton>

				<URLShareButton
					onClick={() => {
						navigator.clipboard.writeText("http://localhost:3000/quiz");
						alert("링크가 복사되었습니다!");
					}}
				>
					URL
				</URLShareButton>

				<KakaoShareButton onClick={handleKakaoButton}>
					<KakaoIcon src={kakaoLogo}></KakaoIcon>
				</KakaoShareButton>
			</GridContainer>
		</FlexContainer>
	);
}

export default Share;
