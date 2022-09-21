import { useEffect } from "react";
import { RecoilRoot } from "recoil";
import styled from "styled-components";
import Router from "./Router";
import { useScript } from "./hooks";

const Test = styled.div`
	font-family: ${(props) => props.theme.titleFont};
`;

function App() {
	const status = useScript("https://developers.kakao.com/sdk/js/kakao.js");

	useEffect(() => {
		if (status === "ready" && window.Kakao) {
			if (!window.Kakao.isInitialized()) {
				window.Kakao.init("49d101b3360a79e2344df7985e4758a1");
			}
		}
	}, [status]);
	return (
		<RecoilRoot>
			<Router></Router>
		</RecoilRoot>
	);
}

export default App;
