import React from 'react';
import * as S from './index.styles';
import { useNavigate } from 'react-router-dom';

import fortuneCookie from '../../assets/fortune/fortune.svg';
import receiver from '../../assets/fortune/receiver.svg';
import sender from '../../assets/fortune/sender.svg';
import notify from '../../assets/fortune/notification.svg';
import nonNotify from '../../assets/fortune/non-notification.svg';
import useNotificationStatus from '../../hooks/useNotificationStatus';
import OldModeGuide from '../../components/common/OldModeGuide';
import fortuneGuide from '../../assets/oldmode/fortune_guide.jpg';

const Fortune = () => {
  const navigate = useNavigate();
  const notification = useNotificationStatus();

  return (
    <>
      <OldModeGuide pageKey="fortune" imageSrc={fortuneGuide} version="v1" />
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
    </>
  );
};

export default Fortune;
