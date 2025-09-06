import type { FortuneCookieData } from './types';
import { api } from '../Landing/auth/api';

// -------- API + Fallback 설정 --------
const API_BASE = '/fortunes'; // ✅ baseURL에 이미 /api/v1이 포함되어 있음
const REQUEST_TIMEOUT_MS = 7000;

function getMemberId(): number {
  const saved = localStorage.getItem('memberId');
  const parsed = saved ? Number(saved) : 0;
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1; // 기본 1
}

// getSenderInfo 함수는 현재 사용하지 않음 (스웨거 스펙에 맞게 단순화)
// function getSenderInfo() {
//   // 세션스토리지에서 사용자 정보 가져오기
//   const accessToken = sessionStorage.getItem('accessToken');
//   const refreshToken = sessionStorage.getItem('refreshToken');
//   const userInfo = localStorage.getItem('userInfo');
//   
//   // 스웨거 스펙에 정확히 맞춘 기본 사용자 정보
//   const defaultSender = {
//     id: getMemberId(),
//     email: "user@example.com",
//     nickname: "사용자",
//     role: "ROLE_USER",
//     profileImageURL: "",
//     refreshToken: refreshToken || "",
//     fcmToken: "",
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//     lastOpenedDate: new Date().toISOString().split('T')[0] // YYYY-MM-DD 형식
//   };
//   
//   console.log('👤 Sender 정보 생성:', { 
//     memberId: getMemberId(), 
//     hasAccessToken: !!accessToken,
//     hasRefreshToken: !!refreshToken,
//     hasUserInfo: !!userInfo 
//   });
//   
//   if (userInfo) {
//     try {
//       const parsed = JSON.parse(userInfo);
//       const mergedSender = { ...defaultSender, ...parsed };
//       console.log('✅ 사용자 정보 병합 완료:', mergedSender);
//       return mergedSender;
//     } catch (e) {
//       console.warn('❌ 사용자 정보 파싱 실패:', e);
//     }
//   }
//   
//   console.log('📝 기본 Sender 정보 사용:', defaultSender);
//   return defaultSender;
// }

async function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const id = setTimeout(() => reject(new Error('Request timed out')), ms);
    promise
      .then((res) => {
        clearTimeout(id);
        resolve(res);
      })
      .catch((err) => {
        clearTimeout(id);
        reject(err);
      });
  });
}

// 메인 브랜치의 api 인스턴스 사용 (자동 토큰 처리)
// safeFetch는 더 이상 필요하지 않음

// -------- 로컬 더미 저장소 --------
let localFortunes: Array<{ id: number; description: string }> = [];
let localNextId = 1;

function pushDummyFortune(description: string) {
  const item = { id: localNextId++, description };
  localFortunes.unshift(item);
  return item;
}

