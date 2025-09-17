import ApiBuilder from '../config/builder/ApiBuilder';
import type { NotificationResponse } from './index.type';

const checkNotification = () => {
  return ApiBuilder.create<void, boolean>('/api/v1/notifications').setMethod(
    'GET',
  );
};

const getMyNotifications = (lastNotificationId: number | null) => {
  return ApiBuilder.create<void, NotificationResponse[]>(
    `/api/v1/notifications`,
  )
    .setMethod('PUT')
    .setParams({ lastNotificationId });
};
export { checkNotification, getMyNotifications };
