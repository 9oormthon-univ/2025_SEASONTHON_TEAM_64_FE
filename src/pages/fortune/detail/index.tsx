import React from 'react';
import * as S from './index.styles';
import back from '../../../assets/fortune/left-arrow.svg';
import cookie from '../../../assets/gif/fortune_content.gif';
import { useLocation, useNavigate } from 'react-router-dom';

const FortuneDetail = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  return (
    <S.Container>
      <S.Header>
        <img src={back} alt="back" onClick={() => navigate('/fortune')} />
      </S.Header>
      <S.Image src={cookie} alt="fortune cookie" />
      <S.FortuneDescription>{state?.fortune}</S.FortuneDescription>
    </S.Container>
  );
};

export default FortuneDetail;
