// src/Landing/auth/RequireAuth.tsx
import { Navigate, Outlet, useLocation } from "react-router-dom";

/** 토큰 존재 여부로만 간단히 보호 (원하면 유틸 isAuthenticated 써도 OK) */
function hasToken() {
  const access = sessionStorage.getItem("accessToken");
  return Boolean(access);
}

/** 보호 라우트: 토큰 없으면 "/"로 보냄 (로그인 페이지 사용 안 함) */
export default function RequireAuth() {
  const location = useLocation();

  if (!hasToken()) {
    // 로그인 페이지를 쓰지 않으므로, 메인으로 리다이렉트
    return <Navigate to="/" replace state={{ from: location }} />;
  }
  return <Outlet />;
}
