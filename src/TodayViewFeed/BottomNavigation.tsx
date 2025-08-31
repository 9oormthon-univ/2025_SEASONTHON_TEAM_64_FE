import React from 'react';
import styled from 'styled-components';
import { Home, Star, Search, User } from 'lucide-react';

const BottomNavigation: React.FC = () => {
  return (
    <NavContainer>
      <NavItem $isActive={true}>
        <Home size={24} />
        <NavLabel>홈</NavLabel>
      </NavItem>
      <NavItem $isActive={false}>
        <Star size={24} />
        <NavLabel>즐겨찾기</NavLabel>
      </NavItem>
      <NavItem $isActive={false}>
        <Search size={24} />
        <NavLabel>검색</NavLabel>
      </NavItem>
      <NavItem $isActive={false}>
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

