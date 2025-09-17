import { useCallback } from 'react';

export function useAutoResizeTextArea() {
  const autoResize = useCallback((el: HTMLTextAreaElement | null) => {
    if (!el) return;
    const min = 48;
    el.style.height = 'auto';
    const next = Math.min(el.scrollHeight, 140);
    el.style.height = `${Math.max(next, min)}px`;
  }, []);

  return { autoResize } as const;
}
