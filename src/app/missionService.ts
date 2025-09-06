import type { MissionItem } from './MissionContext';
import { api } from '../Landing/auth/api';

const API_BASE = '/api/v1';
const TIMEOUT_MS = 7000;

async function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const id = setTimeout(() => reject(new Error('Request timed out')), ms);
    promise
      .then((res) => { clearTimeout(id); resolve(res); })
      .catch((err) => { clearTimeout(id); reject(err); });
  });
}

async function safeFetch(url: string, init?: RequestInit) {
  return withTimeout(fetch(url, init), TIMEOUT_MS);
}

// 로컬 폴백 저장소
let localMissions: Array<{ id: string; description: string; createdAt: number }>= [];

export const missionService = {
  async createMission(description: string) {
    try {
      const res = await safeFetch(`${API_BASE}/missions/assignments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description })
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      localMissions.unshift({ id: String(data.id ?? crypto.randomUUID()), description: data.description ?? description, createdAt: Date.now() });
      return data;
    } catch (e) {
      const item = { id: crypto.randomUUID(), description, createdAt: Date.now() };
      localMissions.unshift(item);
      return item;
    }
  },

  async deleteMission(id: string) {
    try {
      const res = await safeFetch(`${API_BASE}/missions/assignments/${encodeURIComponent(id)}`, { method: 'DELETE' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      localMissions = localMissions.filter(m => m.id !== id);
      return true;
    } catch (e) {
      localMissions = localMissions.filter(m => m.id !== id);
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

  async listAssignments(dateISO?: string) {
    try {
      const qs = dateISO ? `?date=${encodeURIComponent(dateISO)}` : '';
      const res = await api.get(`${API_BASE}/missions/assignments${qs}`);
      return res.data;
    } catch (e) {
      console.log('💥 미션 목록 조회 에러, 폴백 사용:', e);
      return localMissions;
    }
  }
};



