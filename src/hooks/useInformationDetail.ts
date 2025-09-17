import { useParams } from 'react-router-dom';
import { useApiQuery } from '../apis/config/builder/ApiBuilder';
import { getInformationDetail } from '../apis/information';
import type { InformationDetailResponse } from '../apis/information/index.type';

export default function useInformationDetail() {
  const { informationId } = useParams();
  const query = useApiQuery<void, InformationDetailResponse>(
    getInformationDetail(Number(informationId)),
    ['information', informationId],
    {
      queryKey: ['information', informationId],
      enabled: !!informationId,
    },
  );

  const convertCategory = (category?: string) => {
    if (category === 'HOSPITAL_FACILITIES') return '병원/시설';
    if (category === 'RESTAURANT_CAFE') return '외식/카페';
    if (category === 'ETC') return '기타';
    return category || '';
  };

  const categoryColor = (category?: string) => {
    if (category === 'HOSPITAL_FACILITIES') return '#7595B7';
    if (category === 'RESTAURANT_CAFE') return '#80B775';
    return '#A8A8A8';
  };

  return { ...query, convertCategory, categoryColor };
}
