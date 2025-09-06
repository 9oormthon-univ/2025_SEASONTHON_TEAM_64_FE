import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { missionService } from './missionService';

export interface MissionItem {
  id: string;
  text: string;
  createdAt: number;
  finalized: boolean;
}

interface MissionContextValue {
  missions: MissionItem[];
  currentMission: MissionItem | null;
  addMission: (text: string) => void;
  updateMission: (id: string, text: string) => void;
  deleteMission: (id: string) => void;
  finalizeMission: (id: string) => void;
  refreshMission: () => Promise<void>; // 서버에서 미션 새로고침
}

const MissionContext = createContext<MissionContextValue | undefined>(undefined);

const STORAGE_KEY = "mission_state_v1";

// 쿠키 유틸 (FeedContext와 동일 규칙)
function getCookie(name: string): string | null {
  const matches = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'));
  return matches ? decodeURIComponent(matches[1]) : null;
}

function setCookie(name: string, value: string, days: number = 7) {
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}`;
}

function loadFromStorage(): MissionItem[] {
  try {
    // 쿠키 우선
    const cookieRaw = getCookie(STORAGE_KEY);
    if (cookieRaw) {
      const parsed = JSON.parse(cookieRaw);
      if (Array.isArray(parsed)) return parsed as MissionItem[];
    }
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as MissionItem[];
  } catch {
    return [];
  }
}

function saveToStorage(missions: MissionItem[]) {
  try {
    const json = JSON.stringify(missions);
    if (json.length < 3500) {
      setCookie(STORAGE_KEY, json);
    }
    localStorage.setItem(STORAGE_KEY, json);
  } catch {
    // ignore
  }
}

export const MissionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 서버 미션이 우선되도록 초기 상태는 빈 배열로 시작
  const [missions, setMissions] = useState<MissionItem[]>([]);

  useEffect(() => {
    saveToStorage(missions);
  }, [missions]);

  const addMission = useCallback((text: string) => {
    const newMission: MissionItem = {
      id: crypto.randomUUID(),
      text,
      createdAt: Date.now(),
      finalized: true,
    };
    // 최신 미션이 항상 currentMission이 되도록 finalized=true로 설정
    setMissions(prev => [newMission, ...prev.map(m => ({ ...m, finalized: false }))]);
  }, []);

  const updateMission = useCallback((id: string, text: string) => {
    setMissions(prev => prev.map(m => (m.id === id ? { ...m, text } : m)));
  }, []);

  const deleteMission = useCallback((id: string) => {
    setMissions(prev => prev.filter(m => m.id !== id));
  }, []);

  const finalizeMission = useCallback((id: string) => {
    setMissions(prev => prev.map(m => (m.id === id ? { ...m, finalized: true } : m)));
  }, []);

  const refreshMission = useCallback(async () => {
    try {
      console.log('🔄 MissionContext: 미션 새로고침 시작');
      const today = await missionService.getTodayMission();
      console.log('✅ MissionContext: 새로고침 응답:', today);
      
      if (today) {
        const serverMission = { 
          id: String(today.id), 
          text: today.description, 
          createdAt: Date.now(), 
          finalized: true 
        };
        
        setMissions(prev => {
          const existingIndex = prev.findIndex(m => m.id === serverMission.id);
          if (existingIndex >= 0) {
            const updated = [...prev];
            updated[existingIndex] = serverMission;
            return updated;
          } else {
            return [serverMission, ...prev.map(m => ({ ...m, finalized: false }))];
          }
        });
        
        console.log('✅ MissionContext: 미션 새로고침 완료');
      } else {
        console.log('⚠️ MissionContext: 새로고침 - 서버에서 미션 없음');
      }
    } catch (error) {
      console.error('❌ MissionContext: 미션 새로고침 실패:', error);
    }
  }, []);

  const currentMission = useMemo(() => {
    // finalized 우선, 없으면 최신(createdAt 최대) 사용
    const finalized = missions.find(m => m.finalized);
    if (finalized) {
      console.log('🎯 MissionContext: finalized 미션 선택:', finalized);
      return finalized;
    }
    const latest = missions.length ? [...missions].sort((a,b)=>b.createdAt-a.createdAt)[0] : null;
    if (latest) {
      console.log('🎯 MissionContext: 최신 미션 선택:', latest);
    }
    return latest;
  }, [missions]);

  // 초기 로드 시 서버에서 오늘 미션을 가져오고, 실패하면 저장소 값 사용
  useEffect(() => {
    (async () => {
      try {
        console.log('🎯 MissionContext: 서버에서 오늘 미션 조회 시작');
        const today = await missionService.getTodayMission();
        console.log('✅ MissionContext: 서버 미션 응답:', today);
        
        if (today) {
          const serverMission = { 
            id: String(today.id), 
            text: today.text, 
            createdAt: Date.now(), 
            finalized: true 
          };
          
          console.log('🔄 MissionContext: 서버 미션으로 교체:', serverMission);
          
          setMissions(prev => {
            // 서버에서 받은 미션이 최우선이 되도록 모든 기존 미션을 finalized: false로 설정
            const updatedMissions = prev.map(m => ({ ...m, finalized: false }));
            
            // 기존 미션 중에서 같은 ID가 있는지 확인
            const existingIndex = updatedMissions.findIndex(m => m.id === serverMission.id);
            if (existingIndex >= 0) {
              // 기존 미션 업데이트
              updatedMissions[existingIndex] = serverMission;
              console.log('🔄 MissionContext: 기존 미션 업데이트');
              return updatedMissions;
            } else {
              // 새 미션 추가 (서버 미션이 맨 앞에 오도록)
              console.log('🔄 MissionContext: 새 서버 미션 추가');
              return [serverMission, ...updatedMissions];
            }
          });
          
          console.log('✅ MissionContext: 서버 미션 적용 완료');
        } else {
          console.log('⚠️ MissionContext: 서버에서 미션 없음, 로컬 데이터 사용');
          // 서버에서 미션이 없을 때만 로컬 데이터 로드
          const localMissions = loadFromStorage();
          if (localMissions.length > 0) {
            setMissions(localMissions);
            console.log('📝 MissionContext: 로컬 미션 데이터 로드:', localMissions);
          }
        }
      } catch (error) {
        console.error('❌ MissionContext: 서버 미션 조회 실패:', error);
        // 서버 조회 실패 시 로컬 데이터 로드
        const localMissions = loadFromStorage();
        if (localMissions.length > 0) {
          setMissions(localMissions);
          console.log('📝 MissionContext: 서버 실패로 로컬 미션 데이터 로드:', localMissions);
        }
      }
    })();
  }, []);

  const value = useMemo<MissionContextValue>(() => ({
    missions,
    currentMission,
    addMission,
    updateMission,
    deleteMission,
    finalizeMission,
    refreshMission,
  }), [missions, currentMission, addMission, updateMission, deleteMission, finalizeMission, refreshMission]);

  return <MissionContext.Provider value={value}>{children}</MissionContext.Provider>;
};

export function useMission() {
  const ctx = useContext(MissionContext);
  if (!ctx) throw new Error("useMission must be used within MissionProvider");
  return ctx;
}



