import React from 'react';
import * as S from '../../pages/information/index.styles';
import empty from '../../assets/information/empty-image.svg';
import type { InformationResponse } from '../../apis/information/index.type';

type Props = {
  item: InformationResponse;
  onClick?: () => void;
};

const InformationItem: React.FC<Props> = ({ item, onClick }) => {
  return (
    <S.InfoItem onClick={onClick}>
      <S.InfoImage src={item.imageUrl || empty} />
      <S.InfoContent>
        <S.InfoTitle>{item.title}</S.InfoTitle>
        {item.description && (
          <S.InfoDescription>{item.description}</S.InfoDescription>
        )}
        <S.InfoCategory category={item.category}>
          {item.category === 'HOSPITAL_FACILITIES'
            ? '병원/시설'
            : item.category === 'RESTAURANT_CAFE'
              ? '외식/카페'
              : '기타'}
        </S.InfoCategory>
      </S.InfoContent>
    </S.InfoItem>
  );
};

export default InformationItem;
