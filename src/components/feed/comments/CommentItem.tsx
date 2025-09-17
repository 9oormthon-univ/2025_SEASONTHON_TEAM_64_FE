import React from 'react';
import * as S from '../CommentBottomSheet.styles';
import nonImage from '../../../assets/feed/non-image.svg';
import menu from '../../../assets/feed/menu.svg';
import { formatRelativeTime } from '../../../utils/formatRelativeTime';
import type { CommentResponse } from '../../../apis/comment/index.type';

interface CommentItemProps {
  comment: CommentResponse;
  isMenuOpen: boolean;
  onToggleMenu: () => void;
  onDelete?: () => void;
}

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  isMenuOpen,
  onToggleMenu,
  onDelete,
}) => {
  return (
    <S.CommentItem>
      <S.Avatar src={comment.imageUrl || nonImage} />
      <S.CommentBody>
        <S.CommentHeader>
          <S.Nickname>{comment.nickname}</S.Nickname>
          <S.Time>{formatRelativeTime(comment.createdAt)}</S.Time>
        </S.CommentHeader>
        <S.Description>{comment.description}</S.Description>
      </S.CommentBody>
      {comment.isMine && (
        <S.MenuButton
          data-no-drag="true"
          src={menu}
          onClick={(e) => {
            e.stopPropagation();
            onToggleMenu();
          }}
        />
      )}
      {isMenuOpen && (
        <S.MenuBox data-no-drag="true" onClick={(e) => e.stopPropagation()}>
          <S.MenuItem onClick={onDelete}>삭제하기</S.MenuItem>
        </S.MenuBox>
      )}
    </S.CommentItem>
  );
};

export default React.memo(CommentItem);
