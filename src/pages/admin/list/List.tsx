import React from 'react';
import * as S from './List.styles';
import Back from '../assets/BackIcon.svg';
import Etc from '../assets/EtcIcon.svg';
import { useApiQuery } from '../../../apis/config/builder/ApiBuilder';
import { getMissionList } from '../../../apis/admin';
import { useNavigate } from 'react-router-dom';

const List = () => {
  const navigate = useNavigate();
  const { data: missionList } = useApiQuery(getMissionList(), ['missionList']);

  return (
    <>
      <S.Container>
        <S.Header>
          <S.HeaderIcon src={Back} onClick={() => navigate('/admin')} />
          <S.HeaderText>등록미션 리스트</S.HeaderText>
        </S.Header>
        <S.MissionList>
          {missionList?.map((mission) => (
            <S.Mission key={mission.id}>
              {mission.title}
              <img src={Etc} />
            </S.Mission>
          ))}
        </S.MissionList>
      </S.Container>
    </>
  );
};

export default List;
