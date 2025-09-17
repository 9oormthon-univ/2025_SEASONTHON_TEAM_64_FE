import React from 'react';
import * as S from './SubmitButton.styles';

interface SubmitButtonProps {
  onClick: () => void;
  disabled?: boolean;
  isSubmitting?: boolean;
  text?: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  onClick,
  disabled,
  isSubmitting,
  text,
}) => {
  return (
    <S.Button onClick={onClick} disabled={disabled || isSubmitting}>
      {isSubmitting ? '등록 중...' : text || '등록하기'}
    </S.Button>
  );
};

export default SubmitButton;