export const fortuneService = {
  // 오늘의 포춘쿠키 작성 (1일 1회) - POST /api/v1/fortunes/send?memberId
  async sendFortune(memberId: number = getMemberId(), description: string): Promise<{ id: number; description: string }> {
    console.log('📝 sendFortune 호출 시작:', { memberId, description });
    try {
      const url = `${API_BASE}/send?memberId=${memberId}`;
      console.log('🌐 API 요청 URL:', url);
      console.log('🔗 최종 요청 URL:', `https://api.planhub.site/api/v1${url}`);
      
      const requestBody = {
        description
      };
      console.log('📦 요청 데이터:', requestBody);
      console.log('📊 요청 헤더:', {
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('accessToken') ? 'Bearer ' + sessionStorage.getItem('accessToken') : '없음'
      });
      
      const res = await api.post(url, requestBody);
      console.log('✅ API 응답 성공:', res.data);
      console.log('📊 응답 상태:', res.status);
      return res.data;
    } catch (e: any) {
      console.log('💥 포춘쿠키 전송 에러, 폴백 사용:', e);
      console.log('🔍 에러 상세 정보:', {
        status: e.response?.status,
        statusText: e.response?.statusText,
        data: e.response?.data,
        message: e.message,
        url: e.config?.url,
        fullUrl: e.config?.baseURL + e.config?.url,
        requestData: e.config?.data
      });
      // Fallback: 로컬에 저장
      return pushDummyFortune(description);
    }
  },

  // 오늘의 포춘쿠키 랜덤 열기 (1일 1회) - POST /api/v1/fortunes/open?memberId
  async openFortune(memberId: number = getMemberId()): Promise<{ id: number; description: string }> {
    console.log('🎯 openFortune 호출 시작:', { memberId, API_BASE });
    try {
      const url = `${API_BASE}/open?memberId=${memberId}`;
      console.log('🌐 API 요청 URL:', url);
      console.log('🔗 최종 요청 URL:', `https://api.planhub.site/api/v1${url}`);
      console.log('📊 요청 헤더:', {
        'Authorization': sessionStorage.getItem('accessToken') ? 'Bearer ' + sessionStorage.getItem('accessToken') : '없음'
      });
      
      const res = await api.post(url);
      console.log('✅ API 응답 성공:', res.data);
      console.log('📊 응답 상태:', res.status);
      return res.data;
    } catch (e: any) {
      console.log('💥 포춘쿠키 열기 에러, 폴백 사용:', e);
      console.log('🔍 에러 상세 정보:', {
        status: e.response?.status,
        statusText: e.response?.statusText,
        data: e.response?.data,
        message: e.message,
        url: e.config?.url,
        fullUrl: e.config?.baseURL + e.config?.url
      });
      
      // Fallback: 로컬 더미에서 하나 반환, 없으면 생성
      if (localFortunes.length === 0) pushDummyFortune('행운이 당신 곁에 머물 거예요.');
      console.log('🔄 폴백 데이터 반환:', localFortunes[0]);
      return localFortunes[0];
    }
  },

  // 단일 조회 - GET /api/v1/fortunes/{fortuneId}
  async getFortuneById(fortuneId: number): Promise<{ id: number; description: string } | null> {
    console.log('🔍 getFortuneById 호출 시작:', { fortuneId });
    try {
      const url = `${API_BASE}/${fortuneId}`;
      console.log('🌐 API 요청 URL:', url);
      console.log('🔗 최종 요청 URL:', `https://api.planhub.site/api/v1${url}`);
      
      const res = await api.get(url);
      console.log('✅ API 응답 성공:', res.data);
      return res.data;
    } catch (e: any) {
      console.log('💥 포춘쿠키 조회 에러, 폴백 사용:', e);
      console.log('🔍 에러 상세 정보:', {
        status: e.response?.status,
        statusText: e.response?.statusText,
        data: e.response?.data,
        message: e.message,
        url: e.config?.url,
        fullUrl: e.config?.baseURL + e.config?.url
      });
      return localFortunes.find(f => f.id === fortuneId) ?? null;
    }
  },

  // 커서 기반 리스트 - GET /api/v1/fortunes/cursor?cursorId&size
  async listFortunesCursor(cursorId?: number, size: number = 10): Promise<Array<{ id: number; description: string }>> {
    console.log('📋 listFortunesCursor 호출 시작:', { cursorId, size });
    try {
      const params = new URLSearchParams();
      if (cursorId) params.set('cursorId', String(cursorId));
      if (size) params.set('size', String(size));
      const url = `${API_BASE}/cursor?${params.toString()}`;
      console.log('🌐 API 요청 URL:', url);
      console.log('🔗 최종 요청 URL:', `https://api.planhub.site/api/v1${url}`);
      
      const res = await api.get(url);
      console.log('✅ API 응답 성공:', res.data);
      return res.data;
    } catch (e: any) {
      console.log('💥 포춘쿠키 리스트 에러, 폴백 사용:', e);
      console.log('🔍 에러 상세 정보:', {
        status: e.response?.status,
        statusText: e.response?.statusText,
        data: e.response?.data,
        message: e.message,
        url: e.config?.url,
        fullUrl: e.config?.baseURL + e.config?.url
      });
      // Fallback: 로컬 배열을 cursorId 기준으로 슬라이싱
      const startIdx = cursorId ? localFortunes.findIndex(f => f.id === cursorId) + 1 : 0;
      return localFortunes.slice(startIdx, startIdx + size);
    }
  },

  // Back-compat: 이전 컴포넌트에서 사용하는 메시지 전송 API 호환
  async sendFortuneMessage(content: string, sender: string): Promise<{ id: number; description: string }> {
    return this.sendFortune(getMemberId(), content);
  }
};
