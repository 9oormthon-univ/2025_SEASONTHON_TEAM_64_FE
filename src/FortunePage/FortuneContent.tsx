import React from 'react';
import styled from 'styled-components';
import { ArrowLeft, Bell, Star } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import type { FortuneCookieData } from './types';
import BottomNavigation from '../TodayViewFeed/BottomNavigation';

const FortuneContent: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fortuneCookie = location.state?.fortuneCookie as FortuneCookieData;

  if (!fortuneCookie) {
    navigate('/fortune');
    return null;
  }

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate('/fortune')}>
          <ArrowLeft size={24} />
        </BackButton>
        <BellIcon>
          <Bell size={24} />
        </BellIcon>
      </Header>

      <Content>
        <StarIcon>
          <Star size={80} strokeWidth={1} />
        </StarIcon>

        <FortuneMessage>
          {fortuneCookie.message}
        </FortuneMessage>
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

const StarIcon = styled.div`
  color: #333;
`;

const FortuneMessage = styled.div`
  background-color: #f8f9fa;
  border-radius: 12px;
  padding: 24px;
  font-size: 16px;
  line-height: 1.6;
  color: #333;
  text-align: center;
  max-width: 320px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

// 하단 네비게이션은 공용 컴포넌트를 사용

export default FortuneContent;
