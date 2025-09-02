import React, { useState } from 'react';
import styled from 'styled-components';
import { ArrowLeft, Bell, Star, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { fortuneService } from './fortuneService';

const MessageWrite: React.FC = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleSend = async () => {
    if (message.trim()) {
      try {
        // 포춘쿠키 메시지 전송
        await fortuneService.sendFortuneMessage(message, '나');
        setShowToast(true);
        setMessage('');
        
        setTimeout(() => {
          setShowToast(false);
          navigate('/fortune');
        }, 2000);
      } catch (error) {
        console.error('포춘쿠키 전송 실패:', error);
        // 에러 처리 로직 추가 가능
      }
    }
  };

  const isMessageValid = message.trim().length > 0;

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

        <MessagePrompt>
          누군가를 위한 따뜻한 말을 전해봐요.
        </MessagePrompt>

        <MessageInput>
          <UserIcon>
            <User size={16} />
          </UserIcon>
          <Input 
            type="text" 
            placeholder="나:" 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={100}
          />
          <CharacterCount>{message.length}/100</CharacterCount>
        </MessageInput>

        <SendButton 
          onClick={handleSend}
          disabled={!isMessageValid}
          $isValid={isMessageValid}
        >
          전달하기
        </SendButton>

        {showToast && (
          <ToastMessage>
            당신의 포춘쿠키가 전송되었습니다.
          </ToastMessage>
        )}
      </Content>

      <NavigationBar>
        <NavItem>
          <HomeIcon size={24} />
        </NavItem>
        <NavItem $active={true}>
          <Star size={24} fill="currentColor" />
        </NavItem>
        <NavItem>
          <SearchIcon size={24} />
        </NavItem>
        <NavItem>
          <UserIcon size={24} />
        </NavItem>
      </NavigationBar>
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
  gap: 24px;
  margin-top: 40px;
`;

const StarIcon = styled.div`
  color: #333;
`;

const MessagePrompt = styled.div`
  font-size: 16px;
  color: #333;
  text-align: center;
  line-height: 1.5;
`;

const MessageInput = styled.div`
  position: relative;
  width: 100%;
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 16px;
  border: 2px solid transparent;
  transition: border-color 0.2s;

  &:focus-within {
    border-color: #333;
  }
`;

const UserIcon = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
`;

const Input = styled.input`
  width: 100%;
  border: none;
  background: none;
  outline: none;
  font-size: 14px;
  color: #333;
  padding-left: 32px;
  padding-right: 60px;

  &::placeholder {
    color: #999;
  }
`;

const CharacterCount = styled.div`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 12px;
  color: #999;
`;

const SendButton = styled.button<{ $isValid: boolean }>`
  background-color: ${props => props.$isValid ? '#333' : '#ccc'};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 16px 48px;
  font-size: 18px;
  font-weight: 600;
  cursor: ${props => props.$isValid ? 'pointer' : 'not-allowed'};
  transition: all 0.2s;
  min-width: 120px;

  &:hover {
    background-color: ${props => props.$isValid ? '#555' : '#ccc'};
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

const NavigationBar = styled.nav`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  background-color: #ffffff;
  border-top: 1px solid #e9ecef;
  border-radius: 20px 20px 0 0;
  padding: 16px 32px;
  gap: 48px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
`;

const NavItem = styled.div<{ $active?: boolean }>`
  color: ${props => props.$active ? '#ff6b6b' : '#666'};
  cursor: pointer;
  transition: color 0.2s;
`;

// 아이콘 컴포넌트들
const HomeIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9,22 9,12 15,12 15,22"/>
  </svg>
);

const SearchIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"/>
    <path d="m21 21-4.35-4.35"/>
  </svg>
);

export default MessageWrite;
