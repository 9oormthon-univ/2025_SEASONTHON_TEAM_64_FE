import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ArrowLeft, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useMission } from '../app/MissionContext';
import { missionService } from '../app/missionService';
import BottomNavigation from '../components/BottomNavigation';

interface ServerMission {
  id: string;
  description: string;
  createdAt: number;
  member?: any;
}

const MissionListPage: React.FC = () => {
  const navigate = useNavigate();
  const { missions: localMissions, deleteMission, finalizeMission } = useMission();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [serverMissions, setServerMissions] = useState<ServerMission[]>([]);
  const [loading, setLoading] = useState(true);

  // 서버에서 미션 목록 가져오기
  useEffect(() => {
    const loadMissions = async () => {
      try {
        setLoading(true);
        console.log('📋 관리자 미션 목록 로드 시작');
        const missions = await missionService.listMissions();
        console.log('✅ 서버 미션 목록:', missions);
        setServerMissions(missions);
      } catch (error) {
        console.error('❌ 미션 목록 로드 실패:', error);
        // 서버 실패 시 로컬 미션 사용
        setServerMissions(localMissions.map(m => ({
          id: m.id,
          description: m.text,
          createdAt: m.createdAt
        })));
      } finally {
        setLoading(false);
      }
    };

    loadMissions();
  }, [localMissions]);

  // 서버 미션과 로컬 미션을 합쳐서 사용 (중복 제거)
  const allMissions = serverMissions.length > 0 ? serverMissions : localMissions.map(m => ({
    id: m.id,
    text: m.text,
    createdAt: m.createdAt,
    finalized: m.finalized
  }));

  // 중복 제거: id 기준으로 중복된 미션 제거
  const missions = allMissions.reduce((acc: any[], mission: any) => {
    const existingIndex = acc.findIndex(m => m.id === mission.id);
    if (existingIndex === -1) {
      acc.push(mission);
    } else {
      console.log('🔄 로컬 중복 미션 발견, 최신 것으로 교체:', { 
        id: mission.id, 
        old: acc[existingIndex], 
        new: mission 
      });
      acc[existingIndex] = mission; // 최신 것으로 교체
    }
    return acc;
  }, []);

  console.log('📊 최종 미션 목록:', { 
    서버미션: serverMissions.length, 
    로컬미션: localMissions.length, 
    최종미션: missions.length 
  });

  const handleDelete = (id: string) => {
    setShowDeleteConfirm(id);
  };

  const confirmDelete = async (id: string) => {
    console.log('🗑 삭제 확인:', { id, type: typeof id });
    
    if (!id || id === 'undefined') {
      console.error('❌ 삭제할 미션 ID가 없습니다:', id);
      alert('삭제할 미션을 찾을 수 없습니다.');
      setShowDeleteConfirm(null);
      return;
    }
    
    try {
      await missionService.deleteMission(id);
      deleteMission(id);
      setShowDeleteConfirm(null);
    } catch (error) {
      console.error('❌ 미션 삭제 실패:', error);
      alert('미션 삭제에 실패했습니다. 다시 시도해주세요.');
    }
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
            {loading ? (
              <LoadingText>미션 목록을 불러오는 중...</LoadingText>
            ) : missions.length === 0 ? (
              <EmptyText>등록된 미션이 없습니다.</EmptyText>
            ) : (
              missions.map((m, index) => {
                // 안전한 key 생성: id + index 조합으로 중복 방지
                const safeKey = `${m.id || 'unknown'}-${index}`;
                console.log('🔑 Mission key 생성:', { id: m.id, index, safeKey });
                
                return (
                  <MissionItem key={safeKey}>
                    <MissionText>{(m as any).text || (m as any).description}</MissionText>
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
                );
              })
            )}
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

const LoadingText = styled.div`
  text-align: center;
  padding: 20px;
  color: #666;
  font-size: 14px;
`;

const EmptyText = styled.div`
  text-align: center;
  padding: 20px;
  color: #999;
  font-size: 14px;
`;

export default MissionListPage;
