import ApiBuilder from '../config/builder/ApiBuilder';
import { buildFormData } from '../../utils/buildFormData';
import type {
  InformationResponse,
  InformationCreateRequest,
  InformationDetailResponse,
  InformationModifyRequest,
} from './index.type';

const createInformation = (
  request: InformationCreateRequest,
  images?: File[] | null,
) => {
  const formData = buildFormData(
    request as unknown as Record<string, unknown>,
    images,
  );
  return ApiBuilder.create<FormData, number>('/api/v1/informations')
    .setMethod('POST')
    .setData(formData);
};

const modifyInformation = (
  informationId: number,
  request: InformationModifyRequest,
  images?: File[] | null,
) => {
  const formData = buildFormData(
    request as unknown as Record<string, unknown>,
    images,
  );
  return ApiBuilder.create<FormData, number>(
    `/api/v1/informations/${informationId}`,
  )
    .setMethod('PUT')
    .setData(formData);
};

const deleteInformation = (informationId: number) => {
  return ApiBuilder.create<void, void>(
    `/api/v1/informations/${informationId}`,
  ).setMethod('DELETE');
};

const getInformationDetail = (informationId: number) => {
  return ApiBuilder.create<void, InformationDetailResponse>(
    `/api/v1/informations/${informationId}`,
  ).setMethod('GET');
};

const getInformationList = (
  lastId?: number,
  category?: string,
  sortByRecent?: boolean,
) => {
  return ApiBuilder.create<void, InformationResponse[]>('/api/v1/informations')
    .setMethod('GET')
    .setParams({
      lastId,
      category,
      sortByRecent,
    });
};

const getMyInformationList = (lastId?: number) => {
  return ApiBuilder.create<void, InformationResponse[]>(
    '/api/v1/informations/my',
  )
    .setMethod('GET')
    .setParams({
      lastId,
    });
};

export {
  createInformation,
  modifyInformation,
  deleteInformation,
  getInformationDetail,
  getInformationList,
  getMyInformationList,
};
