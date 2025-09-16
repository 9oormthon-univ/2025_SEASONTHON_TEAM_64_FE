import ApiBuilder from '../config/builder/ApiBuilder';
import type {
  MissionCreateRequest,
  MissionModifyRequest,
  MissionResponse,
} from './index.type';

const createMission = (description: string) => {
  return ApiBuilder.create<MissionCreateRequest, number>(
    '/api/v1/missions/admin',
  )
    .setMethod('POST')
    .setData({ description });
};

const modifyMission = (missionId: number, description: string) => {
  return ApiBuilder.create<MissionModifyRequest, void>(`/api/v1/missions/admin`)
    .setMethod('PUT')
    .setData({ missionId, description });
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
