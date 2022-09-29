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

const handleKakaoButton = (props) => {
	// window.Kakao.Link.sendScrap({
	// 	requestUrl: "http://j7d107.p.ssafy.io",
	// });

	window.Kakao.Link.sendDefault({
		objectType: "feed",
		content: {
			title: "환경 상식 테스트",
			description: "나의 환경 점수는 몇점일까?",
			imageUrl: `http://j7d107.p.ssafy.io/images/quiz${props.score}.jpg`,
			link: {
				webUrl: "http://j7d107.p.ssafy.io/quiz",
				mobileWebUrl: "http://j7d107.p.ssafy.io/quiz",
			},
		},
		buttons: [
			{
				title: "환경 상식퀴즈 풀러가기",
				link: {
					webUrl: "http://j7d107.p.ssafy.io/quiz",
					mobileWebUrl: "http://j7d107.p.ssafy.io/quiz",
				},
			},
		],
	});
};

function Share(props) {
	const score = props.state;

	return (
		<FlexContainer>
			<h3 style={{ color: "black" }}>이 결과 공유하기</h3>
			<GridContainer>
				<FacebookShareButton url="http://j7d107.p.ssafy.io/quiz">
					<FacebookIcon size={48} round={true} borderRadius={24}></FacebookIcon>
				</FacebookShareButton>
				<TwitterShareButton url="http://j7d107.p.ssafy.io/quiz">
					<TwitterIcon size={48} round={true} borderRadius={24}></TwitterIcon>
				</TwitterShareButton>

				<URLShareButton
					onClick={() => {
						navigator.clipboard.writeText("http://j7d107.p.ssafy.io/quiz");
						alert("링크가 복사되었습니다!");
					}}
				>
					URL
				</URLShareButton>

				<KakaoShareButton
					onClick={() => {
						handleKakaoButton({ score });
					}}
				>
					<KakaoIcon src={kakaoLogo}></KakaoIcon>
				</KakaoShareButton>
			</GridContainer>
		</FlexContainer>
	);
}

export default Share;
