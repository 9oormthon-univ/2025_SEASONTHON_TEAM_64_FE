import React from 'react';
import * as S from '../../pages/notification/index.styles';
import type { NotificationResponse } from '../../apis/notification/index.type';
import NotificationItem from './NotificationItem';

type Props = {
  items: NotificationResponse[];
  sentinelRef: React.RefObject<HTMLDivElement | null>;
  loading?: boolean;
};

const NotificationList: React.FC<Props> = ({ items, sentinelRef, loading }) => {
  return (
    <S.NotificationList>
      {items.map((n) => (
        <NotificationItem key={n.id} notification={n} />
      ))}
      <div ref={sentinelRef} />
      {loading && <div style={{ padding: 16 }}>불러오는 중…</div>}
    </S.NotificationList>
  );
};

export default NotificationList;
