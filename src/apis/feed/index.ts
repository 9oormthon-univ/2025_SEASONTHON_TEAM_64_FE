import ApiBuilder from '../config/builder/ApiBuilder';
import { buildFormDataSingle } from '../../utils/buildFormData';
import type {
  FeedModifyRequest,
  FeedResponse,
  FeedCreateRequest,
} from './index.type';

const getFeedList = (lastFeedId?: number) => {
  return ApiBuilder.create<void, FeedResponse[]>('/api/v1/feeds')
    .setMethod('GET')
    .setParams({ lastFeedId });
};

const getMyFeedList = (lastFeedId?: number) => {
  return ApiBuilder.create<void, FeedResponse[]>('/api/v1/feeds/my')
    .setMethod('GET')
    .setParams({ lastFeedId });
};

const createFeed = (request: FeedCreateRequest, imageFile: File | null) => {
  const formData = buildFormDataSingle(
    request as unknown as Record<string, unknown>,
    imageFile,
  );
  return ApiBuilder.create<FormData, number>('/api/v1/feeds')
    .setMethod('POST')
    .setData(formData);
};

const getFeedDetail = (feedId: number) => {
  return ApiBuilder.create<void, FeedResponse>(
    `/api/v1/feeds/${feedId}`,
  ).setMethod('GET');
};

const modifyFeed = (
  feedId: number,
  request: FeedModifyRequest,
  imageFile: File | null,
) => {
  const formData = buildFormDataSingle(
    request as unknown as Record<string, unknown>,
    imageFile,
  );
  return ApiBuilder.create<FormData, number>(`/api/v1/feeds/${feedId}`)
    .setMethod('PUT')
    .setData(formData);
};

const deleteFeed = (feedId: number) => {
  return ApiBuilder.create<void, void>(`/api/v1/feeds/${feedId}`).setMethod(
    'DELETE',
  );
};

const likeFeed = (feedId: number) => {
  return ApiBuilder.create<void, void>(
    `/api/v1/feeds/${feedId}/like`,
  ).setMethod('POST');
};

const unlikeFeed = (feedId: number) => {
  return ApiBuilder.create<void, void>(
    `/api/v1/feeds/${feedId}/like`,
  ).setMethod('DELETE');
};

export {
  getFeedList,
  getMyFeedList,
  createFeed,
  getFeedDetail,
  modifyFeed,
  deleteFeed,
  likeFeed,
  unlikeFeed,
};
