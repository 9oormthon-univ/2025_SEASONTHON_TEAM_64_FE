import { api } from '../Landing/auth/api';

// -------- 이미지 업로드 API + Fallback 설정 --------
const API_BASE = '/images';

// 로컬 폴백용 이미지 URL 생성
function createLocalImageUrl(file: File): string {
  return URL.createObjectURL(file);
}

// 로컬 이미지 URL 정리
function revokeLocalImageUrl(url: string) {
  if (url.startsWith('blob:')) {
    URL.revokeObjectURL(url);
  }
}

export const imageService = {
  // 이미지 업로드 - POST /api/v1/images/upload
  async uploadImage(file: File): Promise<string> {
    console.log('📤 uploadImage 호출 시작:', { fileName: file.name, fileSize: file.size });
    
    // 파일 크기 검증 (10MB 제한)
    if (file.size > 10 * 1024 * 1024) {
      throw new Error('파일 크기는 10MB 이하여야 합니다.');
    }
    
    // 파일 타입 검증
    if (!file.type.startsWith('image/')) {
      throw new Error('이미지 파일만 업로드 가능합니다.');
    }

    try {
      const formData = new FormData();
      formData.append('file', file);
      
      console.log('🌐 API 요청 URL:', `${API_BASE}/upload`);
      console.log('🔗 최종 요청 URL:', `https://api.planhub.site/api/v1${API_BASE}/upload`);
      console.log('📊 FormData 내용:', {
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        hasFile: formData.has('file')
      });
      console.log('📊 요청 헤더:', {
        'Authorization': sessionStorage.getItem('accessToken') ? 'Bearer ' + sessionStorage.getItem('accessToken') : '없음',
        'Content-Type': 'multipart/form-data'
      });
      
      const res = await api.post(`${API_BASE}/upload`, formData);
      
      console.log('✅ API 응답 성공:', res.data);
      console.log('📊 응답 상태:', res.status);
      
      // API 응답에서 이미지 URL 추출
      const imageUrl = res.data as string;
      return imageUrl;
      
    } catch (e: any) {
      console.log('💥 이미지 업로드 에러, 폴백 사용:', e);
      console.log('🔍 에러 상세 정보:', {
        status: e.response?.status,
        statusText: e.response?.statusText,
        data: e.response?.data,
        message: e.message,
        url: e.config?.url,
        fullUrl: e.config?.baseURL + e.config?.url
      });
      
      // Fallback: 로컬 blob URL 생성
      console.log('🔄 폴백: 로컬 이미지 URL 생성');
      return createLocalImageUrl(file);
    }
  },

  // 이미지 삭제 - DELETE /api/v1/images
  async deleteImage(imageUrl: string): Promise<void> {
    console.log('🗑️ deleteImage 호출 시작:', { imageUrl });
    
    try {
      const params = new URLSearchParams();
      params.set('url', imageUrl);
      const url = `${API_BASE}?${params.toString()}`;
      
      console.log('🌐 API 요청 URL:', url);
      console.log('🔗 최종 요청 URL:', `https://api.planhub.site/api/v1${url}`);
      console.log('📊 요청 헤더:', {
        'Authorization': sessionStorage.getItem('accessToken') ? 'Bearer ' + sessionStorage.getItem('accessToken') : '없음'
      });
      
      const res = await api.delete(url);
      console.log('✅ API 응답 성공:', res.status);
      
    } catch (e: any) {
      console.log('💥 이미지 삭제 에러:', e);
      console.log('🔍 에러 상세 정보:', {
        status: e.response?.status,
        statusText: e.response?.statusText,
        data: e.response?.data,
        message: e.message,
        url: e.config?.url,
        fullUrl: e.config?.baseURL + e.config?.url
      });
      
      // Fallback: 로컬 blob URL 정리
      if (imageUrl.startsWith('blob:')) {
        console.log('🔄 폴백: 로컬 이미지 URL 정리');
        revokeLocalImageUrl(imageUrl);
      }
      
      // 에러를 다시 던지지 않고 조용히 처리 (이미지 삭제 실패는 치명적이지 않음)
      console.log('⚠️ 이미지 삭제 실패했지만 계속 진행');
    }
  },

  // 이미지 미리보기 생성 (로컬용)
  createPreview(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target?.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  },

  // 이미지 URL 정리 (컴포넌트 언마운트 시 호출)
  cleanupImageUrl(url: string) {
    revokeLocalImageUrl(url);
  }
};
