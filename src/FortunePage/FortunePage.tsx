import React from 'react';
import styled from 'styled-components';
import { Bell, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { fortuneService } from './fortuneService';
import BottomNavigation from '../components/BottomNavigation';

const FortunePage: React.FC = () => {
  const navigate = useNavigate();

  const handleOpenTodayFortune = async () => {
    console.log('🎲 포춘쿠키 열기 시작');
    try {
      const opened = await fortuneService.openFortune();
      console.log('✅ 포춘쿠키 열기 성공:', opened);
      navigate('/fortune-content', { state: { fortuneCookie: { id: opened.id, message: opened.description, category: '' } } });
    } catch (error: any) {
      console.error('❌ 포춘쿠키 열기 실패:', error);
      
      // 사용자에게 친화적인 메시지 표시
      if (error.response?.status === 400) {
        alert('오늘 이미 포춘쿠키를 열어보셨거나 열 수 있는 포춘쿠키가 없습니다.');
      } else if (error.response?.status === 404) {
        alert('포춘쿠키 서비스에 일시적인 문제가 발생했습니다. 다시 시도해주세요.');
      } else {
        alert('포춘쿠키 열기에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  const handleSendFortune = () => {
    navigate('/message-write');
  };

  // 운세 페이지에서는 플러스 버튼을 노출하지 않습니다.

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate(-1)}>
          <ArrowLeft size={24} />
        </BackButton>
        <BellIcon>
          <Bell size={24} />
        </BellIcon>
      </Header>

      <Content>
        <TopCookie>
          <img src="/Fortune_cookie.svg" alt="포춘쿠키" />
        </TopCookie>

        <ButtonsArea>
          <img
            src="/Fortune_butoon1.svg"
            alt="오늘의 포춘쿠키 보러가기"
            onClick={handleOpenTodayFortune}
          />
          <img
            src="/Fortune_butoon2.svg"
            alt="포춘쿠키 전하기"
            onClick={handleSendFortune}
          />
        </ButtonsArea>


      </Content>
      <BottomNavigation />
    </Container>
  );
};

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
  min-height: 100vh;
  position: relative;
  background: linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 60%, rgba(255,106,37,0.12) 90%, rgba(255,106,37,0) 100%);
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background-color: transparent;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: #333;
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const BellIcon = styled.div`
  color: #333;
  cursor: pointer;
`;

const Content = styled.main`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

const TopCookie = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: center;
  width: 100%;

  img {
    width: 180px;
    height: auto;
    display: block;
  }
`;

const ButtonsArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 8px;

  img {
    width: 100%;
    height: auto;
    display: block;
    cursor: pointer;
  }
`;

// 운세 페이지에서는 플로팅 버튼 스타일도 사용하지 않음



export default FortunePage;
