import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ArrowLeft, Bell } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMission } from '../app/MissionContext';
import { missionService } from '../app/missionService';
import BottomNavigation from '../components/BottomNavigation';

const AdminMissionPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { missions, addMission, updateMission } = useMission();
  const [text, setText] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editMissionId, setEditMissionId] = useState<string | null>(null);

  const canSubmit = text.trim().length > 0;

  useEffect(() => {
    const editId = location.state?.editMissionId;
    if (editId) {
      const mission = missions.find(m => m.id === editId);
      if (mission) {
        setIsEditMode(true);
        setEditMissionId(editId);
        setText(mission.text);
      }
    }
  }, [location.state, missions]);

  const handleSubmit = async () => {
    if (canSubmit) {
      try {
        if (isEditMode && editMissionId) {
          updateMission(editMissionId, text.trim());
        } else {
          // 서버 등록 시도 후 실패하면 로컬에 추가
          console.log('📝 미션 등록 시도:', text.trim());
          await missionService.createMission(text.trim());
          addMission(text.trim());
        }
        setText('');
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          navigate('/mission-list');
        }, 2000);
      } catch (error) {
        console.error('❌ 미션 등록 실패:', error);
        alert('미션 등록에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  // 인라인 수정 기능은 현재 사용하지 않음 (페이지 상단 입력 영역 재사용)

  // 삭제 핸들러는 리스트 UI 개편으로 제거됨

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

        <MissionInputCard>
          <UserSection>
            <UserIcon>
              <img src="/Maru_pen.png" alt="마루" width={32} height={32} />
            </UserIcon>
            <UserInfo>
              <UserName>관리자</UserName>
              <UserSubtitle>가나다홍길동</UserSubtitle>
            </UserInfo>
          </UserSection>
          
          <InputArea>
            <TextArea
              placeholder="오늘의 미션 작성..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              maxLength={100}
            />
            <CharCount>{text.length}/100</CharCount>
          </InputArea>
        </MissionInputCard>

        <SubmitButton onClick={handleSubmit} disabled={!canSubmit}>
          {isEditMode ? '재등록하기' : '등록하기'}
        </SubmitButton>


        {showSuccess && (
          <SuccessOverlay>
            <SuccessCard>
              <SuccessText>미션이 재등록되었습니다.</SuccessText>
              <img src="/Maru_front.png" alt="마루" width={60} height={60} />
            </SuccessCard>
          </SuccessOverlay>
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

const MissionInputCard = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 20px;
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

const UserIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #333;
`;

const UserSubtitle = styled.span`
  font-size: 12px;
  color: #666;
`;

const InputArea = styled.div`
  position: relative;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 80px;
  border: none;
  background: none;
  outline: none;
  font-size: 14px;
  color: #333;
  resize: none;
  font-family: inherit;

  &::placeholder {
    color: #999;
  }
`;

const CharCount = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  font-size: 12px;
  color: #999;
`;

const SubmitButton = styled.button`
  width: 100%;
  background-color: #FF6A25;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 16px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-bottom: 20px;

  &:hover:not(:disabled) {
    background-color: #ff7f47;
  }

  &:disabled {
    background-color: #ffbe9f;
    cursor: not-allowed;
  }
`;

/* 미션 리스트 관련 스타일은 현재 화면에서 미사용 */

const SuccessOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(22, 22, 22, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const SuccessCard = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const SuccessText = styled.div`
  font-size: 16px;
  color: #333;
  font-weight: 500;
`;

export default AdminMissionPage;