import ApiBuilder from '../config/builder/ApiBuilder';
import type { Mission, MissionGenerateRequest } from './index.type';

const postMissionUpload = ({ title }: { title: string }) => {
  return ApiBuilder.create<MissionGenerateRequest, void>(
    `/api/v1/missions/upload`,
  )
    .setMethod('POST')
    .setData({ title });
};

const getMissionList = () => {
  return ApiBuilder.create<void, Mission[]>('/api/v1/missions').setMethod(
    'GET',
  );
};

export { postMissionUpload, getMissionList };
