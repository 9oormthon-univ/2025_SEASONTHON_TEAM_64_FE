import ApiBuilder from '../config/builder/ApiBuilder';
import type { TodayMission, UploadImageResponse } from './index.type';

const getTodayMission = () => {
  return ApiBuilder.create<void, TodayMission>(
    '/api/v1/members/missions/today',
  ).setMethod('GET');
};

const uploadImage = () => {
  return ApiBuilder.create<FormData, string>('/api/v1/images/upload').setMethod(
    'POST',
  );
};

const generateFeed = ({
  description,
  imageUrl,
  missionId,
}: {
  description: string;
  imageUrl: string;
  missionId: number;
}) => {
  return ApiBuilder.create<
    { description: string; imageUrl: string; missionId: number },
    void
  >('/api/v1/feeds/upload')
    .setMethod('POST')
    .setData({ description, imageUrl, missionId });
};

export { getTodayMission, uploadImage, generateFeed };
