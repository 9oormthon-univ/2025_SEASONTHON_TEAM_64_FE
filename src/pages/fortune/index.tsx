import React from 'react';
import * as S from './index.styles';
import { useNavigate } from 'react-router-dom';

import fortuneCookie from '../../assets/fortune/fortune.svg';
import receiver from '../../assets/fortune/receiver.svg';
import sender from '../../assets/fortune/sender.svg';
import notify from '../../assets/fortune/notification.svg';
import nonNotify from '../../assets/fortune/non-notification.svg';
import { useApiQuery } from '../../apis/config/builder/ApiBuilder';
import { checkNotification } from '../../apis/notification';

const Fortune = () => {
  const navigate = useNavigate();
  const { data: notification } = useApiQuery(checkNotification(), [
    'notification',
  ]);

  return (
    <S.Container>
      <S.Header>
        <img
          src={notification ? notify : nonNotify}
          onClick={() => navigate('/notification')}
        />
      </S.Header>
      <S.FortuneCookieImage src={fortuneCookie} />
      <S.ButtonImage
        src={receiver}
        onClick={() => navigate('/fortune/receive')}
      />
      <S.ButtonImage src={sender} onClick={() => navigate('/fortune/send')} />
    </S.Container>
  );
};

export default Fortune;
