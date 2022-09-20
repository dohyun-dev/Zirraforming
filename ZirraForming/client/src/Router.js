import { BrowserRouter, Route, Routes } from "react-router-dom";

import Main from "./pages/Main";
import Mbti from "./pages/Mbti";
import MbtiResult from "./pages/MbtiResult";
import Quiz from "./pages/Quiz";
import QuizResult from "./pages/QuizResult";

function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Main />}></Route>
				<Route path="/style" element={<Mbti />}></Route>
				<Route path="/style/result" element={<MbtiResult />}></Route>
				<Route path="/quiz" element={<Quiz />}></Route>
				<Route path="/quiz/result" element={<QuizResult />}></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default Router;
