import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import { reissueToken, getAuthHeaderValue, clearTokens } from "./auth";

// .env 사용 시 우선 적용 (Vite/CRA 호환)
const API_BASE_URL =
  (import.meta as any)?.env?.VITE_API_BASE_URL ||
  (process as any)?.env?.REACT_APP_API_BASE_URL ||
  "https://api.planhub.site";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// ===== 요청 인터셉터: Authorization 자동 부착 =====
axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const auth = getAuthHeaderValue();
  if (auth) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = auth;
  }
  return config;
});

// ===== 동시 401 처리용 락/큐 =====
let refreshing = false;
let waiters: ((token: string) => void)[] = [];

function notifyWaiters(newToken: string) {
  waiters.forEach((resolve) => resolve(newToken));
  waiters = [];
}

// ===== 응답 인터셉터: 401 → 재발급 → 원요청 재시도 =====
axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const status = error?.response?.status;
    const original: (AxiosRequestConfig & { _retry?: boolean }) = error.config || {};

    // 401이 아니면 그대로 실패
    if (status !== 401) return Promise.reject(error);

    // 무한 재시도 방지
    if (original._retry) return Promise.reject(error);
    original._retry = true;

    try {
      if (!refreshing) {
        refreshing = true;
        const newAccess = await reissueToken(); // 재발급 수행
        refreshing = false;
        notifyWaiters(newAccess);
      }

      // 다른 요청이 먼저 재발급 중이면 완료될 때까지 대기
      const newToken: string = await new Promise((resolve) => waiters.push(resolve));

      // 원래 요청에 새 토큰 부착 후 재시도
      original.headers = original.headers ?? {};
      original.headers.Authorization = `Bearer ${newToken}`;
      return axiosInstance.request(original);
    } catch (e) {
      // 재발급 실패 → 토큰 클리어 & 필요 시 라우팅
      refreshing = false;
      waiters = [];
      clearTokens();
      // window.location.replace("/main"); // 필요 시 사용
      return Promise.reject(e);
    }
  }
);

export default axiosInstance;
