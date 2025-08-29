import React, { useEffect } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      const token = localStorage.getItem("token");
      if (token) {
        navigate("/MainPage");
      } else {
        navigate("/MainPage");
      }
    }, 2500);

    return () => clearTimeout(timer);
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