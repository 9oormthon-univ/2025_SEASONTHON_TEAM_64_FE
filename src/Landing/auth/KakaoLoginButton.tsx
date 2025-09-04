export default function KakaoLoginButton() {
  const API = import.meta.env.VITE_API_BASE_URL || "https://api.planhub.site";
  const FRONT = import.meta.env.VITE_FRONTEND_URL || window.location.origin;

  const handleLogin = () => {
    const redirectUri = `${FRONT}/oauth/callback`;
    window.location.href =
      `${API}/oauth2/authorization/kakao?redirect_uri=${encodeURIComponent(redirectUri)}`;
  };

  return <button onClick={handleLogin}>카카오로 로그인</button>;
}