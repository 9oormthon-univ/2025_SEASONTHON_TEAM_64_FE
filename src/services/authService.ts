import { api } from '../Landing/auth/api';

// 회원 정보 타입
export interface MemberInfo {
  memberId: number;
  nickname: string;
  profileImageUrl: string;
  role: string;
}

export const authService = {
  // 회원 정보 조회 - GET /api/v1/members
  async getMemberInfo(): Promise<MemberInfo | null> {
    console.log('👤 getMemberInfo 호출 시작');
    try {
      const url = '/members';
      console.log('🌐 API 요청 URL:', url);
      console.log('🔗 최종 요청 URL:', `https://api.planhub.site/api/v1${url}`);
      console.log('📊 요청 헤더:', {
        'Authorization': sessionStorage.getItem('accessToken') ? 'Bearer ' + sessionStorage.getItem('accessToken') : '없음'
      });
      
      const res = await api.get(url);
      console.log('✅ API 응답 성공:', res.data);
      return res.data as MemberInfo;
    } catch (e: any) {
      console.log('💥 회원 정보 조회 에러:', e);
      console.log('🔍 에러 상세 정보:', {
        status: e.response?.status,
        statusText: e.response?.statusText,
        data: e.response?.data,
        message: e.message,
        url: e.config?.url,
        fullUrl: e.config?.baseURL + e.config?.url
      });
      
      // 인증 실패 시 로그인 페이지로 리다이렉트 (무한 루프 방지)
      if (e.response?.status === 401) {
        console.log('❌ 인증 실패, 로그인 페이지로 이동');
        sessionStorage.clear();
        // 현재 페이지가 이미 로그인 페이지가 아닐 때만 이동
        if (!window.location.pathname.includes('/main')) {
          window.location.href = '/main';
        }
      }
      
      return null;
    }
  },

  // FCM 토큰 등록 - POST /api/v1/members/{memberId}/fcm-token
  async registerFcmToken(memberId: number, fcmToken: string): Promise<boolean> {
    console.log('📱 registerFcmToken 호출 시작:', { memberId, tokenLength: fcmToken.length });
    try {
      const url = `/members/${memberId}/fcm-token`;
      const requestBody = { token: fcmToken };
      
      console.log('🌐 API 요청 URL:', url);
      console.log('🔗 최종 요청 URL:', `https://api.planhub.site/api/v1${url}`);
      console.log('📊 요청 헤더:', {
        'Authorization': sessionStorage.getItem('accessToken') ? 'Bearer ' + sessionStorage.getItem('accessToken') : '없음'
      });
      
      const res = await api.post(url, requestBody);
      console.log('✅ API 응답 성공:', res.data);
      return true;
    } catch (e: any) {
      console.log('💥 FCM 토큰 등록 에러:', e);
      console.log('🔍 에러 상세 정보:', {
        status: e.response?.status,
        statusText: e.response?.statusText,
        data: e.response?.data,
        message: e.message,
        url: e.config?.url,
        fullUrl: e.config?.baseURL + e.config?.url
      });
      
      // 인증 실패 시 로그인 페이지로 리다이렉트 (무한 루프 방지)
      if (e.response?.status === 401) {
        console.log('❌ 인증 실패, 로그인 페이지로 이동');
        sessionStorage.clear();
        // 현재 페이지가 이미 로그인 페이지가 아닐 때만 이동
        if (!window.location.pathname.includes('/main')) {
          window.location.href = '/main';
        }
      }
      
      return false;
    }
  },

  // 인증 상태 확인
  isAuthenticated(): boolean {
    const accessToken = sessionStorage.getItem('accessToken');
    const refreshToken = sessionStorage.getItem('refreshToken');
    
    console.log('🔐 인증 상태 확인:', {
      hasAccessToken: !!accessToken,
      hasRefreshToken: !!refreshToken,
      accessTokenLength: accessToken?.length,
      refreshTokenLength: refreshToken?.length
    });
    
    return !!(accessToken && refreshToken);
  },

  // 로그아웃
  logout(): void {
    console.log('🚪 로그아웃 실행');
    sessionStorage.clear();
    localStorage.removeItem('memberId');
    window.location.href = '/main';
  },

  // 토큰 상태 디버깅용 함수
  debugTokenStatus(): void {
    const accessToken = sessionStorage.getItem('accessToken');
    const refreshToken = sessionStorage.getItem('refreshToken');
    
    console.log('🔍 토큰 상태 디버깅:', {
      hasAccessToken: !!accessToken,
      accessTokenLength: accessToken?.length,
      accessTokenPreview: accessToken ? accessToken.substring(0, 30) + '...' : '없음',
      hasRefreshToken: !!refreshToken,
      refreshTokenLength: refreshToken?.length,
      refreshTokenPreview: refreshToken ? refreshToken.substring(0, 30) + '...' : '없음',
      currentPath: window.location.pathname
    });
  }
};