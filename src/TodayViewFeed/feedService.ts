import { api } from '../Landing/auth/api';

// -------- API + Fallback 설정 --------
const API_BASE = '/feeds';

// 피드 타입 정의
export interface FeedMember {
  memberId: number;
  nickname: string;
  profileImageUrl: string;
  role: string;
}

export interface FeedResponse {
  feedId: number;
  description: string;
  imageUrl: string;
  member: FeedMember;
  likeCount: number;
  commentCount: number;
  missionId: number;
}

export interface FeedCursorResponse {
  items: FeedResponse[];
  nextCursorId: number;
  hasNext: boolean;
}

export interface CreateFeedRequest {
  description: string;
  imageUrl: string;
  missionId: number;
}

export interface UpdateFeedRequest {
  description: string;
  imageUrl: string;
  missionId: number;
}

// 로컬 폴백 데이터
let localFeeds: FeedResponse[] = [];

// 폴백용 더미 피드 생성
function createDummyFeed(description: string, missionId: number = 1): FeedResponse {
  const feedId = Date.now();
  return {
    feedId,
    description,
    imageUrl: '/placeholder-image.jpg',
    member: {
      memberId: 1,
      nickname: '나',
      profileImageUrl: '/Feed_maru.png',
      role: 'ROLE_USER'
    },
    likeCount: 0,
    commentCount: 0,
    missionId
  };
}

// 로컬에 더미 피드 추가
function pushDummyFeed(description: string, missionId: number = 1): FeedResponse {
  const newFeed = createDummyFeed(description, missionId);
  localFeeds.unshift(newFeed);
  return newFeed;
}

// 초기 더미 데이터 설정
function initializeDummyFeeds() {
  if (localFeeds.length === 0) {
    localFeeds = [
      createDummyFeed('오늘 하늘 정말 예뻤어요!', 1),
      createDummyFeed('산책길에서 만난 고양이입니다', 1),
      createDummyFeed('오늘 점심 메뉴 추천해주세요!', 1),
      createDummyFeed('주말에 갈만한 곳 있나요?', 1)
    ];
  }
}

// 초기화
initializeDummyFeeds();

