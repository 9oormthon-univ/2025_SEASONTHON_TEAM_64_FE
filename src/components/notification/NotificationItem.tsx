import React from 'react';
import * as S from '../../pages/notification/index.styles';
import commentIcon from '../../assets/notification/comment.svg';
import fortuneIcon from '../../assets/notification/fortune.svg';
import likeIcon from '../../assets/notification/like.svg';
import missionIcon from '../../assets/notification/mission.svg';
import type { NotificationResponse } from '../../apis/notification/index.type';
import { formatRelativeTime } from '../../utils/formatRelativeTime';

type Props = {
  notification: NotificationResponse;
};

const NotificationItem: React.FC<Props> = ({ notification }) => {
  const renderIcon = () => {
    switch (notification.type) {
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

  const renderTypeText = () => {
    switch (notification.type) {
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
    <S.NotificationItem type={notification.type}>
      {renderIcon()}
      <S.NotificationContentBox>
        <S.NotificationType>{renderTypeText()}</S.NotificationType>
        <S.NotificationMessage>{notification.message}</S.NotificationMessage>
      </S.NotificationContentBox>
      <S.NotificationTime>
        {formatRelativeTime(notification.createdAt)}
      </S.NotificationTime>
    </S.NotificationItem>
  );
};

export default NotificationItem;
