import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Wrapper, Container, LogoBox } from "../Styles/Splash.Styles";

/** 단순 스플래시: 일정 시간 후 메인으로 이동 */
const Splash: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => navigate("/MainPage"), 1200);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <Wrapper>
      <Container>
        <LogoBox>로고/아이콘</LogoBox>
      </Container>
    </Wrapper>
  );
};

export default Splash;
