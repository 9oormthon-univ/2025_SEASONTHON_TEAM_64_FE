// src/pages/Splash.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Wrapper, Container, LogoBox } from "../Styles/Splash.Styles";

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const qs = new URLSearchParams(window.location.search);
    const access = qs.get("accessToken");
    const refresh = qs.get("refreshToken");

    if (access && refresh) {
      sessionStorage.setItem("accessToken", access);
      sessionStorage.setItem("refreshToken", refresh);

      // URL 정리 (쿼리 제거)
      window.history.replaceState(null, "", "/");

      // 로그인 성공 → 바로 마이페이지
      navigate("/mypage", { replace: true });
      return;
    }

    // 미로그인 → 0.8초 후 /main
    const timer = setTimeout(() => {
      navigate("/main", { replace: true });
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Wrapper>
      <Container>
        <LogoBox>
          <h1>스플래시</h1>
        </LogoBox>
      </Container>
    </Wrapper>
  );
}
