import React from 'react';
import * as S from '../../../pages/information/detail/index.styles';

type Props = {
  profileUrl?: string;
  nickname?: string;
  fallback?: string;
};

export default function WriterInfo({ profileUrl, nickname, fallback }: Props) {
  return (
    <S.WriterInfo>
      <S.WriterProfile src={profileUrl || fallback} />
      <S.WriterName>{nickname}</S.WriterName>
    </S.WriterInfo>
  );
}
