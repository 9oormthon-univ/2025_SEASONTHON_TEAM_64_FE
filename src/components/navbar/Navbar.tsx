import React from 'react';
import * as S from './Navbar.styles';
import HomeOn from '../../assets/components/navbar/HomeOn.svg';
import HomeOff from '../../assets/components/navbar/HomeOff.svg';
import InfoOn from '../../assets/components/navbar/InfoOn.svg';
import InfoOff from '../../assets/components/navbar/InfoOff.svg';
import FortuneIconOn from '../../assets/components/navbar/FortuneIconOn.svg';
import FortuneIconOff from '../../assets/components/navbar/FortuneIconOff.svg';
import MyOn from '../../assets/components/navbar/MyOn.svg';
import MyOff from '../../assets/components/navbar/MyOff.svg';
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return (
      location.pathname === path || location.pathname.startsWith(`${path}/`)
    );
  };

  return (
    <S.NavContainer>
      <S.NavItem $isActive={isActive('/')} onClick={() => navigate('/')}>
        <S.NavIcon
          $src={isActive('/') ? HomeOn : HomeOff}
          $active={isActive('/')}
        />
        <S.NavLabel $isActive={isActive('/')}>홈</S.NavLabel>
      </S.NavItem>
      <S.NavItem
        $isActive={isActive('/info')}
        onClick={() => navigate('/info')}
      >
        <S.NavIcon
          $src={isActive('/info') ? InfoOn : InfoOff}
          $active={isActive('/info')}
        />
        <S.NavLabel $isActive={isActive('/info')}>정보</S.NavLabel>
      </S.NavItem>
      <S.NavItem
        $isActive={isActive('/fortune')}
        onClick={() => navigate('/fortune')}
      >
        <S.NavIcon
          $src={isActive('/fortune') ? FortuneIconOn : FortuneIconOff}
          $active={isActive('/fortune')}
        />
        <S.NavLabel $isActive={isActive('/fortune')}>포춘쿠키</S.NavLabel>
      </S.NavItem>
      <S.NavItem
        $isActive={isActive('/my-page')}
        onClick={() => navigate('/my-page')}
      >
        <S.NavIcon
          $src={isActive('/my-page') ? MyOn : MyOff}
          $active={isActive('/my-page')}
        />
        <S.NavLabel $isActive={isActive('/my-page')}>마이페이지</S.NavLabel>
      </S.NavItem>
    </S.NavContainer>
  );
};

export default Navbar;
