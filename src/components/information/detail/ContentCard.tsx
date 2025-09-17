import React from 'react';
import * as S from '../../../pages/information/detail/index.styles';

type Props = {
  title?: string;
  imageUrl?: string;
  description?: string;
  createdAt?: string;
  emptyImage: string;
};

export default function ContentCard({
  title,
  imageUrl,
  description,
  createdAt,
  emptyImage,
}: Props) {
  return (
    <S.ContentBox>
      <S.TitleSection>
        <S.TitleLabel>제목: </S.TitleLabel>
        <S.Title>{title}</S.Title>
      </S.TitleSection>
      <S.ContentSection>
        <S.ImageWrapper>
          <S.ImageBox src={imageUrl || emptyImage} />
        </S.ImageWrapper>
        <S.ContentDescription>{description}</S.ContentDescription>
        <S.ContentCreatedAt>{createdAt}</S.ContentCreatedAt>
      </S.ContentSection>
    </S.ContentBox>
  );
}
