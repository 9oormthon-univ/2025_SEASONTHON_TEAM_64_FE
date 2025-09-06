// src/Landing/auth/OauthCallback.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../auth/api"; // axios 인스턴스 예시

export default function OauthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const qs = new URLSearchParams(window.location.search);
    const access = qs.get("accessToken");
    const refresh = qs.get("refreshToken");

    if (access && refresh) {
      // 1. 세션스토리지 저장
      sessionStorage.setItem("accessToken", access);
      sessionStorage.setItem("refreshToken", refresh);

      // 2. URL 정리 (쿼리 제거)
      window.history.replaceState(null, "", "/");

      // 3. 회원 정보 요청
      api
        .get("/api/v1/members/me", {
          headers: { Authorization: `Bearer ${access}` },
        })
        .then(({ data }) => {
          // 예: data.role === "ROLE_ADMIN" / "ROLE_USER"
          const role = data?.role;

          if (role === "ROLE_ADMIN") {
            navigate("/managerhome", { replace: true });
          } else {
            navigate("/feed", { replace: true });
          }
        })
        .catch(() => {
          navigate("/", { replace: true });
        });
    } else {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  return <div>로그인 처리 중...</div>;
}
