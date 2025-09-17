import React from 'react';
import * as S from './MissionBox.styles';

interface MissionBoxProps {
  description?: string;
}

const MissionBox: React.FC<MissionBoxProps> = ({ description }) => {
  return (
    <S.Wrapper>
      <S.Title>오늘의 미션</S.Title>
      <S.Content>{description || '미션 내용이 없습니다.'}</S.Content>
    </S.Wrapper>
  );
};

export default MissionBox;
