import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { FontSizeProvider, useFontSize } from "./FontSizeContext";
import { MissionProvider } from "./MissionContext";
import { FeedProvider } from "./FeedContext";

import Splash from "../Splash";
import MainPage from "../MainPage";
import Mypage from "../Mypage/Mypage";
import LocalInfoShare from "../LocalInfoShare/LocalInfoShare";
import LocalInfoForm from "../LocalInfoShare/LocalInfoForm";
import TodayViewFeed from "../TodayViewFeed/TodayViewFeed";
import AdminMissionPage from "../TodayViewFeed/AdminMissionPage";
import MissionRegistration from "../TodayViewFeed/MissionRegistration";
import MissionComplete from "../TodayViewFeed/MissionComplete";
import FeedDetail from "../TodayViewFeed/FeedDetail";
import FortunePage from "../FortunePage/FortunePage";
import FortuneDetail from "../FortunePage/FortuneDetail";
import FortuneOpen from "../FortunePage/FortuneOpen";
import FortuneContent from "../FortunePage/FortuneContent";
import MessageWrite from "../FortunePage/MessageWrite";

/* html 폰트 크기를 Context 값으로 변경 → rem 단위가 전역으로 스케일됨 */
const GlobalStyle = createGlobalStyle<{ $fontSize: number }>`
  html { 
    font-size: ${({ $fontSize }) => $fontSize}px;
  }
  body {
    line-height: 1.6;
    transition: font-size .2s ease;
  }
`;

const GlobalWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { fontSize } = useFontSize();
  return (
    <>
      <GlobalStyle $fontSize={fontSize} />
      {children}
    </>
  );
};

export default function Routers() {
  return (
    <FontSizeProvider>
      <MissionProvider>
        <FeedProvider>
          <GlobalWrapper>
            <Router>
              <Routes>
            <Route path="/" element={<TodayViewFeed />} />
            <Route path="/Splash" element={<Splash />} />
            <Route path="/MainPage" element={<MainPage />} />
            <Route path="/Mypage" element={<Mypage />} />
            <Route path="/LocalInfoShare" element={<LocalInfoShare />} />
            <Route path="/LocalInfoForm" element={<LocalInfoForm />} />
            <Route path="/mission-registration" element={<MissionRegistration />} />
            <Route path="/mission-complete" element={<MissionComplete />} />
            <Route path="/feed-detail/:id" element={<FeedDetail />} />
            <Route path="/fortune" element={<FortunePage />} />
            <Route path="/fortune-detail/:id" element={<FortuneDetail />} />
            <Route path="/fortune-open" element={<FortuneOpen />} />
            <Route path="/fortune-content" element={<FortuneContent />} />
            <Route path="/message-write" element={<MessageWrite />} />
                {/* 관리자 전용 임시 공개 경로 */}
                <Route path="/admin/missions" element={<AdminMissionPage />} />
              </Routes>
            </Router>
          </GlobalWrapper>
        </FeedProvider>
      </MissionProvider>
    </FontSizeProvider>
  );
}
