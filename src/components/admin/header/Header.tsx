import React from 'react';
import * as S from './Header.styles';
import back from '../../../assets/admin/left-arrow.svg';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <>
      <S.HeaderWrapper>
        <S.HeaderIcon src={back} alt="뒤로가기" onClick={() => navigate(-1)} />
        <S.HeaderText>등록미션 리스트</S.HeaderText>
      </S.HeaderWrapper>
    </>
  );
};

export default Header;
