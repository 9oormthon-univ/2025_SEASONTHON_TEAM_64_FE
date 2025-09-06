import React from 'react';
import styled from 'styled-components';
import { Home, Star, Search, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/feed') {
      return location.pathname === '/feed' || location.pathname.startsWith('/feed-detail') || location.pathname.startsWith('/mission');
    }
    if (path === '/local-info-share') {
      return location.pathname.startsWith('/local-info-share') || location.pathname.startsWith('/local-info-form') || location.pathname.startsWith('/local-info-address') || location.pathname.startsWith('/local-info-map');
    }
    if (path === '/fortune') {
      return location.pathname.startsWith('/fortune') || location.pathname.startsWith('/fortune-content') || location.pathname.startsWith('/message-write');
    }
    if (path === '/mypage') {
      return location.pathname.startsWith('/mypage') || location.pathname.startsWith('/cookie-detail');
    }
    return location.pathname.startsWith(path);
  };

  return (
    <NavContainer>
      <NavItem 
        $isActive={isActive('/feed')}
        onClick={() => navigate('/feed')}
      >
        <Home size={24} />
        <NavLabel>내 피드</NavLabel>
      </NavItem>
      <NavItem 
        $isActive={isActive('/local-info-share')}
        onClick={() => navigate('/local-info-share')}
      >
        <Search size={24} />
        <NavLabel>지역정보</NavLabel>
      </NavItem>
      <NavItem 
        $isActive={isActive('/fortune')}
        onClick={() => navigate('/fortune')}
      >
        <Star size={24} />
        <NavLabel>포춘쿠키</NavLabel>
      </NavItem>
      <NavItem 
        $isActive={isActive('/mypage')}
        onClick={() => navigate('/mypage')}
      >
        <User size={24} />
        <NavLabel>프로필</NavLabel>
      </NavItem>
    </NavContainer>
  );
};

const NavContainer = styled.nav`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 480px;
  background-color: #ffffff;
  border-top: 1px solid #e9ecef;
  display: flex;
  justify-content: space-around;
  padding: 8px 0;
  z-index: 100;
`;

const NavItem = styled.div<{ $isActive: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 8px;
  cursor: pointer;
  color: ${props => props.$isActive ? '#007bff' : '#666'};
  transition: color 0.2s;

  &:hover {
    color: ${props => props.$isActive ? '#007bff' : '#333'};
  }
`;

const NavLabel = styled.span`
  font-size: 12px;
  font-weight: 500;
`;

export default BottomNavigation;
