import React from 'react';
import * as S from '../../../pages/information/detail/index.styles';

type Props = {
  icon: string;
  address?: string;
  onClick?: () => void;
};

export default function AddressRow({ icon, address, onClick }: Props) {
  return (
    <S.AddressSection onClick={onClick}>
      <img src={icon} alt="address" />
      <S.AddressText>{address}</S.AddressText>
    </S.AddressSection>
  );
}
