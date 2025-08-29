import React, { useEffect } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Container>
          <LogoBox>로고/아이콘</LogoBox>
          <MainText>메인 페이지</MainText>
          <KakaoLoginBtn>카카오 로그인</KakaoLoginBtn>
      </Container>
    </Wrapper>
  );
};
export default MainPage;

// styled-components -----------------
const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f9f9f9;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  max-width: 375px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  border-radius: 50px;
`;

const LogoBox = styled.div`
  width: 150px;
  height: 150px;
  background-color: #bbb;
  border-radius: 85px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
`;
const MainText = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin: 18px 0 20px 0;
`;
const KakaoLoginBtn = styled.button`
  width: 338px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border: 2px solid #222;
  border-radius: 10px;
  font-size: 18px;
  font-weight: 500;
  color: #222;
  cursor: pointer;
  margin: 0 auto;
  &:hover {
    background: #f5f5f5;
  }
`;