import React, { useState } from 'react';
import styled from 'styled-components';
import { Bell, Star, User, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getRandomFortuneCookie } from './dummyData';
import { fortuneService } from './fortuneService';
import BottomNavigation from '../TodayViewFeed/BottomNavigation';

const FortunePage: React.FC = () => {
  const navigate = useNavigate();
  
  const [message, setMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleOpenTodayFortune = () => {
    const randomFortune = getRandomFortuneCookie();
    navigate('/fortune-open', { state: { fortuneCookie: randomFortune } });
  };

  const handleSendFortune = async () => {
    if (message.trim()) {
      try {
        // 포춘쿠키 메시지 전송
        await fortuneService.sendFortuneMessage(message, '나');
        setShowToast(true);
        setMessage('');
        
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
      } catch (error) {
        console.error('포춘쿠키 전송 실패:', error);
        // 에러 처리 로직 추가 가능
      }
    }
  };

  return (
    <Container>
      <Header>
        <ProfileIcon>
          <User size={24} />
        </ProfileIcon>
        <BellIcon>
          <Bell size={24} />
        </BellIcon>
      </Header>

      <Content>
        <StarIcon>
          <Star size={80} strokeWidth={1} />
        </StarIcon>

        <FortuneButton onClick={handleOpenTodayFortune}>
          <ButtonText>오늘의 포춘쿠키</ButtonText>
          <Plus size={20} />
        </FortuneButton>

        <SendFortuneSection>
          <WriteBox>
            <WriteHeader>
              <ButtonText>포춘쿠키 전하기</ButtonText>
            </WriteHeader>

            {!isExpanded && (
              <CompactBar onClick={() => setIsExpanded(true)}>
                <UserIcon>
                  <User size={16} />
                </UserIcon>
                <Input
                  type="text"
                  placeholder="나:"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={100}
                  readOnly
                />
                <MiniSend>전송</MiniSend>
              </CompactBar>
            )}

            {isExpanded && (
              <ExpandedArea>
                <LabelRow>
                  <User size={16} />
                  <span>나:</span>
                </LabelRow>
                <TextArea
                  placeholder="따뜻한 말을 적어주세요"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={100}
                  autoFocus
                />
                <BottomRow>
                  <CharCount>{message.trim().length}/100</CharCount>
                  <SendButton onClick={handleSendFortune} disabled={!message.trim()}>
                    전달하기
                  </SendButton>
                </BottomRow>
              </ExpandedArea>
            )}
          </WriteBox>
        </SendFortuneSection>

        {showToast && (
          <ToastMessage>
            당신의 포춘쿠키가 전송되었습니다.
          </ToastMessage>
        )}
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

const ProfileIcon = styled.div`
  color: #333;
  cursor: pointer;
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

const StarIcon = styled.div`
  color: #333;
  margin-top: 40px;
`;

const FortuneButton = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: #ffffff;
  border: 2px solid #333;
  border-radius: 8px;
  padding: 16px 24px;
  cursor: pointer;
  transition: all 0.2s;
  width: 100%;
  justify-content: center;

  &:hover {
    background-color: #f8f9fa;
  }
`;

const SendFortuneSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

const WriteBox = styled.div`
  width: 100%;
  border: 2px solid #333;
  border-radius: 12px;
  background-color: #ffffff;
  overflow: hidden;
`;

const WriteHeader = styled.div`
  padding: 14px 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #e9ecef;
`;

const ButtonText = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #333;
`;

const CompactBar = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #f8f9fa;
  padding: 12px 16px;
  cursor: text;
`;

const UserIcon = styled.div`
  color: #666;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  background: none;
  outline: none;
  font-size: 14px;
  color: #333;

  &::placeholder {
    color: #999;
  }
`;

const MiniSend = styled.div`
  background-color: #111;
  color: white;
  border-radius: 999px;
  padding: 4px 10px;
  font-size: 12px;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 180px;
  background-color: #f8f9fa;
  border: none;
  outline: none;
  resize: none;
  padding: 14px 16px;
  font-size: 14px;
  line-height: 1.5;
  color: #333;
`;

const ExpandedArea = styled.div`
  padding: 12px 12px 16px 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const LabelRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: #666;
  padding: 0 4px;
`;

const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 4px;
`;

const CharCount = styled.span`
  font-size: 12px;
  color: #888;
`;

const SendButton = styled.button`
  background-color: #333;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #555;
  }
  &:disabled {
    background-color: #bbb;
    cursor: not-allowed;
  }
`;

const ToastMessage = styled.div`
  position: fixed;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  z-index: 1000;
`;


export default FortunePage;
