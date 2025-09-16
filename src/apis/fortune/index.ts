import ApiBuilder from '../config/builder/ApiBuilder';
import type { FortuneResponse, FortuneCreateRequest } from './index.type';

const createFortune = (request: FortuneCreateRequest) => {
  return ApiBuilder.create<FortuneCreateRequest, number>('/api/v1/fortunes')
    .setMethod('POST')
    .setData(request);
};

const assignFortune = () => {
  return ApiBuilder.create<void, FortuneResponse>(
    '/api/v1/fortunes/assign',
  ).setMethod('POST');
};

const getMyFortunes = () => {
  return ApiBuilder.create<void, FortuneResponse[]>(
    '/api/v1/fortunes',
  ).setMethod('GET');
};

export { createFortune, assignFortune, getMyFortunes };
