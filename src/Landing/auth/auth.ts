import axios from "axios";

// .env 사용 시 우선 적용 (Vite/CRA 호환)
const API_BASE_URL =
  (import.meta as any)?.env?.VITE_API_BASE_URL ||
  (process as any)?.env?.REACT_APP_API_BASE_URL ||
  "https://api.planhub.site";

function stripBearer(token: string | null) {
  if (!token) return null;
  return token.startsWith("Bearer ") ? token.slice(7) : token;
}

/**
 * /api/v1/auth/reissue 호출해서 새 토큰 발급
 * - 세션에서 access/refresh 읽어와 Bearer 제거 후 전송
 * - 성공 시 세션에 새 토큰 저장, 새 accessToken 반환
 */
export async function reissueToken(): Promise<string> {
  const rawAccess = sessionStorage.getItem("accessToken");
  const rawRefresh = sessionStorage.getItem("refreshToken");
  const accessToken = stripBearer(rawAccess);
  const refreshToken = stripBearer(rawRefresh);

  if (!accessToken || !refreshToken) {
    console.warn("[reissue] 세션에 토큰이 없습니다.", { rawAccess, rawRefresh });
    throw new Error("저장된 토큰이 없습니다.");
  }

  try {
    const payload = { accessToken, refreshToken };
    console.log("[reissue] 요청 페이로드:", payload);

    const res = await axios.post(`${API_BASE_URL}/api/v1/auth/reissue`, payload, {
      headers: { "Content-Type": "application/json" },
      validateStatus: () => true, // 상태코드에 막히지 않고 본문 확인
    });

    console.log("[reissue] 응답 상태:", res.status);
    console.log("[reissue] 응답 데이터:", res.data);

    if (res.status >= 400) {
      throw new Error(`Reissue failed ${res.status}: ${JSON.stringify(res.data)}`);
    }

    const { accessToken: newAccess, refreshToken: newRefresh } = res.data || {};
    if (!newAccess || !newRefresh) {
      throw new Error("응답에 새 토큰이 없습니다.");
    }

    sessionStorage.setItem("accessToken", newAccess);
    sessionStorage.setItem("refreshToken", newRefresh);

    return newAccess;
  } catch (error: any) {
    console.error("토큰 재발급 실패:", {
      status: error?.response?.status,
      data: error?.response?.data,
      message: error?.message,
    });
    throw error;
  }
}

/** 유틸: 현재 저장된 accessToken 반환 (Bearer 포함형으로) */
export function getAuthHeaderValue(): string | null {
  const t = sessionStorage.getItem("accessToken");
  if (!t) return null;
  return t.startsWith("Bearer ") ? t : `Bearer ${t}`;
}

/** 실패/로그아웃 시 토큰 제거 */
export function clearTokens() {
  sessionStorage.removeItem("accessToken");
  sessionStorage.removeItem("refreshToken");
}
