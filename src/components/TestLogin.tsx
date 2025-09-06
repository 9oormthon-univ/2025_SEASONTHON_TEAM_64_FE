import React from 'react';
import styled from 'styled-components';
import { tokenManager } from '../services/authService';

const TestLogin: React.FC = () => {
  const handleTestLogin = () => {
    try {
      console.log('🧪 테스트 로그인 시작');
      
      // 유효한 더미 JWT 토큰 생성 (만료시간을 미래로 설정)
      const currentTime = Math.floor(Date.now() / 1000);
      const expirationTime = currentTime + (24 * 60 * 60); // 24시간 후 만료
      
      // JWT 헤더
      const header = {
        "alg": "HS256",
        "typ": "JWT"
      };
      
      // JWT 페이로드 (만료시간 포함)
      const payload = {
        "sub": "1",
        "name": "testuser",
        "iat": currentTime,
        "exp": expirationTime,
        "memberId": 1
      };
      
      // Base64로 인코딩 (실제 서명은 없지만 형식만 맞춤)
      const encodedHeader = btoa(JSON.stringify(header));
      const encodedPayload = btoa(JSON.stringify(payload));
      const signature = "dummy_signature_for_testing";
      
      const dummyAccessToken = `${encodedHeader}.${encodedPayload}.${signature}`;
      const dummyRefreshToken = 'dummy_refresh_token_12345';
      
      // 더미 사용자 정보
      const dummyUserInfo = {
        id: 1,
        email: 'test@example.com',
        nickname: '테스트사용자',
        profileImageURL: '/default-avatar.png'
      };
      
      // 토큰 및 사용자 정보 저장
      tokenManager.setAccessToken(dummyAccessToken);
      tokenManager.setRefreshToken(dummyRefreshToken);
      localStorage.setItem('memberId', '1');
      localStorage.setItem('userInfo', JSON.stringify(dummyUserInfo));
      
      console.log('✅ 테스트 로그인 완료:', {
        accessToken: '설정됨',
        refreshToken: '설정됨',
        memberId: '1',
        userInfo: dummyUserInfo
      });
      
      alert('테스트 로그인이 완료되었습니다! 이제 API 호출이 가능합니다.');
      
      // 홈으로 리다이렉트
      window.location.href = '/';
      
    } catch (error) {
      console.error('💥 테스트 로그인 에러:', error);
      alert('테스트 로그인에 실패했습니다.');
    }
  };

  return (
    <Container>
      <TestButton onClick={handleTestLogin}>
        🧪 테스트 로그인 (더미 토큰)
      </TestButton>
      <Description>
        실제 카카오 로그인 대신 더미 토큰으로 테스트합니다.
        <br />
        이 버튼을 클릭하면 JWT 토큰이 설정되어 API 호출이 가능해집니다.
      </Description>
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  text-align: center;
`;

const TestButton = styled.button`
  background-color: #ff6b35;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 16px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e55a2b;
  }
`;

const Description = styled.p`
  font-size: 14px;
  color: #666;
  line-height: 1.5;
  margin: 0;
`;

export default TestLogin;
