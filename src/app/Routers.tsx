// src/app/Routers.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { FontSizeProvider, useFontSize } from "./FontSizeContext";
import { MissionProvider } from "./MissionContext";
import { FeedProvider } from "./FeedContext";

// 메인 브랜치의 Landing 구조 사용
import Splash from "../Landing/Pages/Splash";
import MainPage from "../Landing/Pages/MainPage";
import OauthCallback from "../Landing/auth/OauthCallBack";
import RequireAuth from "../Landing/auth/RequireAuth";

// 메인 브랜치의 Mypage 구조 사용
import Mypage from "../Mypage/Pages/Mypage";
import LocalInfoShare from "../LocalInfoShare/Pages/LocalInfoShare";
import LocalInfoForm from "../LocalInfoShare/Pages/LocalInfoForm";
import LocalInfoAddress from "../LocalInfoShare/Pages/LocalInfoAddress";
import LocalInfoMap from "../LocalInfoShare/Pages/LocalInfoMap";

import CookieDetail from "../Mypage/Pages/CookieDetailPage";
import ManagerHome from "../Manager/Pages/ManagerHome";

// 우리가 만든 FortunePage와 TodayViewFeed 추가
import TodayViewFeed from "../TodayViewFeed/TodayViewFeed";
import AdminMissionPage from "../TodayViewFeed/AdminMissionPage";
import MissionListPage from "../TodayViewFeed/MissionListPage";
import MissionRegistration from "../TodayViewFeed/MissionRegistration";
import MissionComplete from "../TodayViewFeed/MissionComplete";
import FeedDetail from "../TodayViewFeed/FeedDetail";
import FortunePage from "../FortunePage/FortunePage";
import FortuneDetail from "../FortunePage/FortuneDetail";
import FortuneOpen from "../FortunePage/FortuneOpen";
import FortuneContent from "../FortunePage/FortuneContent";
import MessageWrite from "../FortunePage/MessageWrite";

/* rem 전역 스케일 */
const GlobalStyle = createGlobalStyle<{ $fontSize: number }>`
  html { font-size: ${({ $fontSize }) => $fontSize}px; }
  body { line-height: 1.6; transition: font-size .2s ease; }
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
                {/* ✅ 공개 경로 */}
                <Route path="/" element={<Splash />} />
                <Route path="/main" element={<MainPage />} />
                <Route path="/oauth/callback" element={<OauthCallback />} />
                
                {/* ✅ 보호 경로 */}
                <Route element={<RequireAuth />}>
                  {/* 메인 브랜치의 기존 경로들 */}
                  <Route path="/mypage" element={<Mypage />} />
                  <Route path="/localinfoshare" element={<LocalInfoShare />} />
                  <Route path="/localinfoform" element={<LocalInfoForm />} />
                  <Route path="/localinfoaddress" element={<LocalInfoAddress />} />
                  <Route path="/localinfomap" element={<LocalInfoMap />} />
                  <Route path="/cookiedetailpage" element={<CookieDetail />} />
                  <Route path="/managerhome" element={<ManagerHome />} />
                  
                  {/* 우리가 추가한 FortunePage와 TodayViewFeed 경로들 */}
                  <Route path="/feed" element={<TodayViewFeed />} />
                  <Route path="/mission-registration" element={<MissionRegistration />} />
                  <Route path="/mission-complete" element={<MissionComplete />} />
                  <Route path="/feed-detail/:id" element={<FeedDetail />} />
                  <Route path="/fortune" element={<FortunePage />} />
                  <Route path="/fortune-detail/:id" element={<FortuneDetail />} />
                  <Route path="/fortune-open" element={<FortuneOpen />} />
                  <Route path="/fortune-content" element={<FortuneContent />} />
                  <Route path="/message-write" element={<MessageWrite />} />
                  
                  {/* 관리자 전용 경로 */}
                  <Route path="/admin/missions" element={<AdminMissionPage />} />
                  <Route path="/mission-list" element={<MissionListPage />} />
                </Route>

                {/* (선택) 404 */}
                {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
              </Routes>
            </Router>
          </GlobalWrapper>
        </FeedProvider>
      </MissionProvider>
    </FontSizeProvider>
  );
}
