// src/auth/api.ts
import axios from "axios";

// Axios 인터페이스 확장 (필요시 사용)

export const api = axios.create({
  baseURL: "https://api.planhub.site/api/v1", // ✅ 백엔드 서버 주소 + v1 포함
  timeout: 15000,
});

// 요청 인터셉터: 토큰 자동 첨부
api.interceptors.request.use((config: any) => {
  console.log('🚀 API 요청 시작:', { url: config.url, method: config.method, authRequired: config.authRequired });
  
  if (config.authRequired !== false) {
    const at = sessionStorage.getItem("accessToken");
    const rt = sessionStorage.getItem("refreshToken");
    console.log('🔐 토큰 상태:', { 
      hasAccessToken: !!at, 
      accessTokenLength: at?.length,
      hasRefreshToken: !!rt,
      refreshTokenLength: rt?.length,
      accessTokenPreview: at ? at.substring(0, 20) + '...' : '없음'
    });
    config.headers = config.headers ?? {};
    if (at) {
      (config.headers as any).Authorization = `Bearer ${at}`;
      console.log('✅ Authorization 헤더 첨부됨:', `Bearer ${at.substring(0, 20)}...`);
    } else {
      console.log('❌ AccessToken 없음 - Authorization 헤더 미첨부');
    }
  } else {
    console.log('🚫 authRequired: false - Authorization 헤더 미첨부');
  }
  return config;
});

// 응답 인터셉터: 401 → 리프레시 토큰 처리
let refreshing = false;
let waiters: Array<() => void> = [];

api.interceptors.response.use(
  (r) => r,
  async (err: any) => {
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
        console.log('🔄 토큰 갱신 시작:', { 
          hasRefreshToken: !!rt, 
          refreshTokenLength: rt?.length,
          refreshTokenPreview: rt ? rt.substring(0, 20) + '...' : '없음'
        });
        
        if (!rt) {
          console.log('❌ 리프레시 토큰 없음, 로그인 페이지로 이동');
          sessionStorage.clear();
          // 무한 루프 방지를 위해 현재 페이지가 이미 로그인 페이지가 아닐 때만 이동
          if (!window.location.pathname.includes('/main')) {
            window.location.href = '/main';
          }
          throw new Error("no refresh token");
        }

        console.log('🔄 토큰 갱신 API 호출:', '/auth/reissue');
        
        const at = sessionStorage.getItem("accessToken");
        
        console.log('📦 토큰 갱신 요청 데이터:', {
          hasAccessToken: !!at,
          accessTokenLength: at?.length,
          hasRefreshToken: !!rt,
          refreshTokenLength: rt?.length,
          authRequired: false
        });
        
        const { data }: any = await api.post("/auth/reissue", { 
          accessToken: at, 
          refreshToken: rt 
        }, { authRequired: false });
        console.log('✅ 토큰 갱신 응답:', { 
          hasNewAccessToken: !!data?.accessToken,
          hasNewRefreshToken: !!data?.refreshToken,
          newAccessTokenLength: data?.accessToken?.length
        });
        
        if (data?.accessToken) {
          sessionStorage.setItem("accessToken", data.accessToken);
          console.log('✅ 새 AccessToken 저장됨');
        }
        if (data?.refreshToken) {
          sessionStorage.setItem("refreshToken", data.refreshToken);
          console.log('✅ 새 RefreshToken 저장됨');
        }

        waiters.forEach((f) => f());
        waiters = [];

        original.headers = original.headers ?? {};
        const newAccessToken = sessionStorage.getItem("accessToken");
        (original.headers as any).Authorization = `Bearer ${newAccessToken}`;
        console.log('🔄 원본 요청 재시도:', { 
          url: original.url, 
          method: original.method,
          hasNewToken: !!newAccessToken
        });
        return api(original);
      } catch (refreshError: any) {
        console.log('❌ 토큰 갱신 실패, 로그인 페이지로 이동:', refreshError);
        console.log('🔍 토큰 갱신 실패 상세:', {
          status: refreshError.response?.status,
          statusText: refreshError.response?.statusText,
          data: refreshError.response?.data,
          message: refreshError.message,
          url: refreshError.config?.url
        });
        sessionStorage.clear();
        // 무한 루프 방지를 위해 현재 페이지가 이미 로그인 페이지가 아닐 때만 이동
        if (!window.location.pathname.includes('/main')) {
          window.location.href = '/main';
        }
        throw refreshError;
      } finally {
        refreshing = false;
      }
    }
    return Promise.reject(err);
  }
);
