import { useCallback, useEffect, useMemo, useState } from 'react';

type UseOneTimeFlagOptions = {
  pageKey: string;
  memberId?: number | null;
  mode?: string | null;
  version?: string;
};

function buildStorageKey({
  pageKey,
  memberId,
  mode,
  version,
}: UseOneTimeFlagOptions) {
  const id = memberId ?? 'anon';
  const m = mode ?? 'any';
  const v = version ?? 'v1';
  return `guide:${pageKey}:${m}:${id}:${v}`;
}

/**
 * localStorage 기반의 1회성 플래그 훅
 * - 최초 진입 시에만 true를 반환하고, markSeen() 호출 시 이후부터 false 유지
 * - memberId, mode, version을 키에 반영해 페이지/유저/모드/버전별로 독립 동작
 */
export default function useOneTimeFlag(options: UseOneTimeFlagOptions) {
  const key = useMemo(() => buildStorageKey(options), [options]);
  const [shouldShow, setShouldShow] = useState<boolean>(() => {
    try {
      return (
        typeof window !== 'undefined' && localStorage.getItem(key) !== 'seen'
      );
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      const seen = localStorage.getItem(key) === 'seen';
      setShouldShow(!seen);
    } catch {
      setShouldShow(false);
    }
  }, [key]);

  const markSeen = useCallback(() => {
    try {
      localStorage.setItem(key, 'seen');
    } catch (e) {
      // ignore quota/permission errors
      console.warn('Failed to set one-time flag', e);
    }
    setShouldShow(false);
  }, [key]);

  const reset = useCallback(() => {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.warn('Failed to reset one-time flag', e);
    }
    setShouldShow(true);
  }, [key]);

  return { shouldShow, markSeen, reset } as const;
}
