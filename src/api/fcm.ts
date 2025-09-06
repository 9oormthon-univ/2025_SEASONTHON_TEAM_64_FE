// src/api/fcm.ts
const API_BASE = "https://api.planhub.site";

export async function registerFcmToken(memberId: number, token: string) {
  const body = JSON.stringify({ token });

  // (선택) 사용자 인증 토큰을 사용하는 경우
  const accessToken = sessionStorage.getItem("accessToken");

  const res = await fetch(`${API_BASE}/api/v1/members/${memberId}/fcm-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
    body,
  });

  if (!res.ok) {
    // 400/404 등 명세서에 맞춘 에러 처리
    const msg = await res.text().catch(() => "");
    throw new Error(`FCM 토큰 등록 실패 (${res.status}) ${msg}`);
  }

  // 성공시 메시지 반환 (명세 예시)
  try {
    const data = await res.json();
    return data?.message ?? "FCM 토큰이 정상적으로 등록되었습니다.";
  } catch {
    return "FCM 토큰이 정상적으로 등록되었습니다.";
  }
}
