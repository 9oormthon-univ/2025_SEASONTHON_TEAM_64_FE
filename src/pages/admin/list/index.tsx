import React, { useState } from 'react';
import * as S from './index.styles';
import Header from '../../../components/admin/header/Header';
import { useApiQuery } from '../../../apis/config/builder/ApiBuilder';
import { getMissionList } from '../../../apis/mission';
import MissionBox from '../../../components/admin/missionBox/MissionBox';

const AdminList = () => {
  const [openMissionId, setOpenMissionId] = useState<number | null>(null);
  const { data: missionList } = useApiQuery(getMissionList(), ['missionList']);

  return (
    <>
      <S.Container>
        <Header />
        <S.MissionList>
          {missionList?.map((mission) => {
            const isOpen = openMissionId === mission.id;
            const handleToggle = (id: number) => {
              setOpenMissionId((prev) => (prev === id ? null : id));
            };
            return (
              <MissionBox
                key={mission.id}
                id={mission.id}
                description={mission.description}
                isOpen={isOpen}
                onToggle={handleToggle}
              />
            );
          })}
        </S.MissionList>
      </S.Container>
    </>
  );
};

export default AdminList;
