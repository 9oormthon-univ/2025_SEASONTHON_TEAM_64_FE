import React, { useState } from 'react';
import styled from 'styled-components';
import { ArrowLeft, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useMission } from '../app/MissionContext';
import { missionService } from '../app/missionService';
import BottomNavigation from '../components/BottomNavigation';

const MissionListPage: React.FC = () => {
  const navigate = useNavigate();
  const { missions, deleteMission, finalizeMission } = useMission();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    setShowDeleteConfirm(id);
  };

  const confirmDelete = async (id: string) => {
    await missionService.deleteMission(id).catch(() => {});
    deleteMission(id);
    setShowDeleteConfirm(null);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(null);
  };

  const handleEdit = (id: string) => {
    navigate('/admin/missions', { state: { editMissionId: id } });
  };

  const isFinalizedMission = (missionId: string) => {
    const mission = missions.find(m => m.id === missionId);
    return mission?.finalized || false;
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate(-1)}>
          <ArrowLeft size={24} />
        </BackButton>
        <Title>등록미션 리스트</Title>
        <BellIcon>
          <Bell size={24} />
        </BellIcon>
      </Header>

      <Content>
        <TopCard>
          <CardTitle>오늘의 미션을 등록하세요!</CardTitle>
          <CardSubtitle>관리자는 미션을 등록해주세요</CardSubtitle>
        </TopCard>

        <MissionList>
          <ListHeader>
            <ListTitle>등록된 미션</ListTitle>
            <SortOption>최신순 ▼</SortOption>
          </ListHeader>
          
          <MissionItems>
            {missions.map(m => (
              <MissionItem key={m.id}>
                <MissionText>{m.text}</MissionText>
                <ActionMenu>
                  <ActionButton onClick={() => handleEdit(m.id)}>
                    수정하기
                  </ActionButton>
                  <ActionButton 
                    onClick={() => handleDelete(m.id)}
                    disabled={isFinalizedMission(m.id)}
                  >
                    삭제하기
                  </ActionButton>
                </ActionMenu>
              </MissionItem>
            ))}
          </MissionItems>
        </MissionList>

        {showDeleteConfirm && (
          <DeleteOverlay>
            <DeleteCard>
              <DeleteText>등록된 미션을 삭제 하시겠습니까?</DeleteText>
              <DeleteButtons>
                <CancelButton onClick={cancelDelete}>취소</CancelButton>
                <DeleteButton onClick={() => confirmDelete(showDeleteConfirm)}>
                  삭제하기
                </DeleteButton>
              </DeleteButtons>
            </DeleteCard>
          </DeleteOverlay>
        )}
      </Content>

      <BottomNavigation />
    </Container>
  );
};

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
  background-color: #FAFAFA;
  min-height: 100vh;
  position: relative;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background-color: transparent;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: #333;
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const Title = styled.h1`
  font-size: 18px;
  margin: 0;
  color: #333;
`;

const BellIcon = styled.div`
  color: #333;
  cursor: pointer;
`;

const Content = styled.main`
  padding: 20px;
`;

const TopCard = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  text-align: center;
`;

const CardTitle = styled.h2`
  font-size: 16px;
  margin: 0 0 8px 0;
  color: #333;
`;

const CardSubtitle = styled.p`
  font-size: 14px;
  margin: 0;
  color: #666;
`;

const MissionList = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  padding: 16px;
`;

const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const ListTitle = styled.h3`
  font-size: 16px;
  margin: 0;
  color: #333;
`;

const SortOption = styled.div`
  font-size: 12px;
  color: #666;
`;

const MissionItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const MissionItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background-color: #f8f9fa;
  border-radius: 8px;
`;

const MissionText = styled.div`
  font-size: 14px;
  color: #333;
  flex: 1;
`;

const ActionMenu = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  font-size: 12px;
  color: #666;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e9ecef;
  }
`;

const DeleteOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(22, 22, 22, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const DeleteCard = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const DeleteText = styled.div`
  font-size: 16px;
  color: #333;
  font-weight: 500;
`;

const DeleteButtons = styled.div`
  display: flex;
  gap: 16px;
`;

const CancelButton = styled.button`
  background: none;
  border: 1px solid #e9ecef;
  color: #666;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #FF6A25;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
`;

export default MissionListPage;
