// src/auth/token.ts
export function getAccessToken() {
  return sessionStorage.getItem("accessToken") || "";
}

export function getRefreshToken() {
  return sessionStorage.getItem("refreshToken") || "";
}

function parseJwt(token: string) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload); // { exp?: number, ... }
  } catch {
    return null;
  }
}

function isExpired(jwt?: { exp?: number }) {
  if (!jwt?.exp) return false; // exp 없으면 만료 판단 안 함
  const nowSec = Math.floor(Date.now() / 1000);
  return jwt.exp <= nowSec;
}

export function isAuthenticated() {
  const at = getAccessToken();
  const rt = getRefreshToken();
  if (!at || !rt) return false;

  const payload = parseJwt(at);
  if (isExpired(payload || undefined)) {
    // 만료로 보이면 비워두기(선택)
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    return false;
  }
  return true;
}
