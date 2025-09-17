import React, { useEffect, useRef, useState } from 'react';
import * as S from './CommentBottomSheet.styles';
import { useBottomSheetDrag } from '../../hooks/useBottomSheetDrag';
import { useToastContext } from '../toast/Toast';
import { useComments } from '../../hooks/useComments';
import { useCreateComment } from '../../hooks/useCreateComment';
import { useDeleteComment } from '../../hooks/useDeleteComment';
import CommentList from './comments/CommentList';
import CommentInput from './comments/CommentInput';

interface Props {
  feedId: number;
  onClose: () => void;
  onDragProgress?: (p: number) => void;
}

const CommentBottomSheet: React.FC<Props> = ({
  feedId,
  onClose,
  onDragProgress,
}) => {
  const isPointerSupported =
    typeof window !== 'undefined' && 'PointerEvent' in window;
  const { show } = useToastContext();
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const { comments, hasNextPage, isFetchingNextPage, status, sentinelRef } =
    useComments(feedId);
  const createMut = useCreateComment(feedId);
  const deleteMut = useDeleteComment(
    feedId,
    () => show('댓글 삭제에 실패했어요.', 'error', true),
    () => show('댓글을 삭제했어요!', 'info', true),
  );

  const sheetRef = useRef<HTMLDivElement | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const {
    translateY,
    bindHandle,
    attachTouchListener,
    isDragging,
    startDragAt,
    extraHeight,
    dragMove,
    dragEnd,
  } = useBottomSheetDrag({
    onClose: () => {
      setIsClosing(true);
      setTimeout(() => onClose(), 240);
    },
    onProgress: onDragProgress,
    maxExpand: 400,
  });

  useEffect(() => {
    requestAnimationFrame(() => setIsMounted(true));
  }, []);

  useEffect(() => {
    return attachTouchListener();
  }, [attachTouchListener]);

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  const handleOverlayClick = () => {
    setIsClosing(true);
    setTimeout(() => onClose(), 240);
  };

  return (
    <S.Overlay
      onClick={handleOverlayClick}
      isMounted={isMounted}
      isClosing={isClosing}
    >
      <S.Sheet
        ref={sheetRef}
        translateY={translateY}
        isDragging={isDragging}
        isClosing={isClosing}
        extraHeight={extraHeight}
        onPointerDown={(e: React.PointerEvent) => {
          const target = e.currentTarget as HTMLElement;
          const el = e.target as HTMLElement;
          if (el.closest('[data-no-drag="true"]')) return;
          const tag = el.tagName;
          if (tag === 'TEXTAREA' || tag === 'BUTTON' || tag === 'INPUT') return;
          if (e.button !== 0) return;
          target.setPointerCapture(e.pointerId);
          startDragAt(e.clientY);
        }}
        onPointerMove={(e: React.PointerEvent) => {
          if (!isDragging) return;
          dragMove(e.clientY);
        }}
        onPointerUp={(e: React.PointerEvent) => {
          if (!isDragging) return;
          (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
          dragEnd();
        }}
        onPointerCancel={(e: React.PointerEvent) => {
          if (!isDragging) return;
          (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
          dragEnd();
        }}
        {...(!isPointerSupported && {
          onTouchStart: (e: React.TouchEvent) => {
            const el = e.target as HTMLElement;
            if (el.closest('[data-no-drag="true"]')) return;
            const tag = el.tagName;
            if (tag === 'TEXTAREA' || tag === 'BUTTON' || tag === 'INPUT')
              return;
            const touch = e.touches[0];
            if (!touch) return;
            startDragAt(touch.clientY);
          },
          onTouchMove: (e: React.TouchEvent) => {
            if (!isDragging) return;
            const touch = e.touches[0];
            if (!touch) return;
            dragMove(touch.clientY);
          },
          onTouchEnd: () => {
            if (!isDragging) return;
            dragEnd();
          },
          onTouchCancel: () => {
            if (!isDragging) return;
            dragEnd();
          },
        })}
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <S.Handle {...bindHandle} />
        <CommentList
          comments={comments}
          openMenuId={openMenuId}
          setOpenMenuId={setOpenMenuId}
          onDelete={(commentId) => {
            deleteMut.mutate({ commentId });
            setOpenMenuId(null);
          }}
          sentinelRef={sentinelRef}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
          status={status}
        />
        <CommentInput
          disabled={createMut.isPending}
          onSubmit={(text, done) =>
            createMut.mutate(text, {
              onSuccess: () => done?.(),
            })
          }
        />
      </S.Sheet>
    </S.Overlay>
  );
};

export default CommentBottomSheet;
