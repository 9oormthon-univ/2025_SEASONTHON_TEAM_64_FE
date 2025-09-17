import React from 'react';
import * as S from '../CommentBottomSheet.styles';
import type { CommentResponse } from '../../../apis/comment/index.type';
import CommentItem from './CommentItem';

interface CommentListProps {
  comments: CommentResponse[];
  openMenuId: number | null;
  setOpenMenuId: (id: number | null) => void;
  onDelete: (commentId: number) => void;
  sentinelRef: React.RefObject<HTMLDivElement | null>;
  isFetchingNextPage: boolean;
  hasNextPage?: boolean;
  status: 'error' | 'pending' | 'success' | 'idle';
}

const CommentList: React.FC<CommentListProps> = ({
  comments,
  openMenuId,
  setOpenMenuId,
  onDelete,
  sentinelRef,
  isFetchingNextPage,
  hasNextPage,
  status,
}) => {
  return (
    <S.ScrollArea>
      {comments.map((c) => (
        <CommentItem
          key={c.commentId}
          comment={c}
          isMenuOpen={openMenuId === c.commentId}
          onToggleMenu={() =>
            setOpenMenuId(openMenuId === c.commentId ? null : c.commentId)
          }
          onDelete={() => onDelete(c.commentId)}
        />
      ))}
      <div ref={sentinelRef} />
      {isFetchingNextPage && (
        <div
          style={{ textAlign: 'center', padding: '0.8rem', fontSize: '1.2rem' }}
        >
          불러오는 중...
        </div>
      )}
      {!hasNextPage && status === 'success' && (
        <div
          style={{
            textAlign: 'center',
            padding: '0.8rem',
            fontSize: '1.2rem',
            color: '#888',
          }}
        >
          모든 댓글을 불러왔어요.
        </div>
      )}
    </S.ScrollArea>
  );
};

export default React.memo(CommentList);
