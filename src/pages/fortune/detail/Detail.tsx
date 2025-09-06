import React from 'react';
import * as S from './Detail.style';
import Back from '../assets/BackIcon.svg';
import Notify from '../assets/notify.svg';
import FortuneMove from '../assets/FortuneMove2.webm';
import { useNavigate } from 'react-router-dom';
import { useApiQuery } from '../../../apis/config/builder/ApiBuilder';
import { getFortune } from '../../../apis/fortune';

const Detail = () => {
  const navigate = useNavigate();
  const { data: fortune } = useApiQuery(getFortune(), ['fortune']);

  return (
    <>
      <S.Container>
        <S.Header>
          <img src={Back} onClick={() => navigate('/fortune')} />
          <img src={Notify} />
        </S.Header>
        <S.SuccessVideo src={FortuneMove} autoPlay muted playsInline />
        <S.FortuneBox>{fortune?.description}</S.FortuneBox>
      </S.Container>
    </>
  );
};

export default Detail;
