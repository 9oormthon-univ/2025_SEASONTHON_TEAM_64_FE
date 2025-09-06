import { api } from '../Landing/auth/api';

// 로컬 폴백 저장소
let localMissions: Array<{ id: string; description: string; createdAt: number }>= [];

export const missionService = {
  // 미션 등록 - POST /api/v1/missions/upload
  async createMission(title: string) {
    console.log('📝 createMission 호출 시작:', { title });
    try {
      const url = `/missions/upload`;
      const requestBody = { title };
      console.log('🌐 API 요청 URL:', url);
      console.log('📦 요청 데이터:', requestBody);
      console.log('🔗 최종 요청 URL:', `https://api.planhub.site/api/v1${url}`);
      
      const res = await api.post(url, requestBody);
      console.log('✅ API 응답 성공:', res.data);
      console.log('📊 응답 상태:', res.status);
      
      // 로컬에도 저장
      const data = res.data as any;
      const item = { 
        id: String(data.id ?? crypto.randomUUID()), 
        description: data.title ?? title, 
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
        message: e.message,
        url: e.config?.url,
        fullUrl: e.config?.baseURL + e.config?.url
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
      const url = `/missions/${id}`;
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

  // 가장 최근 미션 조회 - GET /api/v1/missions/assignments
  async getTodayMission(memberId?: number): Promise<{ id: number; description: string } | null> {
    console.log('🎯 getTodayMission 호출 시작: 최근 미션 조회');
    try {
      // 미션 배정 현황 조회 (오늘 날짜 기준)
      const url = `/missions/assignments`;
      console.log('🌐 API 요청 URL:', url);
      console.log('🔗 최종 요청 URL:', `https://api.planhub.site/api/v1${url}`);
      
      const res = await api.get(url);
      console.log('✅ API 응답 성공:', res.data);
      
      // API 응답을 변환
      const data = res.data as any;
      console.log('🔍 API 응답 구조 분석:', {
        hasData: !!data,
        hasAssignments: !!(data && data.assignments),
        assignmentsLength: data?.assignments?.length,
        assignments: data?.assignments
      });
      
      if (data && data.assignments && Array.isArray(data.assignments) && data.assignments.length > 0) {
        // missionId 기준으로 내림차순 정렬하여 가장 최근 미션 선택
        const sortedMissions = [...data.assignments].sort((a: any, b: any) => {
          const aId = a.missionId || a.id || 0;
          const bId = b.missionId || b.id || 0;
          return bId - aId; // 내림차순 (큰 값이 먼저)
        });
        
        const latestMission = sortedMissions[0];
        console.log('🎯 정렬된 미션 목록:', sortedMissions.map(m => ({ 
          id: m.missionId || m.id, 
          title: m.missionTitle || m.title 
        })));
        console.log('🎯 가장 최근 미션 선택:', latestMission);
        
        const missionId = latestMission.missionId || latestMission.id;
        const missionTitle = latestMission.missionTitle || latestMission.title;
        
        if (missionId && missionTitle) {
          const mission = {
            id: String(missionId),
            text: missionTitle,
            status: latestMission.status || 'ASSIGNED'
          };
          console.log('✅ 변환된 최근 미션 데이터:', mission);
          return mission;
        } else {
          console.log('⚠️ 최근 미션 ID 또는 제목이 없음:', { missionId, missionTitle });
          return null;
        }
      } else {
        console.log('⚠️ API 응답에 미션 목록 없음:', data);
        return null;
      }
    } catch (e: any) {
      console.log('💥 오늘의 미션 조회 에러, 폴백 사용:', e);
      console.log('🔍 에러 상세 정보:', {
        status: e.response?.status,
        statusText: e.response?.statusText,
        data: e.response?.data,
        message: e.message,
        url: e.config?.url,
        fullUrl: e.config?.baseURL + e.config?.url
      });
      
      // 폴백: 로컬 최신
      if (localMissions.length === 0) return null;
      const latest = [...localMissions].sort((a,b)=>b.createdAt-a.createdAt)[0];
      return { 
        id: Number.isFinite(Number(latest.id)) ? Number(latest.id) : Date.now(), 
        description: latest.description 
      };
    }
  },

  // 미션 목록 조회 (관리자용) - GET /api/v1/missions
  async listMissions() {
    console.log('📋 listMissions 호출 시작 (관리자용)');
    try {
      const url = `/missions`;
      console.log('🌐 API 요청 URL:', url);
      console.log('🔗 최종 요청 URL:', `https://api.planhub.site/api/v1${url}`);
      
      const res = await api.get(url);
      console.log('✅ API 응답 성공:', res.data);
      console.log('📊 응답 상태:', res.status);
      
      // 스웨거 응답 형식에 맞춰 변환 (배열)
      if (Array.isArray(res.data)) {
        const missions = res.data.map((mission: any) => ({
          id: String(mission.id ?? crypto.randomUUID()),
          description: mission.title ?? '미션',
          createdAt: new Date(mission.createdAt ?? Date.now()).getTime(),
          member: mission.member
        }));
        
        // 중복 제거: id 기준으로 중복된 미션 제거
        const uniqueMissions = missions.reduce((acc: any[], mission: any) => {
          const existingIndex = acc.findIndex(m => m.id === mission.id);
          if (existingIndex === -1) {
            acc.push(mission);
          } else {
            console.log('🔄 중복 미션 발견, 최신 것으로 교체:', { 
              id: mission.id, 
              old: acc[existingIndex], 
              new: mission 
            });
            acc[existingIndex] = mission; // 최신 것으로 교체
          }
          return acc;
        }, []);
        
        console.log('📊 미션 중복 제거 결과:', { 
          원본: missions.length, 
          중복제거후: uniqueMissions.length 
        });
        
        // 로컬 저장소 업데이트 (기존 형식 유지)
        localMissions = uniqueMissions.map(m => ({
          id: m.id,
          description: m.description,
          createdAt: m.createdAt
        }));
        
        return uniqueMissions;
      }
      
      return [];
    } catch (e: any) {
      console.log('💥 미션 목록 조회 에러, 폴백 사용:', e);
      console.log('🔍 에러 상세 정보:', {
        status: e.response?.status,
        statusText: e.response?.statusText,
        data: e.response?.data,
        message: e.message,
        url: e.config?.url,
        fullUrl: e.config?.baseURL + e.config?.url
      });
      return localMissions;
    }
  },

  // 미션 배정 현황 조회 - GET /api/v1/missions/assignments
  async listAssignments(dateISO?: string) {
    console.log('📋 listAssignments 호출 시작:', { dateISO });
    try {
      const url = `/missions/assignments`;
      const params = dateISO ? `?date=${encodeURIComponent(dateISO)}` : '';
      const fullUrl = url + params;
      console.log('🌐 API 요청 URL:', fullUrl);
      console.log('🔗 전체 요청 URL:', `https://api.planhub.site/api/v1${fullUrl}`);
      
      const res = await api.get(fullUrl);
      console.log('✅ API 응답 성공:', res.data);
      
      // 스웨거 응답 형식에 맞춰 변환
      const data = res.data as any;
      if (data && data.items && Array.isArray(data.items)) {
        const missions = data.items.map((item: any) => ({
          id: String(item.missionId ?? crypto.randomUUID()),
          description: item.missionTitle ?? '미션',
          createdAt: new Date(data.date ?? Date.now()).getTime(),
          memberId: item.memberId,
          memberNickname: item.memberNickname,
          status: item.status
        }));
        
        // 로컬 저장소 업데이트 (기존 형식 유지)
        localMissions = missions.map((m: any) => ({
          id: m.id,
          description: m.description,
          createdAt: m.createdAt
        }));
        
        return missions;
      }
      
      return [];
    } catch (e: any) {
      console.log('💥 미션 배정 현황 조회 에러, 폴백 사용:', e);
      console.log('🔍 에러 상세 정보:', {
        status: e.response?.status,
        statusText: e.response?.statusText,
        data: e.response?.data,
        message: e.message,
        url: e.config?.url,
        fullUrl: e.config?.baseURL + e.config?.url
      });
      return localMissions;
    }
  }
};



