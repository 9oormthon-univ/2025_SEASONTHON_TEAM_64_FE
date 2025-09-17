import React from 'react';
import * as S from '../../../pages/information/detail/index.styles';

type Props = {
  category?: string;
  label?: string;
};

export default function CategoryChip({ category, label }: Props) {
  return <S.InfoCategory category={category || ''}>{label}</S.InfoCategory>;
}
