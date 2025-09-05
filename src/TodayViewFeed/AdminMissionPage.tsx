import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useMission } from '../app/MissionContext';

const AdminMissionPage: React.FC = () => {
  const navigate = useNavigate();
  const { missions, addMission, updateMission, deleteMission, finalizeMission } = useMission();
  const [text, setText] = useState('');

  const canSubmit = text.trim().length > 0;

  const latest = useMemo(() => missions[0], [missions]);

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate(-1)}>←</BackButton>
        <Title>관리자 미션 관리</Title>
      </Header>

      <Section>
        <Label>오늘의 미션 등록</Label>
        <TextArea
          placeholder="오늘의 미션을 등록하세요."
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={100}
        />
        <Row>
          <PrimaryButton disabled={!canSubmit} onClick={() => { addMission(text.trim()); setText(''); }}>
            등록하기
          </PrimaryButton>
          <Counter>{text.length}/100</Counter>
        </Row>
      </Section>

      <Section>
        <Label>등록된 미션</Label>
        <List>
          {missions.map(m => (
            <Item key={m.id} $finalized={m.finalized}>
              <ItemText>{m.text}</ItemText>
              <ItemRow>
                <SmallButton disabled={m.finalized} onClick={() => updateMission(m.id, prompt('수정할 내용을 입력하세요', m.text) || m.text)}>수정</SmallButton>
                <SmallButton disabled={m.finalized} onClick={() => deleteMission(m.id)}>삭제</SmallButton>
                <SmallPrimary disabled={m.finalized} onClick={() => finalizeMission(m.id)}>최종등록</SmallPrimary>
              </ItemRow>
            </Item>
          ))}
        </List>
      </Section>

      {latest && (
        <Footer>
          <span>가장 최근 등록: {latest.text}</span>
        </Footer>
      )}
    </Container>
  );
};

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
  background-color: #ffffff;
  min-height: 100vh;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const Title = styled.h1`
  font-size: 18px;
  margin: 0;
`;

const Section = styled.section`
  padding: 20px;
  border-bottom: 1px solid #f5f5f5;
`;

const Label = styled.h2`
  font-size: 16px;
  margin: 0 0 10px 0;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 110px;
  resize: none;
  border-radius: 12px;
  border: 1px solid #e9ecef;
  padding: 12px;
  font-size: 14px;
`;

const Row = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PrimaryButton = styled.button`
  background: #000;
  color: #fff;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
  opacity: ${(p) => (p.disabled ? 0.4 : 1)};
` as any;

const Counter = styled.span`
  color: #888;
  font-size: 12px;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Item = styled.div<{ $finalized: boolean }>`
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 12px;
  background: ${(p) => (p.$finalized ? '#f6f7f8' : '#fff')};
`;

const ItemText = styled.div`
  font-size: 14px;
  margin-bottom: 8px;
`;

const ItemRow = styled.div`
  display: flex;
  gap: 8px;
`;

const SmallButton = styled.button`
  background: #f1f3f5;
  border: none;
  padding: 8px 10px;
  border-radius: 8px;
  cursor: pointer;
  opacity: ${(p) => (p.disabled ? 0.4 : 1)};
` as any;

const SmallPrimary = styled(SmallButton)`
  background: #000;
  color: #fff;
`;

const Footer = styled.footer`
  padding: 16px 20px 40px;
  color: #666;
  font-size: 12px;
`;

export default AdminMissionPage;



