import React from 'react';
import styled from 'styled-components';

interface KakaoLoginProps {
  onLoginSuccess?: (userInfo: any) => void;
  onLoginError?: (error: any) => void;
}

const KakaoLogin: React.FC<KakaoLoginProps> = ({ onLoginSuccess, onLoginError }) => {
  const handleKakaoLogin = () => {
    try {
      // 카카오 소셜 로그인 URL로 리다이렉트
      const kakaoOAuthUrl = 'https://api.planhub.site/oauth2/authorization/kakao';
      console.log('🔗 카카오 로그인 URL:', kakaoOAuthUrl);
      
      // 현재 도메인을 콜백 URL로 설정
      const callbackUrl = `${window.location.origin}/auth/kakao/callback`;
      const fullUrl = `${kakaoOAuthUrl}?redirect_uri=${encodeURIComponent(callbackUrl)}`;
      
      console.log('🚀 카카오 로그인 리다이렉트:', fullUrl);
      window.location.href = fullUrl;
      
    } catch (error) {
      console.error('💥 카카오 로그인 오류:', error);
      onLoginError?.(error);
    }
  };

  return (
    <LoginContainer>
      <KakaoButton onClick={handleKakaoLogin}>
        <KakaoIcon>
          <KakaoSymbol>💬</KakaoSymbol>
        </KakaoIcon>
        <KakaoText>카카오로 시작하기</KakaoText>
      </KakaoButton>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const KakaoButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  max-width: 300px;
  height: 50px;
  background-color: #FEE500;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #FFE55C;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }
`;

const KakaoIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const KakaoSymbol = styled.span`
  font-size: 20px;
`;

const KakaoText = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #000000;
`;

export default KakaoLogin;
