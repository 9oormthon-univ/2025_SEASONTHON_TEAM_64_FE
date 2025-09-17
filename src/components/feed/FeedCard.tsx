import React, { useEffect, useRef, useState } from 'react';
import * as S from './FeedCard.styles';
import likeOn from '../../assets/feed/heart-on.svg';
import likeOff from '../../assets/feed/heart-off.svg';
import likeGif from '../../assets/gif/like.gif';
import commentIcon from '../../assets/feed/comment.svg';
import nonImage from '../../assets/feed/non-image.svg';
import menu from '../../assets/feed/menu.svg';
import { formatRelativeTime } from '../../utils/formatRelativeTime';
import type { FeedResponse } from '../../apis/feed/index.type';
import { useNavigate } from 'react-router-dom';

interface FeedCardProps {
  feed: FeedResponse;
  onToggleLike: (id: number, current: boolean) => void;
  onOpenComments: (id: number) => void;
  onDelete?: (id: number) => void;
  className?: string;
  style?: React.CSSProperties;
}

const FeedCard: React.FC<FeedCardProps> = ({
  feed,
  onToggleLike,
  onOpenComments,
  onDelete,
  className,
  style,
}) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isLikeAnimating, setIsLikeAnimating] = useState(false);
  const likeTimerRef = useRef<number | null>(null);

  const LIKE_ANIMATION_DURATION = 1000;

  const handleLikeClick = () => {
    if (isLikeAnimating) return;

    if (!feed.isLiked) {
      setIsLikeAnimating(true);
      likeTimerRef.current = window.setTimeout(() => {
        setIsLikeAnimating(false);
        likeTimerRef.current = null;
      }, LIKE_ANIMATION_DURATION);
    }

    onToggleLike(feed.feedId, feed.isLiked);
  };

  useEffect(() => {
    return () => {
      if (likeTimerRef.current) window.clearTimeout(likeTimerRef.current);
    };
  }, []);

  return (
    <>
      {isDelete && (
        <S.ModalContainer>
          <S.DeletePopUp>
            <S.DeleteText>미션을 정말</S.DeleteText>
            <S.DeleteText>삭제 하시겠습니까?</S.DeleteText>
            <S.DeleteButtonBox>
              <S.DeleteButton isCancel onClick={() => setIsDelete(false)}>
                취소
              </S.DeleteButton>
              <S.VerticalDivider />
              <S.DeleteButton onClick={() => onDelete?.(feed.feedId)}>
                삭제
              </S.DeleteButton>
            </S.DeleteButtonBox>
          </S.DeletePopUp>
        </S.ModalContainer>
      )}
      <S.Card className={className} style={style}>
        <S.Owner>
          <S.Avatar src={feed.profileImageUrl || nonImage} />
          <S.Nick>{feed.nickname}</S.Nick>
          {feed.isMine && (
            <S.MenuIcon
              src={menu}
              alt="menu"
              onClick={() => setIsOpen((prev) => !prev)}
            />
          )}
          {isOpen && (
            <S.MenuBox>
              <S.MenuItem onClick={() => navigate(`/modify/${feed.feedId}`)}>
                수정하기
              </S.MenuItem>
              <S.MenuDivider />
              <S.MenuItem onClick={() => setIsDelete(true)}>
                삭제하기
              </S.MenuItem>
            </S.MenuBox>
          )}
        </S.Owner>
        <S.Image src={feed.imageUrl} />
        <S.Actions>
          <S.LikeBtn
            src={isLikeAnimating ? likeGif : feed.isLiked ? likeOn : likeOff}
            onClick={handleLikeClick}
            alt={feed.isLiked ? 'like-on' : 'like-off'}
            data-animating={isLikeAnimating}
          />
          <S.CommentBtn
            src={commentIcon}
            onClick={() => onOpenComments(feed.feedId)}
          />
          <S.Time>{formatRelativeTime(feed.createdAt)}</S.Time>
        </S.Actions>
        <S.Desc>{feed.description}</S.Desc>
      </S.Card>
    </>
  );
};

export default FeedCard;
