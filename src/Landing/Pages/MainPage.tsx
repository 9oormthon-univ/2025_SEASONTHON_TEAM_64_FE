import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Wrapper,
  Container,
  LogoBox,
  MainText,
  KakaoLoginBtn,
} from "../Styles/MainPage.Styles";

/** 환경변수에서 백엔드 주소 */
const API_BASE_URL =
  (import.meta as any)?.env?.VITE_API_BASE_URL ?? "http://localhost:8080";

/** 간단 토큰 유틸 */
function readTokensFromURL() {
  const p = new URLSearchParams(window.location.search);
  const at = p.get("accessToken");
  const rt = p.get("refreshToken");
  return at && rt ? { accessToken: at, refreshToken: rt } : null;
}
function saveTokens(t: { accessToken: string; refreshToken: string }) {
  sessionStorage.setItem("accessToken", t.accessToken);
  sessionStorage.setItem("refreshToken", t.refreshToken);
}
function clearQueryString() {
  const url = new URL(window.location.href);
  url.search = "";
  window.history.replaceState({}, "", url.toString());
}

const MainPage: React.FC = () => {
  const navigate = useNavigate();

  /** 로그인 리다이렉트 후 쿼리로 넘어온 토큰 저장 */
  useEffect(() => {
    const t = readTokensFromURL();
    if (t) {
      saveTokens(t);
      clearQueryString();
    }
  }, []);

  /** 카카오 로그인 시작 */
  const startKakaoLogin = () => {
    window.location.href = `${API_BASE_URL}/oauth2/authorization/kakao`;
  };

  return (
    <Wrapper>
      <Container>
        <LogoBox>로고/아이콘</LogoBox>
        <MainText>청년과 노인이 마음을 나누는 따뜻한 디지털 마루</MainText>

        <KakaoLoginBtn onClick={startKakaoLogin}>카카오 로그인</KakaoLoginBtn>
      </Container>
    </Wrapper>
  );
};

export default MainPage;
