import React from 'react';
import styled from 'styled-components';

const SessionTokenTest: React.FC = () => {
  const handleSetTestToken = () => {
    try {
      // 테스트용 더미 액세스 토큰 설정
      const dummyAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibmFtZSI6InRlc3R1c2VyIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE3MTYyNDI2MjJ9.dummy_signature_for_testing';
      const dummyRefreshToken = 'dummy_refresh_token_12345';
      
      // 세션스토리지에 저장
      sessionStorage.setItem('accessToken', dummyAccessToken);
      sessionStorage.setItem('refreshToken', dummyRefreshToken);
      
      console.log('✅ 테스트 토큰 설정 완료:', {
        accessToken: '설정됨',
        refreshToken: '설정됨'
      });
      
      alert('테스트 토큰이 설정되었습니다! 이제 API 호출이 가능합니다.');
      
      // 페이지 새로고침
      window.location.reload();
      
    } catch (error) {
      console.error('💥 테스트 토큰 설정 에러:', error);
      alert('테스트 토큰 설정에 실패했습니다.');
    }
  };

  const handleClearToken = () => {
    try {
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('refreshToken');
      
      console.log('🗑️ 토큰 삭제 완료');
      alert('토큰이 삭제되었습니다.');
      
      // 페이지 새로고침
      window.location.reload();
      
    } catch (error) {
      console.error('💥 토큰 삭제 에러:', error);
      alert('토큰 삭제에 실패했습니다.');
    }
  };

  const handleCheckToken = () => {
    const accessToken = sessionStorage.getItem('accessToken');
    const refreshToken = sessionStorage.getItem('refreshToken');
    
    console.log('🔍 현재 토큰 상태:', {
      accessToken: accessToken ? '존재' : '없음',
      refreshToken: refreshToken ? '존재' : '없음'
    });
    
    alert(`현재 토큰 상태:\n액세스 토큰: ${accessToken ? '존재' : '없음'}\n리프레시 토큰: ${refreshToken ? '존재' : '없음'}`);
  };

  return (
    <Container>
      <Title>🧪 세션 토큰 테스트</Title>
      <Description>
        팀원 요청에 따라 세션스토리지에 액세스토큰을 임의로 넣어서 테스트할 수 있습니다.
      </Description>
      
      <ButtonGroup>
        <TestButton onClick={handleSetTestToken}>
          🔑 테스트 토큰 설정
        </TestButton>
        
        <TestButton onClick={handleCheckToken}>
          🔍 토큰 상태 확인
        </TestButton>
        
        <ClearButton onClick={handleClearToken}>
          🗑️ 토큰 삭제
        </ClearButton>
      </ButtonGroup>
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  text-align: center;
  background-color: #f8f9fa;
  border-radius: 8px;
  margin: 20px;
`;

const Title = styled.h3`
  margin: 0 0 10px 0;
  color: #333;
`;

const Description = styled.p`
  margin: 0 0 20px 0;
  color: #666;
  font-size: 14px;
  line-height: 1.5;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TestButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }
`;

const ClearButton = styled(TestButton)`
  background-color: #dc3545;

  &:hover {
    background-color: #c82333;
  }
`;

export default SessionTokenTest;
