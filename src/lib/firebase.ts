import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage, isSupported } from "firebase/messaging";
import type { Messaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyC3rabNEBtvb1m68IoqTg_zhXGg1gNWMlM",
  authDomain: "nocheongmaru-6fe03.firebaseapp.com",
  projectId: "nocheongmaru-6fe03",
  storageBucket: "nocheongmaru-6fe03.firebasestorage.app",
  messagingSenderId: "503596380628",
  appId: "1:503596380628:web:614f2010306d64dd882641",
  measurementId: "G-6E94Z324GL",
};

// Web Push VAPID 공개키
export const VAPID_KEY =
  "BIVumQFkAijxw4ucLtuGPsW-gp3ESSpbjDXyorHDo630-F9Mq46ZmhHFaDuQqWYzPHvwVjNgOb_wQgrLyx_z9Zs";

export const firebaseApp = initializeApp(firebaseConfig);

export async function getMessagingSafe(): Promise<Messaging | null> {
  const supported = await isSupported().catch(() => false);
  return supported ? getMessaging(firebaseApp) : null;
}

// 포그라운드 수신 로그 (선택)
export async function attachForegroundMessageLogger() {
  const messaging = await getMessagingSafe();
  if (!messaging) return;
  onMessage(messaging, (payload) => {
    console.info("[FCM onMessage] foreground:", payload);
  });
}

/**
 * FCM 토큰 요청
 * - 서비스워커가 ready 상태가 된 뒤 그 registration을 getToken에 넘겨준다.
 */
export async function requestFcmToken(): Promise<string | null> {
  const messaging = await getMessagingSafe();
  if (!messaging) return null;

  try {
    const reg = await navigator.serviceWorker.ready;

    const token = await getToken(messaging, {
      vapidKey: VAPID_KEY,
      serviceWorkerRegistration: reg,
    });

    console.log("[FCM] token from SDK:", token); // ← 여기서 확인
    return token ?? null;
  } catch (e) {
    console.error("[FCM] getToken failed:", e);
    return null;
  }
}
