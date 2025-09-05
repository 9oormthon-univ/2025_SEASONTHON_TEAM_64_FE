import React from 'react';
import styled from 'styled-components';
import { Bell, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getRandomFortuneCookie } from './dummyData';
import BottomNavigation from '../TodayViewFeed/BottomNavigation';

const FortunePage: React.FC = () => {
  const navigate = useNavigate();

  const handleOpenTodayFortune = () => {
    const randomFortune = getRandomFortuneCookie();
    navigate('/fortune-open', { state: { fortuneCookie: randomFortune } });
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
          <img src="/Fortune_Cookie.svg" alt="포춘쿠키" />
        </TopCookie>

        <ButtonsArea>
          <img
            src="/Fortune_Butoon1.svg"
            alt="오늘의 포춘쿠키 보러가기"
            onClick={handleOpenTodayFortune}
          />
          <img
            src="/Fortune_Butoon2.svg"
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
