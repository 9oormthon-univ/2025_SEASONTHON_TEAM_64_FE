import { useEffect, useState } from "react";
import { issueFcmToken, onForegroundMessage } from "../lib/firebase";
import { registerFcmToken } from "../api/fcm";

const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY as string;

export default function FcmBootstrap({ memberId, accessToken }:{
  memberId: number; accessToken: string;
}) {
  const [status, setStatus] = useState("초기화 대기");
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    // 권한 요청 및 토큰 발급: 사용자 동작 후에 실행되는 것이 가장 좋습니다.
    (async () => {
      setStatus("권한/토큰 발급 중...");
      const token = await issueFcmToken(VAPID_PUBLIC_KEY);
      if (!token) {
        // 권한 거부 또는 실패
        setStatus("권한 거부 또는 발급 실패");
        return;
      }
      try {
        // 발급된 토큰을 서버에 등록 요청
        await registerFcmToken(memberId, token, accessToken);
        setStatus("✅ 서버 등록 완료");
      } catch (e: any) {
        setErr(e.message || "등록 실패");
        setStatus("❌ 실패");
      }
    })();

    // 포그라운드 메시지 수신 설정 (이미 설정했다면 중복 X)
    onForegroundMessage((payload) => {
      console.log("FCM(포그라운드):", payload);
      // 필요에 따라 사용자에게 UI 알림 표시 등 추가 동작
    });
  }, [memberId, accessToken]);

  return <small style={{ color:"#666" }}>{status}{err ? ` — ${err}` : ""}</small>;
}
