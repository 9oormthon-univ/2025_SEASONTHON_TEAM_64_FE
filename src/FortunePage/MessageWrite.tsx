import React, { useState } from 'react';
import styled from 'styled-components';
import { ArrowLeft, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { fortuneService } from './fortuneService';
import BottomNavigation from '../components/BottomNavigation';

const MessageWrite: React.FC = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleSend = async () => {
    if (message.trim()) {
      console.log('📤 포춘쿠키 전송 시작:', message);
      try {
        const result = await fortuneService.sendFortune(undefined, message);
        console.log('✅ 포춘쿠키 전송 성공:', result);
        setShowToast(true);
        setMessage('');
        
        setTimeout(() => {
          setShowToast(false);
          navigate('/fortune');
        }, 2000);
      } catch (error) {
        console.error('❌ 포춘쿠키 전송 실패:', error);
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
        <MessagePrompt>
          누군가를 위한 <OrangeText>따뜻한 말</OrangeText>을 전해봐요.
        </MessagePrompt>

        <MessageInput>
          <TextArea 
            placeholder="내용을 입력하세요." 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={100}
          />
          <CharacterCount>{message.length}/100</CharacterCount>
        </MessageInput>

        {isMessageValid && (
          <SendButton onClick={handleSend}>
            전달하기
          </SendButton>
        )}

        {showToast && (
          <CompletionOverlay>
            <img src="/Fortune_Completion.svg" alt="전송 완료" />
          </CompletionOverlay>
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
  gap: 24px;
  margin-top: 40px;
`;

const MessagePrompt = styled.div`
  font-size: 18px;
  color: #333;
  text-align: center;
  line-height: 1.5;
  margin-bottom: 20px;
`;

const OrangeText = styled.span`
  color: #FF6A25;
`;

const MessageInput = styled.div`
  position: relative;
  width: 100%;
  background-color: #ffffff;
  border-radius: 12px;
  padding: 16px;
  border: 1px solid #e9ecef;
  margin-bottom: 20px;
`;

const TextArea = styled.textarea`
  width: 100%;
  border: none;
  background: none;
  outline: none;
  font-size: 14px;
  color: #333;
  resize: none;
  min-height: 100px;
  font-family: inherit;

  &::placeholder {
    color: #999;
  }
`;

const CharacterCount = styled.div`
  position: absolute;
  right: 16px;
  bottom: 16px;
  font-size: 12px;
  color: #999;
`;

const SendButton = styled.button`
  background-color: #FF6A25;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 16px 48px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  width: 100%;

  &:hover {
    background-color: #ff7f47;
  }
`;

const CompletionOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(22, 22, 22, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  img {
    width: 80%;
    max-width: 360px;
    height: auto;
    display: block;
  }
`;

export default MessageWrite;