export const feedService = {
  // 피드 생성 - POST /api/v1/feeds/upload
  async createFeed(request: CreateFeedRequest): Promise<FeedResponse> {
    console.log('📝 createFeed 호출 시작:', request);
    try {
      const url = `${API_BASE}/upload`;
      console.log('🌐 API 요청 URL:', url);
      console.log('🔗 최종 요청 URL:', `https://api.planhub.site/api/v1${url}`);
      console.log('📊 요청 헤더:', {
        'Authorization': sessionStorage.getItem('accessToken') ? 'Bearer ' + sessionStorage.getItem('accessToken') : '없음'
      });
      
      const res = await api.post(url, request);
      console.log('✅ API 응답 성공:', res.data);
      console.log('📊 응답 상태:', res.status);
      return res.data as FeedResponse;
    } catch (e: any) {
      console.log('💥 피드 생성 에러, 폴백 사용:', e);
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
      return pushDummyFeed(request.description, request.missionId);
    }
  },

  // 피드 단건 조회 - GET /api/v1/feeds/{feedId}
  async getFeedById(feedId: number): Promise<FeedResponse | null> {
    console.log('🔍 getFeedById 호출 시작:', { feedId });
    try {
      const url = `${API_BASE}/${feedId}`;
      console.log('🌐 API 요청 URL:', url);
      console.log('🔗 최종 요청 URL:', `https://api.planhub.site/api/v1${url}`);
      
      const res = await api.get(url);
      console.log('✅ API 응답 성공:', res.data);
      return res.data as FeedResponse;
    } catch (e: any) {
      console.log('💥 피드 조회 에러, 폴백 사용:', e);
      console.log('🔍 에러 상세 정보:', {
        status: e.response?.status,
        statusText: e.response?.statusText,
        data: e.response?.data,
        message: e.message,
        url: e.config?.url,
        fullUrl: e.config?.baseURL + e.config?.url
      });
      return localFeeds.find(f => f.feedId === feedId) ?? null;
    }
  },

  // 피드 커서 페이지 조회 - GET /api/v1/feeds/cursor
  async getFeedsCursor(cursorId?: number, size: number = 5): Promise<FeedCursorResponse> {
    console.log('📋 getFeedsCursor 호출 시작:', { cursorId, size });
    try {
      const params = new URLSearchParams();
      if (cursorId) params.set('cursorId', String(cursorId));
      if (size) params.set('size', String(size));
      const url = `${API_BASE}/cursor?${params.toString()}`;
      console.log('🌐 API 요청 URL:', url);
      console.log('🔗 최종 요청 URL:', `https://api.planhub.site/api/v1${url}`);
      
      const res = await api.get(url);
      console.log('✅ API 응답 성공:', res.data);
      return res.data as FeedCursorResponse;
    } catch (e: any) {
      console.log('💥 피드 리스트 에러, 폴백 사용:', e);
      console.log('🔍 에러 상세 정보:', {
        status: e.response?.status,
        statusText: e.response?.statusText,
        data: e.response?.data,
        message: e.message,
        url: e.config?.url,
        fullUrl: e.config?.baseURL + e.config?.url
      });
      
      // Fallback: 로컬 배열을 cursorId 기준으로 슬라이싱
      const startIdx = cursorId ? localFeeds.findIndex(f => f.feedId === cursorId) + 1 : 0;
      const items = localFeeds.slice(startIdx, startIdx + size);
      const nextCursorId = items.length > 0 ? items[items.length - 1].feedId : 0;
      
      return {
        items,
        nextCursorId,
        hasNext: startIdx + size < localFeeds.length
      };
    }
  },

  // 피드 수정 - PUT /api/v1/feeds/{feedId}/put
  async updateFeed(feedId: number, request: UpdateFeedRequest): Promise<FeedResponse> {
    console.log('✏️ updateFeed 호출 시작:', { feedId, request });
    try {
      const url = `${API_BASE}/${feedId}/put`;
      console.log('🌐 API 요청 URL:', url);
      console.log('🔗 최종 요청 URL:', `https://api.planhub.site/api/v1${url}`);
      console.log('📊 요청 헤더:', {
        'Authorization': sessionStorage.getItem('accessToken') ? 'Bearer ' + sessionStorage.getItem('accessToken') : '없음'
      });
      
      const res = await api.put(url, request);
      console.log('✅ API 응답 성공:', res.data);
      return res.data as FeedResponse;
    } catch (e: any) {
      console.log('💥 피드 수정 에러, 폴백 사용:', e);
      console.log('🔍 에러 상세 정보:', {
        status: e.response?.status,
        statusText: e.response?.statusText,
        data: e.response?.data,
        message: e.message,
        url: e.config?.url,
        fullUrl: e.config?.baseURL + e.config?.url,
        requestData: e.config?.data
      });
      
      // Fallback: 로컬 데이터 업데이트
      const feedIndex = localFeeds.findIndex(f => f.feedId === feedId);
      if (feedIndex >= 0) {
        localFeeds[feedIndex] = {
          ...localFeeds[feedIndex],
          description: request.description,
          imageUrl: request.imageUrl,
          missionId: request.missionId
        };
        return localFeeds[feedIndex];
      } else {
        // 없으면 새로 생성
        return pushDummyFeed(request.description, request.missionId);
      }
    }
  },

  // 피드 삭제 - DELETE /api/v1/feeds/{feedId}/delete
  async deleteFeed(feedId: number): Promise<{ message: string }> {
    console.log('🗑️ deleteFeed 호출 시작:', { feedId });
    try {
      const url = `${API_BASE}/${feedId}/delete`;
      console.log('🌐 API 요청 URL:', url);
      console.log('🔗 최종 요청 URL:', `https://api.planhub.site/api/v1${url}`);
      console.log('📊 요청 헤더:', {
        'Authorization': sessionStorage.getItem('accessToken') ? 'Bearer ' + sessionStorage.getItem('accessToken') : '없음'
      });
      
      const res = await api.delete(url);
      console.log('✅ API 응답 성공:', res.data);
      return res.data as { message: string };
    } catch (e: any) {
      console.log('💥 피드 삭제 에러, 폴백 사용:', e);
      console.log('🔍 에러 상세 정보:', {
        status: e.response?.status,
        statusText: e.response?.statusText,
        data: e.response?.data,
        message: e.message,
        url: e.config?.url,
        fullUrl: e.config?.baseURL + e.config?.url
      });
      
      // Fallback: 로컬에서 삭제
      const feedIndex = localFeeds.findIndex(f => f.feedId === feedId);
      if (feedIndex >= 0) {
        localFeeds.splice(feedIndex, 1);
      }
      
      return { message: '정상적으로 삭제되었습니다.' };
    }
  }
};
