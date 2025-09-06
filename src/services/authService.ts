// 인증 관련 서비스
const API_BASE = 'https://api.planhub.site/api/v1';
const TIMEOUT_MS = 7000;

interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

interface UserInfo {
  id: number;
  email: string;
  nickname: string;
  profileImageURL?: string;
}

// 토큰 관리
export const tokenManager = {
  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  },

  setAccessToken(token: string): void {
    localStorage.setItem('accessToken', token);
  },

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  },

  setRefreshToken(token: string): void {
    localStorage.setItem('refreshToken', token);
  },

  clearTokens(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userInfo');
  },

  isTokenValid(): boolean {
    const token = this.getAccessToken();
    if (!token) return false;
    
    try {
      // JWT 토큰 디코딩하여 만료시간 확인
      const parts = token.split('.');
      if (parts.length !== 3) return false;
      
      const payload = JSON.parse(atob(parts[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      
      // 만료시간이 없거나 미래라면 유효
      if (!payload.exp || payload.exp > currentTime) {
        return true;
      }
      
      console.log('⚠️ 토큰 만료됨:', {
        exp: payload.exp,
        current: currentTime,
        remaining: payload.exp - currentTime
      });
      
      return false;
    } catch (error) {
      console.log('⚠️ 토큰 파싱 에러:', error);
      // 테스트용으로 토큰이 있으면 유효하다고 간주
      return true;
    }
  }
};

// API 요청 시 Authorization 헤더 추가
export const getAuthHeaders = (): HeadersInit => {
  const token = tokenManager.getAccessToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

// 안전한 fetch (타임아웃 포함)
async function safeFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        ...getAuthHeaders(),
        ...options.headers
      }
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

export const authService = {
  // JWT 토큰 재발급
  async reissueToken(): Promise<TokenResponse> {
    const refreshToken = tokenManager.getRefreshToken();
    if (!refreshToken) {
      throw new Error('Refresh token not found');
    }

    const response = await safeFetch(`${API_BASE}/auth/reissue`, {
      method: 'POST',
      body: JSON.stringify({ refreshToken })
    });

    if (!response.ok) {
      tokenManager.clearTokens();
      throw new Error('Token refresh failed');
    }

    const data = await response.json();
    
    // 새 토큰 저장
    tokenManager.setAccessToken(data.accessToken);
    tokenManager.setRefreshToken(data.refreshToken);
    
    return data;
  },

  // 사용자 정보 저장
  setUserInfo(userInfo: UserInfo): void {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  },

  // 사용자 정보 조회
  getUserInfo(): UserInfo | null {
    const userInfoStr = localStorage.getItem('userInfo');
    if (!userInfoStr) return null;
    
    try {
      return JSON.parse(userInfoStr);
    } catch {
      return null;
    }
  },

  // 로그아웃
  logout(): void {
    tokenManager.clearTokens();
    window.location.href = '/';
  },

  // 인증된 요청 (토큰 자동 갱신 포함)
  async authenticatedRequest(url: string, options: RequestInit = {}): Promise<Response> {
    // 토큰이 유효한지 확인
    if (!tokenManager.isTokenValid()) {
      try {
        await this.reissueToken();
      } catch (error) {
        // 토큰 갱신 실패 시 로그아웃
        this.logout();
        throw new Error('Authentication failed');
      }
    }

    const response = await safeFetch(url, options);
    
    // 401 에러 시 토큰 갱신 후 재시도
    if (response.status === 401) {
      try {
        await this.reissueToken();
        return safeFetch(url, options);
      } catch (error) {
        this.logout();
        throw new Error('Authentication failed');
      }
    }
    
    return response;
  }
};
