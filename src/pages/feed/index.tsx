import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './index.styles';
import { useApiQuery } from '../../apis/config/builder/ApiBuilder';
import { getUserMission } from '../../apis/mission';
import { checkNotification } from '../../apis/notification';

import logo from '../../assets/feed/logo.svg';
import front from '../../assets/feed/front-maru.svg';
import notify from '../../assets/feed/notification.svg';
import nonNotify from '../../assets/feed/non-notification.svg';
import create from '../../assets/feed/plus.svg';

const FeedPage = () => {
  const navigate = useNavigate();
  const { data: todayMission } = useApiQuery(getUserMission(), ['userMission']);
  const { data: notification } = useApiQuery(checkNotification(), [
    'notification',
  ]);
  return (
    <>
      <S.Container>
        <S.CreateIcon src={create} onClick={() => navigate('/create')} />
        <S.ImageWrapper>
          <S.Logo src={logo} />
          <S.Front src={front} />
          <S.Notify src={notification ? notify : nonNotify} />
        </S.ImageWrapper>
        <S.TodayMissionBox>
          <S.MissionTitle>오늘의 시선 MISSION</S.MissionTitle>
          <S.MissionContent>
            {todayMission?.description ? (
              <>{todayMission.description}</>
            ) : (
              '오늘의 미션이 없습니다.'
            )}
          </S.MissionContent>
        </S.TodayMissionBox>
      </S.Container>
    </>
  );
};

export default FeedPage;
