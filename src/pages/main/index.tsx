import React, { useEffect } from 'react';
import * as S from './index.styles';
import { useApiQuery } from '../../apis/config/builder/ApiBuilder';
import { getMemberDetail } from '../../apis/member';
import { useNavigate } from 'react-router-dom';

import logo from './assets/logo.svg';
import front from './assets/front-maru.svg';
import notify from './assets/notify.svg';
import genenrateIcon from './assets/generate.svg';
import { getTodayMission } from '../../apis/mission';

const Main = () => {
  const navigate = useNavigate();
  const { data: todayMissionData } = useApiQuery(getTodayMission(), [
    'todayMission',
  ]);
  const {
    data: memberData,
    isLoading,
    isError,
  } = useApiQuery(getMemberDetail(), ['member']);

  useEffect(() => {
    if (isLoading) return;

    if (isError) {
      navigate('/login', { replace: true });
      return;
    }

    if (!memberData) {
      navigate('/login', { replace: true });
      return;
    }

    if (memberData.role === 'ROLE_ADMIN') {
      navigate('/admin', { replace: true });
    }
  }, [isLoading, isError, memberData, navigate]);

  if (isLoading) return <></>;
  return (
    <>
      <S.Container>
        <S.ImageWrapper>
          <S.Logo src={logo} />
          <S.Front src={front} />
          <S.Notify src={notify} />
        </S.ImageWrapper>
        <S.TodayMissionBox>
          <S.MissionTitle>오늘의 시선 MISSION</S.MissionTitle>
          <S.MissionContent>
            {todayMissionData?.mission.title ? (
              <>{todayMissionData.mission.title}</>
            ) : (
              '오늘의 미션이 없습니다.'
            )}
          </S.MissionContent>
        </S.TodayMissionBox>
      </S.Container>
      <S.GenenrateIcon src={genenrateIcon} />
    </>
  );
};

export default Main;
