import React from 'react';
import styled from 'styled-components';
import { Plus } from 'lucide-react';
import { useMission } from '../app/MissionContext';

interface MissionCardProps {
  onAddMission?: () => void;
}

const MissionCard: React.FC<MissionCardProps> = ({ onAddMission }) => {
  const { currentMission } = useMission();
  return (
    <Card>
      <MissionTitle>&lt;오늘의 시선_MISSION&gt;</MissionTitle>
      <MissionDescription>
        {currentMission ? currentMission.text : '오늘 가장 인상적인 풍경을 공유해봐요.'}
      </MissionDescription>
      <AddButton onClick={onAddMission}>
        <Plus size={20} />
      </AddButton>
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

const AddButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #007bff;
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }
`;

export default MissionCard;

