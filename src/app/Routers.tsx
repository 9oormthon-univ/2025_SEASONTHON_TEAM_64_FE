// src/app/Routers.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { FontSizeProvider, useFontSize } from "./FontSizeContext";

import Splash from "../Landing/Pages/Splash";
import MainPage from "../Landing/Pages/MainPage";
import OauthCallback from "../Landing/auth/OauthCallBack";
import RequireAuth from "../Landing/auth/RequireAuth";

import Mypage from "../Mypage/Pages/Mypage";
import LocalInfoShare from "../LocalInfoShare/Pages/LocalInfoShare";
import LocalInfoForm from "../LocalInfoShare/Pages/LocalInfoForm";
import LocalInfoAddress from "../LocalInfoShare/Pages/LocalInfoAddress";
import LocalInfoMap from "../LocalInfoShare/Pages/LocalInfoMap";


import CookieDetail from "../Mypage/Pages/CookieDetailPage";
import ManagerHome from "../Manager/Pages/ManagerHome";

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
      <GlobalWrapper>
        <Router>
          <Routes>
            {/* ✅ 공개 경로 */}
          <Route path="/" element={<Splash />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/oauth/callback" element={<OauthCallback />} />
            {/* ✅ 보호 경로 */}
            <Route element={<RequireAuth />}>
              <Route path="/mypage" element={<Mypage />} />
              <Route path="/localinfoshare" element={<LocalInfoShare />} />
              <Route path="/localinfoform" element={<LocalInfoForm />} />
              <Route path="/localinfoaddress" element={<LocalInfoAddress />} />
              <Route path="/localinfomap" element={<LocalInfoMap />} />
              <Route path="/cookiedetailpage" element={<CookieDetail />} />
              <Route path="/managerhome" element={<ManagerHome />} />
            </Route>

            {/* (선택) 404 */}
            {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
          </Routes>
        </Router>
      </GlobalWrapper>
    </FontSizeProvider>
  );
}
