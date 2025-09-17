import { initializeApp, type FirebaseApp } from 'firebase/app';
import {
  getMessaging,
  isSupported as isMessagingSupported,
  type Messaging,
} from 'firebase/messaging';

let app: FirebaseApp | null = null;
let messaging: Messaging | null = null;

export const getFirebaseApp = () => {
  if (app) return app;
  const {
    REACT_APP_FIREBASE_API_KEY,
    REACT_APP_FIREBASE_AUTH_DOMAIN,
    REACT_APP_FIREBASE_PROJECT_ID,
    REACT_APP_FIREBASE_STORAGE_BUCKET,
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    REACT_APP_FIREBASE_APP_ID,
    REACT_APP_FIREBASE_MEASUREMENT_ID,
  } = process.env as Record<string, string | undefined>;

  if (!REACT_APP_FIREBASE_API_KEY || !REACT_APP_FIREBASE_PROJECT_ID) {
    console.warn('[FCM] Firebase env가 설정되지 않았습니다.');
  }

  app = initializeApp({
    apiKey: REACT_APP_FIREBASE_API_KEY,
    authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: REACT_APP_FIREBASE_APP_ID,
    measurementId: REACT_APP_FIREBASE_MEASUREMENT_ID,
  });
  return app;
};

export const getFirebaseMessaging = async () => {
  try {
    const supported = await isMessagingSupported();
    if (!supported) return null;
    if (!messaging) {
      messaging = getMessaging(getFirebaseApp());
    }
    return messaging;
  } catch {
    return null;
  }
};
