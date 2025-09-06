import ApiBuilder from '../config/builder/ApiBuilder';
import type { MemberDetailResponse } from './index.type';

const getMemberDetail = () => {
  return ApiBuilder.create<void, MemberDetailResponse>(
    `/api/v1/members`,
  ).setMethod('GET');
};

export { getMemberDetail };
