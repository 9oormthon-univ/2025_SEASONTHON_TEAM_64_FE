// src/auth/api.ts
import axios, { AxiosError } from "axios";

declare module "axios" {
  export interface AxiosRequestConfig {
    authRequired?: boolean;
    _retry?: boolean;
  }
}

export const api = axios.create({
  baseURL: "https://api.planhub.site/api/v1", // ✅ 백엔드 서버 주소 + v1 포함
  timeout: 15000,
});

// 요청 인터셉터: 토큰 자동 첨부
api.interceptors.request.use((config) => {
  console.log('🚀 API 요청 시작:', { url: config.url, method: config.method });
  if (config.authRequired !== false) {
    const at = sessionStorage.getItem("accessToken");
    console.log('🔐 토큰 상태:', { hasToken: !!at, tokenLength: at?.length });
    config.headers = config.headers ?? {};
    if (at) (config.headers as any).Authorization = `Bearer ${at}`;
  }
  return config;
});

// 응답 인터셉터: 401 → 리프레시 토큰 처리
let refreshing = false;
let waiters: Array<() => void> = [];

api.interceptors.response.use(
  (r) => r,
  async (err: AxiosError) => {
    const original: any = err.config;
    if (original?.authRequired === false) return Promise.reject(err);

    if (err.response?.status === 401 && original && !original._retry) {
      original._retry = true;

      if (refreshing) {
        await new Promise<void>((res) => waiters.push(res));
        original.headers = original.headers ?? {};
        (original.headers as any).Authorization = `Bearer ${sessionStorage.getItem("accessToken")}`;
        return api(original);
      }

      try {
        refreshing = true;
        const rt = sessionStorage.getItem("refreshToken");
        if (!rt) {
          console.log('❌ 리프레시 토큰 없음, 로그인 페이지로 이동');
          sessionStorage.clear();
          window.location.href = '/main';
          throw new Error("no refresh token");
        }

        const { data }: any = await api.post("/auth/reissue", { refreshToken: rt });
        if (data?.accessToken) sessionStorage.setItem("accessToken", data.accessToken);
        if (data?.refreshToken) sessionStorage.setItem("refreshToken", data.refreshToken);

        waiters.forEach((f) => f());
        waiters = [];

        original.headers = original.headers ?? {};
        (original.headers as any).Authorization = `Bearer ${sessionStorage.getItem("accessToken")}`;
        return api(original);
      } catch (refreshError) {
        console.log('❌ 토큰 갱신 실패, 로그인 페이지로 이동:', refreshError);
        sessionStorage.clear();
        window.location.href = '/main';
        throw refreshError;
      } finally {
        refreshing = false;
      }
    }
    return Promise.reject(err);
  }
);
