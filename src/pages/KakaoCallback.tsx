import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { tokenManager } from '../services/authService';

const KakaoCallback: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    handleKakaoCallback();
  }, []);

  const handleKakaoCallback = async () => {
    try {
      console.log('🔄 카카오 로그인 콜백 처리 시작');
      
      // URL에서 토큰 정보 추출
      const accessToken = searchParams.get('accessToken');
      const refreshToken = searchParams.get('refreshToken');
      const memberId = searchParams.get('memberId');
      const nickname = searchParams.get('nickname');
      const email = searchParams.get('email');
      
      console.log('📋 콜백 파라미터:', {
        accessToken: accessToken ? '존재' : '없음',
        refreshToken: refreshToken ? '존재' : '없음',
        memberId,
        nickname,
        email
      });

      if (!accessToken || !refreshToken || !memberId) {
        throw new Error('필수 토큰 정보가 없습니다.');
      }

      // 토큰 저장
      tokenManager.setAccessToken(accessToken);
      tokenManager.setRefreshToken(refreshToken);
      localStorage.setItem('memberId', memberId);

      // 사용자 정보 저장
      if (nickname && email) {
        const userInfo = {
          id: parseInt(memberId),
          email,
          nickname,
          profileImageURL: '/default-avatar.png'
        };
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        console.log('👤 사용자 정보 저장 완료:', userInfo);
      }

      console.log('✅ 카카오 로그인 성공');
      setStatus('success');
      setMessage('로그인이 완료되었습니다!');

      // 2초 후 홈으로 이동
      setTimeout(() => {
        navigate('/');
      }, 2000);

    } catch (error) {
      console.error('💥 카카오 로그인 콜백 에러:', error);
      setStatus('error');
      setMessage('로그인에 실패했습니다. 다시 시도해주세요.');
      
      // 3초 후 로그인 페이지로 이동
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    }
  };

  return (
    <Container>
      <Content>
        {status === 'loading' && (
          <>
            <Spinner />
            <Message>로그인 처리 중...</Message>
          </>
        )}
        
        {status === 'success' && (
          <>
            <SuccessIcon>✅</SuccessIcon>
            <Message>{message}</Message>
            <SubMessage>잠시 후 홈으로 이동합니다.</SubMessage>
          </>
        )}
        
        {status === 'error' && (
          <>
            <ErrorIcon>❌</ErrorIcon>
            <Message>{message}</Message>
            <SubMessage>잠시 후 로그인 페이지로 이동합니다.</SubMessage>
          </>
        )}
      </Content>
    </Container>
  );
};

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
  min-height: 100vh;
  background: linear-gradient(180deg, #FF6A25 0%, #FFA66F 40%, #FAFAFA 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
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

const SuccessIcon = styled.div`
  font-size: 48px;
  margin-bottom: 20px;
`;

const ErrorIcon = styled.div`
  font-size: 48px;
  margin-bottom: 20px;
`;

const Message = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: white;
  margin: 0 0 10px 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SubMessage = styled.p`
  font-size: 16px;
  color: white;
  margin: 0;
  opacity: 0.9;
`;

export default KakaoCallback;
