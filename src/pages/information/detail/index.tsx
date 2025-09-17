import React, { useState } from 'react';
import * as S from './index.styles';
import { useNavigate } from 'react-router-dom';
import back from '../../../assets/information/left-arrow.svg';
import empty from '../../../assets/information/empty-image.svg';
import nonImage from '../../../assets/information/non-image.svg';
import addressIcon from '../../../assets/information/address.svg';
import PlaceMapModal from '../../../components/map/PlaceMapModal';
import useInformationDetail from '../../../hooks/useInformationDetail';
import WriterInfo from '../../../components/information/detail/WriterInfo';
import ContentCard from '../../../components/information/detail/ContentCard';
import AddressRow from '../../../components/information/detail/AddressRow';
import CategoryChip from '../../../components/information/detail/CategoryChip';

const InfomationDetail = () => {
  const navigate = useNavigate();
  const [isOpenMap, setIsOpenMap] = useState(false);
  const {
    data: infomationDetial,
    convertCategory,
    categoryColor,
  } = useInformationDetail();
  return (
    <>
      <S.Container>
        <S.Header>
          <img src={back} alt="back" onClick={() => navigate(-1)} />
        </S.Header>
        <WriterInfo
          profileUrl={infomationDetial?.writer?.profileImageUrl}
          nickname={infomationDetial?.writer?.nickname}
          fallback={nonImage}
        />
        <ContentCard
          title={infomationDetial?.title}
          imageUrl={infomationDetial?.images?.[0]?.imageUrl}
          description={infomationDetial?.description}
          createdAt={infomationDetial?.createdAt}
          emptyImage={empty}
        />
        <AddressRow
          icon={addressIcon}
          address={infomationDetial?.address}
          onClick={() => setIsOpenMap(true)}
        />
        <CategoryChip
          category={infomationDetial?.category}
          label={convertCategory(infomationDetial?.category as string)}
        />
      </S.Container>
      <PlaceMapModal
        open={isOpenMap}
        onClose={() => setIsOpenMap(false)}
        lat={infomationDetial?.latitude || 37.5665}
        lng={infomationDetial?.longitude || 126.978}
        name={infomationDetial?.title}
        address={infomationDetial?.address}
        categoryLabel={convertCategory(infomationDetial?.category as string)}
        categoryColor={categoryColor(infomationDetial?.category)}
      />
    </>
  );
};

export default InfomationDetail;
