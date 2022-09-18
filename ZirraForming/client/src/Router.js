import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Mbti from "./pages/Mbti";

function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Main />}></Route>
				<Route path="/style" element={<Mbti />}></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default Router;
