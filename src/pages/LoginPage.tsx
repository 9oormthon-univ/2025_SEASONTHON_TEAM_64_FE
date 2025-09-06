import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import KakaoLogin from '../components/KakaoLogin';
import TestLogin from '../components/TestLogin';
import { tokenManager } from '../services/authService';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 이미 로그인된 경우 홈으로 리다이렉트
    if (tokenManager.isTokenValid()) {
      navigate('/');
    }
  }, [navigate]);

  const handleLoginSuccess = (userInfo: any) => {
    console.log('로그인 성공:', userInfo);
    // 로그인 성공 후 홈으로 이동
    navigate('/');
  };

  const handleLoginError = (error: any) => {
    console.error('로그인 실패:', error);
    // 에러 처리 (토스트 메시지 등)
  };

  return (
    <Container>
      <LogoSection>
        <LogoImage src="/Maru_front.png" alt="마루" />
        <Title>노청마루</Title>
        <Subtitle>오늘의 시선을 공유해보세요</Subtitle>
      </LogoSection>

      <LoginSection>
        <KakaoLogin 
          onLoginSuccess={handleLoginSuccess}
          onLoginError={handleLoginError}
        />
        
        <TestLoginContainer>
          <TestLogin />
        </TestLoginContainer>
      </LoginSection>

      <FooterSection>
        <FooterText>
          로그인 시 서비스 이용약관 및 개인정보처리방침에 동의하게 됩니다.
        </FooterText>
      </FooterSection>
    </Container>
  );
};

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
  min-height: 100vh;
  background: linear-gradient(180deg, #FF6A25 0%, #FFA66F 40%, #FAFAFA 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const LogoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 80px;
`;

const LogoImage = styled.img`
  width: 120px;
  height: 120px;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  color: white;
  margin: 0 0 8px 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: white;
  margin: 0;
  opacity: 0.9;
  text-align: center;
`;

const LoginSection = styled.div`
  width: 100%;
  max-width: 300px;
  margin-bottom: 40px;
`;

const FooterSection = styled.div`
  width: 100%;
  max-width: 300px;
`;

const FooterText = styled.p`
  font-size: 12px;
  color: white;
  text-align: center;
  margin: 0;
  opacity: 0.8;
  line-height: 1.4;
`;

const TestLoginContainer = styled.div`
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
`;

export default LoginPage;
