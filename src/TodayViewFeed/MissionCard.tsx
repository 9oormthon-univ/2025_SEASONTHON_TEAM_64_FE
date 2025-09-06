import React from 'react';
import styled from 'styled-components';
import { Plus, RefreshCw } from 'lucide-react';
import { useMission } from '../app/MissionContext';

interface MissionCardProps {
  onAddMission?: () => void;
}

const MissionCard: React.FC<MissionCardProps> = ({ onAddMission }) => {
  const { currentMission, refreshMission } = useMission();
  
  const handleRefresh = async () => {
    console.log('🔄 MissionCard: 미션 새로고침 버튼 클릭');
    await refreshMission();
  };
  return (
    <Card>
      <MissionTitle>&lt;오늘의 시선_MISSION&gt;</MissionTitle>
      <MissionDescription>
        {currentMission ? currentMission.text : '오늘 가장 인상적인 풍경을 공유해봐요.'}
      </MissionDescription>
      <ButtonGroup>
        <RefreshButton onClick={handleRefresh} title="미션 새로고침">
          <RefreshCw size={16} />
        </RefreshButton>
        <AddButton onClick={onAddMission}>
          <Plus size={20} />
        </AddButton>
      </ButtonGroup>
    </Card>
  );
};

const Card = styled.div`
  background: linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.7));
  border-radius: 12px;
  padding: 20px;
  margin-top: 20px;
  position: relative;
  border: 1px solid #e9ecef;
  backdrop-filter: blur(10px);
`;

const MissionTitle = styled.h2`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin: 0 0 8px 0;
`;

const MissionDescription = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
  line-height: 1.4;
`;

const ButtonGroup = styled.div`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  gap: 8px;
  align-items: center;
`;

const RefreshButton = styled.button`
  background: #f0f0f0;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #e0e0e0;
    color: #333;
  }

  &:active {
    transform: scale(0.95);
  }
`;

const AddButton = styled.button`
  background: #FF6A25;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(255, 106, 37, 0.3);
  transition: all 0.2s ease;

  &:hover {
    background: #ff7f47;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export default MissionCard;

