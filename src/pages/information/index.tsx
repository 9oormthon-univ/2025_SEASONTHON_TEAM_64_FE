import React, { useState } from 'react';
import * as S from './index.styles';
import createIcon from '../../assets/information/plus.svg';
import { useNavigate } from 'react-router-dom';
import useInfiniteInformation from '../../hooks/useInfiniteInformation';
import NotificationIcon from '../../components/information/NotificationIcon';
import CategoryTabs from '../../components/information/CategoryTabs';
import InformationItem from '../../components/information/InformationItem';
import useNotificationStatus from '../../hooks/useNotificationStatus';
import OldModeGuide from '../../components/common/OldModeGuide';
import infoGuide from '../../assets/oldmode/information_guide.jpg';

const categories = [
  { label: '전체', value: null },
  { label: '병원/시설', value: 'HOSPITAL_FACILITIES' },
  { label: '외식/카페', value: 'RESTAURANT_CAFE' },
  { label: '기타', value: 'ETC' },
];

const Information = () => {
  const navigate = useNavigate();
  const notification = useNotificationStatus();
  const [category, setCategory] = useState<string | null>(null);
  const { items, isLoading, isFetchingNextPage, sentinelRef, containerRef } =
    useInfiniteInformation(category);

  return (
    <>
      <OldModeGuide pageKey="information" imageSrc={infoGuide} version="v1" />
      <S.Container>
        <S.Header>
          <NotificationIcon
            enabled={notification}
            onClick={() => navigate('/notification')}
          />
        </S.Header>
        <CategoryTabs
          categories={categories}
          selected={category}
          onChange={setCategory}
        />
        <S.InfoList ref={containerRef}>
          {items.map((info) => (
            <InformationItem
              key={info.informationId}
              item={info}
              onClick={() => navigate(`/info/${info.informationId}`)}
            />
          ))}
          <div ref={sentinelRef} style={{ height: 1 }} />
          {(isLoading || isFetchingNextPage) && (
            <div style={{ padding: '1rem 0', color: '#8b8b8b' }}>
              불러오는 중…
            </div>
          )}
        </S.InfoList>
      </S.Container>
      <S.CreateIcon src={createIcon} onClick={() => navigate('/info/create')} />
    </>
  );
};

export default Information;
