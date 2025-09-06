import type { MissionItem } from './MissionContext';
import { api } from '../Landing/auth/api';

const API_BASE = '/v1';
const TIMEOUT_MS = 7000;

// 로컬 폴백 저장소
let localMissions: Array<{ id: string; description: string; createdAt: number }>= [];

export const missionService = {
  // 미션 등록 - POST /api/v1/missions/upload
  async createMission(title: string) {
    console.log('📝 createMission 호출 시작:', { title });
    try {
      const url = `${API_BASE}/missions/upload`;
      const requestBody = { title };
      console.log('🌐 API 요청 URL:', url);
      console.log('📦 요청 데이터:', requestBody);
      
      const res = await api.post(url, requestBody);
      console.log('✅ API 응답 성공:', res.data);
      
      // 로컬에도 저장
      const item = { 
        id: String(res.data.id ?? crypto.randomUUID()), 
        description: res.data.title ?? title, 
        createdAt: Date.now() 
      };
      localMissions.unshift(item);
      return res.data;
    } catch (e: any) {
      console.log('💥 미션 등록 에러, 폴백 사용:', e);
      console.log('🔍 에러 상세 정보:', {
        status: e.response?.status,
        statusText: e.response?.statusText,
        data: e.response?.data,
        message: e.message
      });
      
      // 폴백: 로컬에 저장
      const item = { id: crypto.randomUUID(), description: title, createdAt: Date.now() };
      localMissions.unshift(item);
      return item;
    }
  },

  // 미션 삭제 - DELETE /api/v1/missions/{id}
  async deleteMission(id: string | number) {
    console.log('🗑 deleteMission 호출 시작:', { id });
    try {
      const url = `${API_BASE}/missions/${id}`;
      console.log('🌐 API 요청 URL:', url);
      
      const res = await api.delete(url);
      console.log('✅ API 응답 성공:', res.status);
      
      // 로컬에서도 삭제
      localMissions = localMissions.filter(m => m.id !== String(id));
      return true;
    } catch (e: any) {
      console.log('💥 미션 삭제 에러, 폴백 사용:', e);
      console.log('🔍 에러 상세 정보:', {
        status: e.response?.status,
        statusText: e.response?.statusText,
        data: e.response?.data,
        message: e.message
      });
      
      // 폴백: 로컬에서만 삭제
      localMissions = localMissions.filter(m => m.id !== String(id));
      return true;
    }
  },

  async getTodayMission(memberId?: number): Promise<{ id: number; description: string } | null> {
    try {
      const id = memberId ?? 1;
      const res = await api.get(`${API_BASE}/members/${id}/missions/today`);
      return res.data;
    } catch (e) {
      console.log('💥 오늘의 미션 조회 에러, 폴백 사용:', e);
      // 폴백: 로컬 최신
      if (localMissions.length === 0) return null;
      const latest = [...localMissions].sort((a,b)=>b.createdAt-a.createdAt)[0];
      return { id: Number.isFinite(Number(latest.id)) ? Number(latest.id) : Date.now(), description: latest.description };
    }
  },

  // 미션 목록 조회 - GET /api/v1/missions
  async listAssignments(dateISO?: string) {
    console.log('📋 listAssignments 호출 시작:', { dateISO });
    try {
      const url = `${API_BASE}/missions`;
      console.log('🌐 API 요청 URL:', url);
      
      const res = await api.get(url);
      console.log('✅ API 응답 성공:', res.data);
      
      // 응답 데이터를 로컬 형식으로 변환
      const missions = Array.isArray(res.data) ? res.data.map((m: any) => ({
        id: String(m.id ?? crypto.randomUUID()),
        description: m.title ?? m.description ?? '미션',
        createdAt: new Date(m.createdAt ?? Date.now()).getTime()
      })) : [];
      
      // 로컬 저장소 업데이트
      localMissions = missions;
      return missions;
    } catch (e: any) {
      console.log('💥 미션 목록 조회 에러, 폴백 사용:', e);
      console.log('🔍 에러 상세 정보:', {
        status: e.response?.status,
        statusText: e.response?.statusText,
        data: e.response?.data,
        message: e.message
      });
      return localMissions;
    }
  }
};



