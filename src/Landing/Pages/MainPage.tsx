import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../auth/token";
import { Wrapper, Container, LogoBox, MainText, LoginBtn, LoginText,BottomImgBox } from "../Styles/MainPage.Styles";
import { TalkIcon } from "../../Styles/Icons/TalkIcon";
import { LogoTextOrangeImg, CapCharacterImg, ScarfCharacterImg } from "../../Styles/Image/Imges";

const KAKAO_AUTH_URL = `https://api.planhub.site/oauth2/authorization/kakao`;

export default function MainPage() {
  const navigate = useNavigate();

  const handleKakaoLogin = useCallback(() => {
    if (isAuthenticated()) {
      navigate("/feed", { replace: true });
      return;
    }
    window.location.href = KAKAO_AUTH_URL;
  }, [navigate]);

  return (
    <Wrapper>
      <Container>
        <LogoBox><LogoTextOrangeImg/></LogoBox>
        <MainText>청년과 노인이 마음을 나누는<br/> 따뜻한 디지털 마루</MainText>

        <LoginBtn onClick={handleKakaoLogin}>
          <TalkIcon />
          <LoginText>카카오 로그인</LoginText>
        </LoginBtn>
        <BottomImgBox>
        <CapCharacterImg />
        <ScarfCharacterImg />
        </BottomImgBox>
      </Container>
    </Wrapper>
  );
}