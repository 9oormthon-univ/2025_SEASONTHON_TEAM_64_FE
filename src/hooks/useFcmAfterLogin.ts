import { useEffect, useState } from "react";
import { requestFcmToken, attachForegroundMessageLogger } from "../lib/firebase";
import { registerFcmToken } from "../api/fcm";

const LS_KEY = "fcmToken:last-registered";

export function useFcmRegister(memberId: number | null | undefined) {
  const [status, setStatus] = useState<"idle" | "requesting" | "registered" | "denied" | "unsupported" | "error">("idle");
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      if (!("Notification" in window)) {
        setStatus("unsupported");
        return;
      }

      if (Notification.permission === "default") {
        try { await Notification.requestPermission(); } catch {}
      }
      if (Notification.permission !== "granted") {
        setStatus("denied");
        return;
      }

      setStatus("requesting");
      attachForegroundMessageLogger();

      const current = await requestFcmToken();
      if (cancelled) return;

      if (!current) {
        setStatus("error");
        setError("FCM 토큰을 가져오지 못했습니다.");
        return;
      }
      setToken(current);

      const last = localStorage.getItem(LS_KEY);
      if (memberId && last !== current) {
        try {
          await registerFcmToken(memberId, current);
          localStorage.setItem(LS_KEY, current);
          setStatus("registered");
        } catch (e: any) {
          setStatus("error");
          setError(e?.message || "토큰 등록 실패");
        }
      } else {
        setStatus("registered");
      }
    })();

    return () => { cancelled = true; };
  }, [memberId]);

  return { status, token, error };
}
