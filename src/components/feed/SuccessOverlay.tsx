import React from 'react';
import * as S from './SuccessOverlay.styles';

interface SuccessOverlayProps {
  imageSrc: string;
  message?: React.ReactNode;
}

const SuccessOverlay: React.FC<SuccessOverlayProps> = ({
  imageSrc,
  message,
}) => {
  return (
    <S.Background>
      <S.Text>{message || '오늘의 시선을 공유했어요!'}</S.Text>
      <S.Image src={imageSrc} />
    </S.Background>
  );
};

export default SuccessOverlay;
