/**
 * OldModeGuide / useOneTimeFlag 에서 사용하는 guide:* 키를 전부 제거합니다.
 * 예: guide:fortune:OLD:123:v1
 */
export function clearAllGuideFlags() {
  if (typeof window === 'undefined') return;
  try {
    const keys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (!k) continue;
      if (k.startsWith('guide:')) keys.push(k);
    }
    keys.forEach((k) => localStorage.removeItem(k));
  } catch (e) {
    // ignore quota/permission errors
    console.warn('Failed to clear guide flags', e);
  }
}
