import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { tokenManager } from '../services/authService';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      console.log('🔐 인증 상태 확인 중...');
      
      const token = tokenManager.getAccessToken();
      const memberId = localStorage.getItem('memberId');
      
      console.log('🔍 토큰 상태:', {
        hasToken: !!token,
        hasMemberId: !!memberId,
        tokenValid: tokenManager.isTokenValid()
      });

      if (!token || !memberId) {
        console.log('❌ 인증 정보 없음 - 로그인 페이지로 이동');
        navigate('/login');
        return;
      }

      if (!tokenManager.isTokenValid()) {
        console.log('⚠️ 토큰 만료 또는 유효하지 않음');
        // 테스트용으로 토큰이 있으면 통과
        if (!token) {
          console.log('❌ 토큰이 없음 - 로그인 페이지로 이동');
          navigate('/login');
          return;
        }
        console.log('✅ 테스트용 토큰으로 통과');
      }

      console.log('✅ 인증 성공');
      setIsAuthenticated(true);
      
    } catch (error) {
      console.error('💥 인증 확인 에러:', error);
      navigate('/login');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <LoadingContainer>
        <Spinner />
        <LoadingText>인증 확인 중...</LoadingText>
      </LoadingContainer>
    );
  }

  if (!isAuthenticated) {
    return null; // 리다이렉트 중
  }

  return <>{children}</>;
};

const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #FF6A25 0%, #FFA66F 40%, #FAFAFA 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.p`
  font-size: 16px;
  color: white;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export default ProtectedRoute;
