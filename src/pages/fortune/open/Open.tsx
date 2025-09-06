import React from 'react';
import * as S from './Open.style';
import Back from '../assets/BackIcon.svg';
import Notify from '../assets/notify.svg';
import FortuneMove from '../assets/FortuneMove1.webm';
import { useNavigate } from 'react-router-dom';

const Open = () => {
  const navigate = useNavigate();

  return (
    <>
      <S.Container>
        <S.Header>
          <img src={Back} alt="Back" onClick={() => navigate(-1)} />
          <img src={Notify} alt="Notify" />
        </S.Header>
        <S.SuccessText>
          새로운 <span>포춘쿠키</span>가 도착했어요!
          <br /> 열어보시겠습니까? “
        </S.SuccessText>
        <S.SuccessVideo src={FortuneMove} autoPlay muted playsInline />
        <S.Button onClick={() => navigate('/fortune/detail')}>받기</S.Button>
      </S.Container>
    </>
  );
};

export default Open;
