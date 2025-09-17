import React from 'react';
import * as S from './index.styles';
import commentIcon from '../../assets/notification/comment.svg';
import fortuneIcon from '../../assets/notification/fortune.svg';
import likeIcon from '../../assets/notification/like.svg';
import missionIcon from '../../assets/notification/mission.svg';
import type { NotificationResponse } from '../../apis/notification/index.type';
import { formatRelativeTime } from '../../utils/formatRelativeTime';

type Props = {
  items: NotificationResponse[];
  sentinelRef: React.RefObject<HTMLDivElement | null>;
  loading?: boolean;
  hasNextPage?: boolean;
};

const NotificationList: React.FC<Props> = ({
  items,
  sentinelRef,
  loading,
  hasNextPage,
}) => {
  const renderIcon = (type: string) => {
    switch (type) {
      case 'COMMENT':
        return <S.NotificationImage src={commentIcon} alt="comment" />;
      case 'LIKE':
        return <S.NotificationImage src={likeIcon} alt="like" />;
      case 'MISSION':
        return <S.NotificationImage src={missionIcon} alt="mission" />;
      case 'FORTUNE':
        return <S.NotificationImage src={fortuneIcon} alt="fortune" />;
      default:
        return null;
    }
  };

  const typeText = (type: string) => {
    switch (type) {
      case 'COMMENT':
        return '댓글';
      case 'LIKE':
        return '공감';
      case 'MISSION':
        return '오늘의 미션 도착';
      case 'FORTUNE':
        return '포춘쿠키 도착';
      default:
        return '';
    }
  };

  return (
    <S.NotificationList>
      {items.map((n) => (
        <S.NotificationItem key={n.id} type={n.type}>
          {renderIcon(n.type)}
          <S.NotificationContentBox>
            <S.NotificationType>{typeText(n.type)}</S.NotificationType>
            <S.NotificationMessage>{n.message}</S.NotificationMessage>
          </S.NotificationContentBox>
          <S.NotificationTime>
            {formatRelativeTime(n.createdAt)}
          </S.NotificationTime>
        </S.NotificationItem>
      ))}
      <div ref={sentinelRef} style={{ height: 1, display: 'block' }} />
      {loading && <div style={{ padding: 16 }}>불러오는 중…</div>}
      {!loading && items.length === 0 && (
        <div style={{ padding: 16, color: '#888' }}>알림이 없습니다.</div>
      )}
      {!loading && items.length > 0 && hasNextPage === false && (
        <div style={{ padding: 16, color: '#888' }}>
          더 이상의 알림이 없습니다.
        </div>
      )}
    </S.NotificationList>
  );
};

export default NotificationList;
