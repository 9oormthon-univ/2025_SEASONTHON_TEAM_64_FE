import React, { useState } from 'react';
import * as S from './index.styles';
import notify from '../../assets/information/notification.svg';
import nonNotify from '../../assets/information/non-notification.svg';
import createIcon from '../../assets/information/plus.svg';
import { useNavigate } from 'react-router-dom';
import { useApiQuery } from '../../apis/config/builder/ApiBuilder';
import { checkNotification } from '../../apis/notification';

const categories = [
  { label: '전체', value: null },
  { label: '병원/시설', value: 'HOSPITAL_FACILITIES' },
  { label: '외식/카페', value: 'RESTAURANT_CAFE' },
  { label: '기타', value: 'ETC' },
];

const Information = () => {
  const navigate = useNavigate();
  const { data: notification } = useApiQuery(checkNotification(), [
    'notification',
  ]);
  const [category, setCategory] = useState<string | null>(null);

  return (
    <>
      <S.Container>
        <S.Header>
          <img
            src={notification ? notify : nonNotify}
            onClick={() => navigate('/notification')}
          />
        </S.Header>
        <S.CategoryBox>
          {categories.map((cat, index) => (
            <S.Category
              key={index}
              selected={category === cat.value}
              onClick={() => setCategory(cat.value)}
            >
              {cat.label}
            </S.Category>
          ))}
        </S.CategoryBox>
      </S.Container>
      <S.CreateIcon src={createIcon} onClick={() => navigate('/info/create')} />
    </>
  );
};

export default Information;
