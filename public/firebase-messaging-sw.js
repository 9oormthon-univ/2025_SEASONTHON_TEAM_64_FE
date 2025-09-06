/* eslint-disable no-undef */
importScripts("https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyC3rabNEBtvb1m68IoqTg_zhXGg1gNWMlM",
  authDomain: "nocheongmaru-6fe03.firebaseapp.com",
  projectId: "nocheongmaru-6fe03",
  storageBucket: "nocheongmaru-6fe03.firebasestorage.app",
  messagingSenderId: "503596380628",
  appId: "1:503596380628:web:614f2010306d64dd882641",
  measurementId: "G-6E94Z324GL",
});

const messaging = firebase.messaging();

// 앱이 꺼져있을 때 수신되는 푸시 처리
messaging.onBackgroundMessage((payload) => {
  const title = payload?.notification?.title || "알림";
  const options = {
    body: payload?.notification?.body || "",
    icon: payload?.notification?.icon,
    data: payload?.data || {},
  };
  self.registration.showNotification(title, options);
});

// 최신 SW 바로 활성화
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));
