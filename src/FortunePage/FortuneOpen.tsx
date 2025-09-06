import React from 'react';
import styled from 'styled-components';
import { ArrowLeft, Bell } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
// 타입 전용 사용 시 런타임 번들 제거
import type { FortuneCookieData } from './types';
import BottomNavigation from '../components/BottomNavigation';

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
          새로운 <OrangeText>포춘쿠키</OrangeText>가 도착했어요!{'\n'}열어보시겠습니까?
        </Message>

        <VideoContainer>
          <VideoPlayer
            src="/FortuneMove1.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
          <VideoOverlay>
            <VideoText>포춘무브1</VideoText>
          </VideoOverlay>
        </VideoContainer>

        <OpenButton onClick={handleOpen}>
          받기
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

const OrangeText = styled.span`
  color: #FF6A25;
`;

const VideoContainer = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

const VideoPlayer = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
`;

const VideoOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  padding: 16px 8px 8px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const VideoText = styled.div`
  font-size: 14px;
  color: white;
  text-align: center;
  font-weight: 500;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
`;

const OpenButton = styled.button`
  background-color: #FF6A25;
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
    background-color: #ff7f47;
  }
`;

// 하단 네비게이션은 공용 컴포넌트를 사용

export default FortuneOpen;
