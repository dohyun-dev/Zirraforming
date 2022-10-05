import { BrowserRouter, Route, Routes } from "react-router-dom";

import Main from "./pages/Main";
import Mbti from "./pages/Mbti";
import MbtiResult from "./pages/MbtiResult";
import Quiz from "./pages/Quiz";
import QuizResult from "./pages/QuizResult";
import Campaign from "./pages/Campaign";
import CampaignResult from "./pages/CampaignResult";
import MyPage from "./pages/MyPage";

function Router() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}></Route>
        </Routes>

        <Routes>
          <Route path="/style" element={<Mbti />}></Route>
          <Route path="/style/result" element={<MbtiResult />}></Route>
          <Route path="/quiz" element={<Quiz />}></Route>
          <Route path="/quiz/result" element={<QuizResult />}></Route>
          <Route path="/campaign" element={<Campaign />}></Route>
          <Route path="/campaign/result" element={<CampaignResult />}></Route>
          <Route path="/mypage/:memberId" element={<MyPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Router;
