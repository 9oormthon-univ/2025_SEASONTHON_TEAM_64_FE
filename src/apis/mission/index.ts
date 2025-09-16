import ApiBuilder from '../config/builder/ApiBuilder';
import type {
  MissionCreateRequest,
  MissionModifyRequest,
  MissionResponse,
} from './index.type';

const createMission = (request: MissionCreateRequest) => {
  return ApiBuilder.create<MissionCreateRequest, number>(
    '/api/v1/missions/admin',
  )
    .setMethod('POST')
    .setData(request);
};

const modifyMission = (request: MissionModifyRequest) => {
  return ApiBuilder.create<MissionModifyRequest, void>(`/api/v1/missions/admin`)
    .setMethod('PUT')
    .setData(request);
};

const getMissionList = () => {
  return ApiBuilder.create<void, MissionResponse[]>(
    '/api/v1/missions/admin',
  ).setMethod('GET');
};

const deleteMission = (missionId: number) => {
  return ApiBuilder.create<void, void>(
    `/api/v1/missions/admin/${missionId}`,
  ).setMethod('DELETE');
};

const getMissionDetail = (missionId: number) => {
  return ApiBuilder.create<void, MissionResponse>(
    `/api/v1/missions/admin/${missionId}`,
  ).setMethod('GET');
};

const getUserMission = () => {
  return ApiBuilder.create<void, MissionResponse>('/api/v1/missions').setMethod(
    'GET',
  );
};

export {
  createMission,
  modifyMission,
  getMissionList,
  deleteMission,
  getMissionDetail,
  getUserMission,
};
