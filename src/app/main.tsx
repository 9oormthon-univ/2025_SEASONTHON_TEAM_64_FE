// src/app/main.tsx
import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Routers from "./Routers";
import { loadKakaoOnce } from "../LocalInfoShare/api/loadkakao";
import FcmRegistrar from "../components/FcmResister";
// react-query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

// 1) 먼저 즉시 렌더 (앱이 바로 뜨도록)
const rootEl = document.getElementById("root")!;
createRoot(rootEl).render(
  //<React.StrictMode> 스트립모드 자꾸 떠서 주석처리
    <QueryClientProvider client={queryClient}>
      <FcmRegistrar />
      <Routers />
    </QueryClientProvider>
  //</React.StrictMode>
);

// 2) 렌더 후에 카카오 SDK 비동기 프리로드 (실패해도 앱은 유지)
loadKakaoOnce().then(() => {
  console.log("[KAKAO] SDK ready");
}).catch((e) => {
  console.warn("[KAKAO] load error:", e);
});
