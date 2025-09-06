import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ArrowLeft, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { fortuneService } from './fortuneService';
import BottomNavigation from '../components/BottomNavigation';

const FortuneNotification: React.FC = () => {
  const navigate = useNavigate();
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    // 페이지 로드 후 애니메이션 시작
    const timer = setTimeout(() => {
      setShowAnimation(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  const handleOpenFortune = async () => {
    console.log('🎲 포춘쿠키 열기 시작');
    try {
      const opened = await fortuneService.openFortune();
      console.log('✅ 포춘쿠키 열기 성공:', opened);
      navigate('/fortune-open', { state: { fortuneCookie: { id: opened.id, message: opened.description, category: '' } } });
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

  const handleBack = () => {
    navigate('/fortune');
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={handleBack}>
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

        <OpenButton onClick={handleOpenFortune}>
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
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const BellIcon = styled.div`
  color: #333;
  cursor: pointer;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: -2px;
    right: -2px;
    width: 8px;
    height: 8px;
    background-color: #FF6A25;
    border-radius: 50%;
  }
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
  font-size: 12px;
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
  padding: 12px 180px;
  font-size: 18px;
  margin-top: 240px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  min-width: 120px;

  &:hover {
    background-color: #ff7f47;
  }
`;

export default FortuneNotification;
