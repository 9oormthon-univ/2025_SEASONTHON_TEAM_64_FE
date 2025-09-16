import React from 'react';
import * as S from './SuccessOverlay.styles';

interface SuccessOverlayProps {
  videoSrc: string;
}

const SuccessOverlay: React.FC<SuccessOverlayProps> = ({ videoSrc }) => {
  return (
    <S.Background>
      <S.Text>오늘의 시선을 공유했어요!</S.Text>
      <S.Video src={videoSrc} autoPlay muted playsInline />
    </S.Background>
  );
};

export default SuccessOverlay;
