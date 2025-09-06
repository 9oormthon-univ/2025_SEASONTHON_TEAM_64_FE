import React from 'react';
import * as S from './index.styles';

import Back from './assets/BackIcon.svg';
import Notify from './assets/notify.svg';
import FortuneCookie from './assets/fortuneCookie.svg';
import receiver from './assets/receiver.svg';
import sender from './assets/sender.svg';
import { useNavigate } from 'react-router-dom';

const Fortune = () => {
  const navigate = useNavigate();

  return (
    <S.Container>
      <S.Header>
        <img src={Back} onClick={() => navigate(-1)} />
        <img src={Notify} />
      </S.Header>
      <S.FortuneCookieImage src={FortuneCookie} />
      <S.ButtonImage src={receiver} onClick={() => navigate('/fortune/open')} />
      <S.ButtonImage
        src={sender}
        onClick={() => navigate('/fortune/generate')}
      />
    </S.Container>
  );
};

export default Fortune;
