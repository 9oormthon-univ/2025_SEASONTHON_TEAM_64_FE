import ApiBuilder from '../config/builder/ApiBuilder';
import type {
  MemberDetailResponse,
  MemberDeviceTokenRequest,
} from '../member/index.type';

const getMemberDetail = () => {
  return ApiBuilder.create<void, MemberDetailResponse>(
    `/api/v1/members`,
  ).setMethod('GET');
};

const updateMemberMode = (mode: string) => {
  return ApiBuilder.create<void, void>(`/api/v1/members`)
    .setMethod('PUT')
    .setParams({ mode });
};

const updateMemberDeviceToken = (request: MemberDeviceTokenRequest) => {
  return ApiBuilder.create<MemberDeviceTokenRequest, void>(
    `/api/v1/members/device-token`,
  )
    .setData(request)
    .setMethod('PUT');
};

export { getMemberDetail, updateMemberMode, updateMemberDeviceToken };
