import { useEffect, useRef } from 'react';
import { getToken, onMessage, type MessagePayload } from 'firebase/messaging';
import { getFirebaseMessaging } from '../firebase';
import { updateMemberDeviceToken } from '../apis/member';
import useToast from './useToast';

type Options = {
  vapidKey?: string;
  onForegroundMessage?: (payload: MessagePayload) => void;
  enabled?: boolean;
};

const useFcmToken = ({
  vapidKey,
  onForegroundMessage,
  enabled = true,
}: Options = {}) => {
  const toast = useToast();
  const registeredRef = useRef(false);

  useEffect(() => {
    if (!enabled || registeredRef.current) return;
    registeredRef.current = true;

    (async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') {
          return;
        }

        const messaging = await getFirebaseMessaging();
        if (!messaging) {
          console.warn('[FCM] 이 브라우저는 FCM을 지원하지 않습니다.');
          return;
        }

        if ('serviceWorker' in navigator) {
          const reg = await navigator.serviceWorker.register(
            '/firebase-messaging-sw.js',
          );
          const token = await getToken(messaging, {
            vapidKey: vapidKey || process.env.REACT_APP_FIREBASE_VAPID_KEY,
            serviceWorkerRegistration: reg,
          });

          if (token) {
            await updateMemberDeviceToken({ deviceToken: token }).execute();
          }
        }

        onMessage(messaging, (payload) => {
          onForegroundMessage?.(payload);
          const title = payload.notification?.title || '알림';
          const body = payload.notification?.body || '';
          toast.show(`${title}${body ? `: ${body}` : ''}`);
        });
      } catch (err) {
        console.error('[FCM] 초기화 실패:', err);
      }
    })();
  }, [enabled, onForegroundMessage, toast, vapidKey]);
};

export default useFcmToken;
