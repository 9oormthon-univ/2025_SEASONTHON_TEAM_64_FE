import ApiBuilder from '../config/builder/ApiBuilder';
import type {
  CursorPageResponse,
  TodayMission,
  UploadImageResponse,
} from './index.type';

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

const getMissionByCursor = ({
  cursorId,
  size = 5,
}: {
  cursorId?: number;
  size?: number;
}) => {
  // 커서 기반 페이징에서는 보통 size와 cursorId만 사용합니다.
  const params: Record<string, any> = { size };
  if (typeof cursorId !== 'undefined' && cursorId !== null) {
    params.cursorId = cursorId;
  }

  return ApiBuilder.create<void, CursorPageResponse>('/api/v1/feeds/cursor')
    .setParams(params)
    .setMethod('GET');
};

export { getTodayMission, uploadImage, generateFeed, getMissionByCursor };
