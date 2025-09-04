import React from 'react';
import styled from 'styled-components';
import { ArrowLeft, Bell, Star } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
// 타입 전용 사용 시 런타임 번들 제거
import type { FortuneCookieData } from './types';
import BottomNavigation from '../TodayViewFeed/BottomNavigation';

const FortuneOpen: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fortuneCookie = location.state?.fortuneCookie as FortuneCookieData;

  const handleOpen = () => {
    navigate('/fortune-content', { state: { fortuneCookie } });
  };

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
        <Message>
          새로운 포춘쿠키가 도착했어요!{'\n'}열어보시겠습니까?
        </Message>

        <StarIcon>
          <Star size={80} strokeWidth={1} />
        </StarIcon>

        <OpenButton onClick={handleOpen}>
          열기
        </OpenButton>
      </Content>

      <BottomNavigation />
    </Container>
  );
};

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
  background-color: #ffffff;
  min-height: 100vh;
  position: relative;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background-color: #ffffff;
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
    background-color: #f8f9fa;
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
  gap: 32px;
  margin-top: 60px;
`;

const Message = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: #333;
  text-align: center;
  line-height: 1.5;
  white-space: pre-line;
`;

const StarIcon = styled.div`
  color: #333;
`;

const OpenButton = styled.button`
  background-color: #333;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 16px 48px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  min-width: 120px;

  &:hover {
    background-color: #555;
  }
`;

// 하단 네비게이션은 공용 컴포넌트를 사용

export default FortuneOpen;
