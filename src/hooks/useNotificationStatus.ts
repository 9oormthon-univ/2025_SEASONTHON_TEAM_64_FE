import { useApiQuery } from '../apis/config/builder/ApiBuilder';
import { checkNotification } from '../apis/notification';

const useNotificationStatus = () => {
  const { data } = useApiQuery(checkNotification(), ['notification']);
  return !!data;
};

export default useNotificationStatus;
