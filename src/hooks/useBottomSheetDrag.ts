import { useCallback, useEffect, useRef, useState } from 'react';

interface Options {
  threshold?: number;
  onClose: () => void;
  onProgress?: (value: number) => void;
  maxExpand?: number;
  dragStartBuffer?: number;
  flingVelocity?: number;
}

export const useBottomSheetDrag = ({
  threshold = 120,
  onClose,
  onProgress,
  maxExpand = 120,
  dragStartBuffer = 2,
  flingVelocity = 0.8,
}: Options) => {
  const startYRef = useRef<number | null>(null);
  const deltaRef = useRef(0);
  const [translateY, setTranslateY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [extraHeight, setExtraHeight] = useState(0);
  const committedRef = useRef(false);
  const lastMoveTimeRef = useRef<number>(0);
  const lastMoveYRef = useRef<number>(0);
  const velocityRef = useRef<number>(0);

  const onDragStart = useCallback((clientY: number) => {
    startYRef.current = clientY;
    deltaRef.current = 0;
    setIsDragging(true);
    committedRef.current = false;
    lastMoveTimeRef.current = performance.now();
    lastMoveYRef.current = clientY;
    velocityRef.current = 0;
  }, []);

  const onDragMove = useCallback(
    (clientY: number) => {
      if (startYRef.current === null) return;
      const diffTotal = clientY - startYRef.current;

      const now = performance.now();
      const dt = now - lastMoveTimeRef.current;
      if (dt > 0) {
        const dy = clientY - lastMoveYRef.current;
        velocityRef.current = dy / dt;
        lastMoveTimeRef.current = now;
        lastMoveYRef.current = clientY;
      }

      if (!committedRef.current) {
        if (Math.abs(diffTotal) < dragStartBuffer) return;
        committedRef.current = true;
      }

      if (diffTotal < 0) {
        const raw = Math.abs(diffTotal);
        const limited = Math.min(raw, maxExpand);
        const eased = limited - Math.pow(limited / maxExpand, 2) * 12;
        setExtraHeight(eased);
        setTranslateY(0);
        if (onProgress) onProgress(0);
        return;
      }

      let applied = diffTotal;
      if (diffTotal < 12) {
        applied = diffTotal * 0.55;
      }
      deltaRef.current = applied;
      setExtraHeight(0);
      setTranslateY(applied);
      if (onProgress) {
        const p = Math.min(applied / threshold, 1);
        onProgress(p);
      }
    },
    [onProgress, threshold, maxExpand, dragStartBuffer],
  );

  const onDragEnd = useCallback(() => {
    if (startYRef.current === null) return;
    const speed = velocityRef.current;
    const fastClose = speed > flingVelocity;
    const shouldClose = deltaRef.current > threshold || fastClose;
    if (shouldClose) onClose();
    else setTranslateY(0);
    setExtraHeight(0);
    if (onProgress) onProgress(0);
    startYRef.current = null;
    deltaRef.current = 0;
    setIsDragging(false);
  }, [onClose, onProgress, threshold, flingVelocity]);

  const bindHandle = {
    onPointerDown: (e: React.PointerEvent) => {
      if (e.button !== 0) return;
      onDragStart(e.clientY);
    },
  } as const;

  const mouseMove = useCallback(
    (e: MouseEvent) => onDragMove(e.clientY),
    [onDragMove],
  );
  const mouseUp = useCallback(() => {
    onDragEnd();
    window.removeEventListener('mousemove', mouseMove);
    window.removeEventListener('mouseup', mouseUp);
  }, [onDragEnd, mouseMove]);

  const pointerMove = useCallback(
    (e: PointerEvent) => {
      onDragMove(e.clientY);
    },
    [onDragMove],
  );
  const pointerUp = useCallback(() => {
    onDragEnd();
    window.removeEventListener('pointermove', pointerMove);
    window.removeEventListener('pointerup', pointerUp);
    window.removeEventListener('pointercancel', pointerUp);
  }, [onDragEnd, pointerMove]);

  useEffect(() => {
    return () => {
      window.removeEventListener('pointermove', pointerMove);
      window.removeEventListener('pointerup', pointerUp);
      window.removeEventListener('pointercancel', pointerUp);
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mouseup', mouseUp);
    };
  }, [pointerMove, pointerUp, mouseMove, mouseUp]);

  const attachTouchListener = () => {
    return () => undefined;
  };

  return {
    translateY,
    bindHandle,
    attachTouchListener,
    isDragging,
    setTranslateY,
    startDragAt: (clientY: number) => {
      onDragStart(clientY);
    },
    dragMove: (clientY: number) => onDragMove(clientY),
    dragEnd: () => onDragEnd(),
    extraHeight,
  };
};
