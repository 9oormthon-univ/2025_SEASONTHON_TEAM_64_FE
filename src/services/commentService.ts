import { api } from '../Landing/auth/api';

// -------- 댓글 API + Fallback 설정 --------
const API_BASE = '/comments';

// 댓글 타입 정의
export interface CommentResponse {
  commentId: number;
  feedId: number;
  memberId: number;
  description: string;
  createdAt: string;
}

export interface CommentCursorResponse {
  items: CommentResponse[];
  nextCursorId: number;
  hasNext: boolean;
}

export interface CreateCommentRequest {
  description: string;
}

export interface UpdateCommentRequest {
  description: string;
}

// 로컬 폴백 데이터
let localComments: CommentResponse[] = [];

// 폴백용 더미 댓글 생성
function createDummyComment(feedId: number, description: string, memberId: number = 1): CommentResponse {
  const commentId = Date.now();
  return {
    commentId,
    feedId,
    memberId,
    description,
    createdAt: new Date().toISOString()
  };
}

// 로컬에 더미 댓글 추가
function pushDummyComment(feedId: number, description: string, memberId: number = 1): CommentResponse {
  const newComment = createDummyComment(feedId, description, memberId);
  localComments.unshift(newComment);
  return newComment;
}

export const commentService = {
  // 댓글 생성 - POST /api/v1/feeds/{feedId}/comments/upload
  async createComment(feedId: number, request: CreateCommentRequest): Promise<CommentResponse> {
    console.log('💬 createComment 호출 시작:', { feedId, request });
    try {
      const url = `/feeds/${feedId}/comments/upload`;
      console.log('🌐 API 요청 URL:', url);
      console.log('🔗 최종 요청 URL:', `https://api.planhub.site/api/v1${url}`);
      console.log('📊 요청 헤더:', {
        'Authorization': sessionStorage.getItem('accessToken') ? 'Bearer ' + sessionStorage.getItem('accessToken') : '없음'
      });
      
      const res = await api.post(url, request);
      console.log('✅ API 응답 성공:', res.data);
      console.log('📊 응답 상태:', res.status);
      return res.data as CommentResponse;
    } catch (e: any) {
      console.log('💥 댓글 생성 에러, 폴백 사용:', e);
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
      return pushDummyComment(feedId, request.description);
    }
  },

  // 댓글 커서 페이지 조회 - GET /api/v1/feeds/{feedId}/comments/cursor
  async getCommentsCursor(feedId: number, cursorId?: number, size: number = 10): Promise<CommentCursorResponse> {
    console.log('📋 getCommentsCursor 호출 시작:', { feedId, cursorId, size });
    try {
      const params = new URLSearchParams();
      if (cursorId) params.set('cursorId', String(cursorId));
      if (size) params.set('size', String(size));
      const url = `/feeds/${feedId}/comments/cursor?${params.toString()}`;
      console.log('🌐 API 요청 URL:', url);
      console.log('🔗 최종 요청 URL:', `https://api.planhub.site/api/v1${url}`);
      
      const res = await api.get(url);
      console.log('✅ API 응답 성공:', res.data);
      console.log('📊 응답 구조 분석:', {
        hasItems: !!res.data?.items,
        itemsLength: res.data?.items?.length,
        hasNextCursorId: !!res.data?.nextCursorId,
        hasNext: res.data?.hasNext,
        firstItem: res.data?.items?.[0]
      });
      return res.data as CommentCursorResponse;
    } catch (e: any) {
      console.log('💥 댓글 리스트 에러, 폴백 사용:', e);
      console.log('🔍 에러 상세 정보:', {
        status: e.response?.status,
        statusText: e.response?.statusText,
        data: e.response?.data,
        message: e.message,
        url: e.config?.url,
        fullUrl: e.config?.baseURL + e.config?.url
      });
      
      // Fallback: 로컬 배열을 cursorId 기준으로 슬라이싱
      const feedComments = localComments.filter(c => c.feedId === feedId);
      const startIdx = cursorId ? feedComments.findIndex(c => c.commentId === cursorId) + 1 : 0;
      const items = feedComments.slice(startIdx, startIdx + size);
      const nextCursorId = items.length > 0 ? items[items.length - 1].commentId : 0;
      
      console.log('🔄 폴백 데이터 반환:', { itemsCount: items.length, nextCursorId, hasNext: startIdx + size < feedComments.length });
      
      return {
        items,
        nextCursorId,
        hasNext: startIdx + size < feedComments.length
      };
    }
  },

  // 댓글 수정 - PUT /api/v1/comments/{commentId}
  async updateComment(commentId: number, request: UpdateCommentRequest): Promise<CommentResponse> {
    console.log('✏️ updateComment 호출 시작:', { commentId, request });
    try {
      const url = `${API_BASE}/${commentId}`;
      console.log('🌐 API 요청 URL:', url);
      console.log('🔗 최종 요청 URL:', `https://api.planhub.site/api/v1${url}`);
      console.log('📊 요청 헤더:', {
        'Authorization': sessionStorage.getItem('accessToken') ? 'Bearer ' + sessionStorage.getItem('accessToken') : '없음'
      });
      
      const res = await api.put(url, request);
      console.log('✅ API 응답 성공:', res.data);
      return res.data as CommentResponse;
    } catch (e: any) {
      console.log('💥 댓글 수정 에러, 폴백 사용:', e);
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
      const commentIndex = localComments.findIndex(c => c.commentId === commentId);
      if (commentIndex >= 0) {
        localComments[commentIndex] = {
          ...localComments[commentIndex],
          description: request.description
        };
        return localComments[commentIndex];
      } else {
        // 없으면 새로 생성
        return pushDummyComment(1, request.description);
      }
    }
  },

  // 댓글 삭제 - DELETE /api/v1/comments/{commentId}/delete
  async deleteComment(commentId: number): Promise<{ message: string }> {
    console.log('🗑️ deleteComment 호출 시작:', { commentId });
    try {
      const url = `${API_BASE}/${commentId}/delete`;
      console.log('🌐 API 요청 URL:', url);
      console.log('🔗 최종 요청 URL:', `https://api.planhub.site/api/v1${url}`);
      console.log('📊 요청 헤더:', {
        'Authorization': sessionStorage.getItem('accessToken') ? 'Bearer ' + sessionStorage.getItem('accessToken') : '없음'
      });
      
      const res = await api.delete(url);
      console.log('✅ API 응답 성공:', res.data);
      return res.data as { message: string };
    } catch (e: any) {
      console.log('💥 댓글 삭제 에러, 폴백 사용:', e);
      console.log('🔍 에러 상세 정보:', {
        status: e.response?.status,
        statusText: e.response?.statusText,
        data: e.response?.data,
        message: e.message,
        url: e.config?.url,
        fullUrl: e.config?.baseURL + e.config?.url
      });
      
      // Fallback: 로컬에서 삭제
      const commentIndex = localComments.findIndex(c => c.commentId === commentId);
      if (commentIndex >= 0) {
        localComments.splice(commentIndex, 1);
      }
      
      return { message: '정상적으로 삭제되었습니다.' };
    }
  }
};
