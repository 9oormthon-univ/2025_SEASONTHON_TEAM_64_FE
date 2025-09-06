import React from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import HomeOn from '../assets/HomeOn.svg';
import HomeOff from '../assets/HomeOff.svg';
import InfoOn from '../assets/InfoOn.svg';
import InfoOff from '../assets/InfoOff.svg';
import FortuneIconOn from '../assets/FortuneIconOn.svg';
import FortuneIconOff from '../assets/FortuneIconOff.svg';
import MyOn from '../assets/MyOn.svg';
import MyOff from '../assets/MyOff.svg';

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
        <NavIcon 
          $src={isActive('/feed') ? HomeOn : HomeOff}
          $active={isActive('/feed')}
        />
        <NavLabel $isActive={isActive('/feed')}>홈</NavLabel>
      </NavItem>
      <NavItem 
        $isActive={isActive('/local-info-share')}
        onClick={() => navigate('/local-info-share')}
      >
        <NavIcon 
          $src={isActive('/local-info-share') ? InfoOn : InfoOff}
          $active={isActive('/local-info-share')}
        />
        <NavLabel $isActive={isActive('/local-info-share')}>정보</NavLabel>
      </NavItem>
      <NavItem 
        $isActive={isActive('/fortune')}
        onClick={() => navigate('/fortune')}
      >
        <NavIcon 
          $src={isActive('/fortune') ? FortuneIconOn : FortuneIconOff}
          $active={isActive('/fortune')}
        />
        <NavLabel $isActive={isActive('/fortune')}>포춘쿠키</NavLabel>
      </NavItem>
      <NavItem 
        $isActive={isActive('/mypage')}
        onClick={() => navigate('/mypage')}
      >
        <NavIcon 
          $src={isActive('/mypage') ? MyOn : MyOff}
          $active={isActive('/mypage')}
        />
        <NavLabel $isActive={isActive('/mypage')}>마이페이지</NavLabel>
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
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  display: flex;
  justify-content: space-around;
  padding: 8px 0;
  z-index: 100;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
`;

const NavItem = styled.div<{ $isActive: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const NavLabel = styled.span<{ $isActive?: boolean }>`
  font-size: 12px;
  font-weight: 500;
  color: ${({ $isActive }) => ($isActive ? "#FB6767" : "gray")};
`;

/* === 네비게이션 아이콘 === */
const NavIcon = styled.div<{ $src: string; $active?: boolean }>`
  width: 32px;
  height: 32px;
  background-image: url("${({ $src }) => $src}");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  transition: all 0.2s;
`;


export default BottomNavigation;
