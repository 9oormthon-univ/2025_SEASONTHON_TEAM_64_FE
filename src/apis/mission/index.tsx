import ApiBuilder from '../config/builder/ApiBuilder';
import type { TodayMission } from './index.type';

const getTodayMission = () => {
  return ApiBuilder.create<void, TodayMission>(
    '/api/v1/members/missions/today',
  ).setMethod('GET');
};

export { getTodayMission };
