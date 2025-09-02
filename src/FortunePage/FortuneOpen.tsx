import React from 'react';
import styled from 'styled-components';
import { ArrowLeft, Bell, Star } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FortuneCookieData } from './types';

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

const UserIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

export default FortuneOpen;
