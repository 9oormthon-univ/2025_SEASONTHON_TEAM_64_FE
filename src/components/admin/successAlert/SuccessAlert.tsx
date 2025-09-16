import React from 'react';
import * as S from './SuccessAlert.styles';

interface SuccessAlertProps {
  open: boolean;
  message: string;
}

const SuccessAlert: React.FC<SuccessAlertProps> = ({ open, message }) => {
  if (!open) return null;
  return (
    <S.Overlay>
      <S.Popup>{message}</S.Popup>
    </S.Overlay>
  );
};

export default SuccessAlert;
