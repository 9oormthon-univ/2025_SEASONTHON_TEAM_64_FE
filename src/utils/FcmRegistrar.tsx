import { useMemo } from 'react';
import useFcmToken from '../hooks/useFcmToken';

const FcmRegistrar = () => {
  const vapidKey = useMemo(() => process.env.REACT_APP_FIREBASE_VAPID_KEY, []);

  useFcmToken({ vapidKey, enabled: true });
  return null;
};

export default FcmRegistrar;
