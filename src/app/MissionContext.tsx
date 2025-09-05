import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

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
  const [missions, setMissions] = useState<MissionItem[]>(() => loadFromStorage());

  useEffect(() => {
    saveToStorage(missions);
  }, [missions]);

  const addMission = useCallback((text: string) => {
    const newMission: MissionItem = {
      id: crypto.randomUUID(),
      text,
      createdAt: Date.now(),
      finalized: false,
    };
    setMissions(prev => [newMission, ...prev]);
  }, []);

  const updateMission = useCallback((id: string, text: string) => {
    setMissions(prev => prev.map(m => (m.id === id && !m.finalized ? { ...m, text } : m)));
  }, []);

  const deleteMission = useCallback((id: string) => {
    setMissions(prev => prev.filter(m => m.id !== id));
  }, []);

  const finalizeMission = useCallback((id: string) => {
    setMissions(prev => prev.map(m => (m.id === id ? { ...m, finalized: true } : m)));
  }, []);

  const currentMission = useMemo(() => {
    const firstFinalized = missions.find(m => m.finalized);
    return firstFinalized ?? null;
  }, [missions]);

  const value = useMemo<MissionContextValue>(() => ({
    missions,
    currentMission,
    addMission,
    updateMission,
    deleteMission,
    finalizeMission,
  }), [missions, currentMission, addMission, updateMission, deleteMission, finalizeMission]);

  return <MissionContext.Provider value={value}>{children}</MissionContext.Provider>;
};

export function useMission() {
  const ctx = useContext(MissionContext);
  if (!ctx) throw new Error("useMission must be used within MissionProvider");
  return ctx;
}



