import React from 'react';
import * as S from './index.styles';
import back from '../../assets/notification/left-arrow.svg';
import NotificationList from '../../components/notification/NotificationList';
import useInfiniteNotifications from '../../hooks/useInfiniteNotifications';

const Notification = () => {
  const { items, isLoading, isFetchingNextPage, sentinelRef } =
    useInfiniteNotifications();
  return (
    <S.Container>
      <S.Header>
        <img src={back} alt="back" />
      </S.Header>
      <S.Title>알림</S.Title>
      <NotificationList
        items={items}
        sentinelRef={sentinelRef}
        loading={isLoading || isFetchingNextPage}
      />
    </S.Container>
  );
};

export default Notification;
